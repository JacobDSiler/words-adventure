/*! Words Adventure read-aloud: WASpeech
 * - speaks with the device's text-to-speech voice (letter names, letter SOUNDS, picture words, prompts)
 * - or plays a parent's own recorded clip instead (record in Word Games > Record letter sounds); clips live on this device
 * Items passed to say()/sayAll(): a string, or {k:'sound:b', t:'buh'} = "play the clip saved under k, otherwise speak t".
 */
(function (root) {
  'use strict';
  var syn = root.speechSynthesis, hasTTS = !!(syn && root.SpeechSynthesisUtterance);
  var LS = 'wag_speak';
  var token = 0, voice = null, voices = [], cur = null, curAudio = null;

  /* ---------------- letter data ---------------- */
  // name: how a voice should say the letter's NAME. sound: respelling of the letter SOUND. w/e: example word + picture.
  var ZED = !/en-US|en_US/i.test((root.navigator && navigator.language) || 'en-IE');
  var L = {
    a: ['ay', 'aah', 'apple', '🍎'], b: ['bee', 'buh', 'ball', '⚽'], c: ['see', 'kuh', 'cat', '🐱'], d: ['dee', 'duh', 'dog', '🐶'],
    e: ['ee', 'eh', 'egg', '🥚'], f: ['ef', 'fff', 'fish', '🐟'], g: ['jee', 'guh', 'goat', '🐐'], h: ['aitch', 'huh', 'hat', '🎩'],
    i: ['eye', 'ih', 'iguana', '🦎'], j: ['jay', 'juh', 'jam', '🍓'], k: ['kay', 'kuh', 'key', '🔑'], l: ['el', 'lll', 'lion', '🦁'],
    m: ['em', 'mmm', 'moon', '🌙'], n: ['en', 'nnn', 'nose', '👃'], o: ['oh', 'ah', 'octopus', '🐙'], p: ['pee', 'puh', 'pig', '🐷'],
    q: ['cue', 'kwuh', 'queen', '👑'], r: ['ar', 'rrr', 'rabbit', '🐰'], s: ['ess', 'sss', 'sun', '☀️'], t: ['tee', 'tuh', 'turtle', '🐢'],
    u: ['you', 'uh', 'umbrella', '☂️'], v: ['vee', 'vvv', 'van', '🚐'], w: ['double you', 'wuh', 'water', '💧'], x: ['ex', 'ks', 'fox', '🦊'],
    y: ['why', 'yuh', 'yo-yo', '🪀'], z: [ZED ? 'zed' : 'zee', 'zzz', 'zebra', '🦓']
  };
  var LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');
  function nameOf(l) { l = String(l).toLowerCase(); return L[l] ? L[l][0] : l; }
  function soundOf(l) { l = String(l).toLowerCase(); return L[l] ? L[l][1] : l; }
  function wordOf(l) { l = String(l).toLowerCase(); return L[l] ? L[l][2] : ''; }
  function emojiOf(l) { l = String(l).toLowerCase(); return L[l] ? L[l][3] : ''; }

  function nameItem(l) { l = String(l).toLowerCase(); return { k: 'name:' + l, t: nameOf(l) }; }
  function soundItem(l) { l = String(l).toLowerCase(); return { k: 'sound:' + l, t: soundOf(l) }; }
  function wordItem(w) { w = String(w).toLowerCase(); return { k: 'word:' + w, t: w }; }

  /* ---------------- on / off ---------------- */
  function on(gameDefault) {
    var v = null;
    try { v = root.localStorage.getItem(LS); } catch (e) { }
    if (v === '1') return true;
    if (v === '0') return false;
    return !!gameDefault;
  }
  function setOn(b) { try { root.localStorage.setItem(LS, b ? '1' : '0'); } catch (e) { } return b; }
  function isSet() { try { return root.localStorage.getItem(LS) != null; } catch (e) { return false; } }

  /* ---------------- voice ---------------- */
  function pickVoice() {
    if (!hasTTS) return;
    voices = syn.getVoices() || [];
    if (!voices.length) return;
    var pref = ((root.navigator && navigator.language) || 'en-IE').toLowerCase();
    function score(v) {
      var s = 0, n = (v.name || '') + ' ' + (v.lang || ''), l = (v.lang || '').toLowerCase().replace('_', '-');
      if (l.indexOf('en') !== 0) return -1;
      if (l === pref) s += 5; else if (l === 'en-ie') s += 4; else if (l === 'en-gb') s += 3; else if (l === 'en-us') s += 2; else s += 1;
      if (/natural|online|neural/i.test(n)) s += 6;
      if (/female|aria|jenny|sonia|libby|samantha|karen|moira|google uk english female|zira|hazel/i.test(n)) s += 2;
      return s;
    }
    var best = null, bs = -1, saved = null;
    try { saved = root.localStorage.getItem('wag_voice'); } catch (e) { }
    voices.forEach(function (v) { var s = score(v); if (s > bs) { bs = s; best = v; } });
    if (saved) { var sv = voices.filter(function (v) { return v.name === saved; })[0]; if (sv) best = sv; }
    voice = best;
  }
  function listVoices() {
    if (!hasTTS) return [];
    var vs = (syn.getVoices() || []).filter(function (v) { return /^en/i.test(v.lang || ''); });
    function sc(v) { var n = (v.name || '') + ' ' + (v.lang || ''); return (/natural|online|neural/i.test(n) ? 10 : 0) + (/en[-_]ie/i.test(v.lang) ? 3 : /en[-_]gb/i.test(v.lang) ? 2 : /en[-_]us/i.test(v.lang) ? 1 : 0); }
    return vs.sort(function (a, b) { return sc(b) - sc(a); }).map(function (v) { return { name: v.name, lang: v.lang, good: /natural|online|neural/i.test(v.name || '') }; });
  }
  function setVoice(name) { try { if (name) root.localStorage.setItem('wag_voice', name); else root.localStorage.removeItem('wag_voice'); } catch (e) { } pickVoice(); return voiceName(); }
  function voiceName() { return voice ? voice.name : ''; }
  if (hasTTS) { pickVoice(); try { syn.addEventListener('voiceschanged', pickVoice); } catch (e) { syn.onvoiceschanged = pickVoice; } }

  /* ---------------- recorded clips (IndexedDB) ---------------- */
  var clips = {}, dbp = null;
  function idb() {
    if (dbp) return dbp;
    dbp = new Promise(function (ok, no) {
      try {
        var rq = root.indexedDB.open('wa-voice', 1);
        rq.onupgradeneeded = function () { rq.result.createObjectStore('clips'); };
        rq.onsuccess = function () { ok(rq.result); };
        rq.onerror = function () { no(rq.error); };
      } catch (e) { no(e); }
    });
    return dbp;
  }
  function loadClips() {
    return idb().then(function (db) {
      return new Promise(function (ok) {
        var rq = db.transaction('clips').objectStore('clips').openCursor();
        rq.onsuccess = function () {
          var c = rq.result;
          if (c) { clips[c.key] = c.value; c.continue(); } else ok();
        };
        rq.onerror = function () { ok(); };
      });
    }).catch(function () { });
  }
  function putClip(key, blob) {
    clips[key] = blob;
    return idb().then(function (db) {
      return new Promise(function (ok, no) {
        var tx = db.transaction('clips', 'readwrite'); tx.objectStore('clips').put(blob, key);
        tx.oncomplete = ok; tx.onerror = function () { no(tx.error); };
      });
    });
  }
  function delClip(key) {
    delete clips[key];
    return idb().then(function (db) {
      return new Promise(function (ok) { var tx = db.transaction('clips', 'readwrite'); tx.objectStore('clips').delete(key); tx.oncomplete = ok; tx.onerror = ok; });
    }).catch(function () { });
  }
  var ready = loadClips();

  /* ---------------- playing ---------------- */
  function stop() {
    token++;
    try { if (hasTTS) syn.cancel(); } catch (e) { }
    if (curAudio) { try { curAudio.pause(); } catch (e) { } curAudio = null; }
  }
  // Respellings used ONLY for the computer voice (the page keeps the real spelling).
  var PRON = {
    mr: 'Mister', mrs: 'Missus', ms: 'Miz', dr: 'Doctor', st: 'Saint',
    aoife: 'Eefa', aoibhe: 'Eeva', cian: 'Keean', maebh: 'Maeve', fionn: 'Finn', cathal: 'Kahal', zainab: 'Zy-nab', siobhan: 'Shivawn', niamh: 'Neev', saoirse: 'Seer-sha', oisin: 'Usheen', ciara: 'Keera', eoin: 'Owen', tadhg: 'Tige', sean: 'Shawn', roisin: 'Ro-sheen',
    hic: 'hick', hics: 'hicks', shhh: 'shh', shhhh: 'shh', hmm: 'hmm', hmmph: 'hmph', brrr: 'brr', brrrr: 'brr', psst: 'pssst', ooh: 'ooh', whoosh: 'whoosh', coo: 'coo'
  };
  function pronWord(w, alone) {
    var m = /^([^A-Za-z']*)([A-Za-z']+)([^A-Za-z']*)$/.exec(w);
    if (!m) return w;
    var core = m[2], k = core.toLowerCase();
    if (alone && k === 'a') core = 'uh'; else if (alone && core === 'I') core = 'eye';
    else if (PRON[k]) core = PRON[k];
    else if (/^[A-Z]{2,}$/.test(core)) core = core.toLowerCase();   // CAT -> cat, so it is not spelled out
    return m[1] + core + m[3];
  }
  function ttsText(t, raw) {
    t = String(t);
    if (!raw && /^[A-Za-z]$/.test(t)) return nameOf(t);   // a lone letter is read by its NAME (letter games)
    return t.replace(/[^\s]+/g, function (w) { return pronWord(w, false); });
  }
  // Speak a list of words as one natural sentence and report which word is being spoken (for highlighting).
  // Uses the voice's word-boundary events when it has them; otherwise times the highlight by estimate.
  function speakWords(words, opts) {
    opts = opts || {};
    return ready.then(function () {
      return new Promise(function (ok) {
        if (!hasTTS || !words || !words.length) return ok();
        stop(); var my = token, alone = words.length === 1, text = '', offs = [], i, gotB = false, last = -1, timers = [], done = false;
        for (i = 0; i < words.length; i++) { if (i) text += ' '; offs.push(text.length); text += pronWord(String(words[i]), alone); }
        function mark(idx) { if (idx === last || my !== token) return; last = idx; if (opts.onWord) try { opts.onWord(idx); } catch (e) { } }
        function fin() { if (done) return; done = true; timers.forEach(clearTimeout); clearTimeout(guard); ok(); }
        var rate = opts.rate || 0.82;
        var u = new root.SpeechSynthesisUtterance(text);
        if (voice) { u.voice = voice; u.lang = voice.lang; } else u.lang = 'en-GB';
        u.rate = rate; u.pitch = 1.0;
        u.onboundary = function (e) {
          if (e.name && e.name !== 'word') return;
          gotB = true; var k = 0; for (var j = 0; j < offs.length; j++) if (offs[j] <= e.charIndex) k = j;
          mark(k);
        };
        u.onstart = function () {
          mark(0);
          timers.push(setTimeout(function () {       // no boundary events from this voice: estimate the timing
            if (gotB || my !== token || done) return;
            var t = 0; words.forEach(function (w, j) {
              var core = String(w).replace(/[^A-Za-z']/g, ''), dur = (230 + 62 * core.length) / rate + (/[,;:]$/.test(w) ? 220 : /[.!?…]["”')]*$/.test(w) ? 380 : 0);
              if (j > 0) { (function (jj, at) { timers.push(setTimeout(function () { if (!gotB) mark(jj); }, Math.max(0, at - 900))); })(j, t); }
              t += dur;
            });
          }, 900));
        };
        u.onend = fin; u.onerror = fin;
        var guard = setTimeout(fin, 4000 + words.length * 1500);
        cur = u;
        try { syn.speak(u); } catch (e) { fin(); }
      });
    });
  }
  var rawFlag = false;
  function speakTTS(text, my, rate) {
    return new Promise(function (ok) {
      if (!hasTTS || my !== token) return ok();
      var u = new root.SpeechSynthesisUtterance(ttsText(text, rawFlag)), done = false;
      if (voice) { u.voice = voice; u.lang = voice.lang; } else u.lang = 'en-GB';
      u.rate = rate || 0.82; u.pitch = 1.05;
      function fin() { if (!done) { done = true; clearTimeout(guard); ok(); } }
      u.onend = fin; u.onerror = fin;
      var guard = setTimeout(fin, 7000);
      cur = u;
      try { syn.speak(u); } catch (e) { fin(); }
    });
  }
  function playClip(blob, my) {
    return new Promise(function (ok) {
      if (my !== token) return ok();
      var url = root.URL.createObjectURL(blob), a = new root.Audio(url), done = false;
      function fin() { if (!done) { done = true; clearTimeout(guard); try { root.URL.revokeObjectURL(url); } catch (e) { } ok(); } }
      a.onended = fin; a.onerror = fin;
      var guard = setTimeout(fin, 6000);
      curAudio = a;
      var p = a.play(); if (p && p.catch) p.catch(fin);
    });
  }
  function one(item, my, rate) {
    if (item == null || item === '') return Promise.resolve();
    if (typeof item === 'string') return speakTTS(item, my, rate);
    var b = clips[item.k];
    return b ? playClip(b, my) : speakTTS(item.t, my, item.rate || rate);
  }
  function sayAll(items, opts) {
    opts = opts || {};
    stop(); rawFlag = !!opts.raw;
    var my = token, list = (items || []).filter(function (x) { return x != null && x !== ''; });
    return ready.then(function () {
      var p = Promise.resolve();
      list.forEach(function (it) {
        p = p.then(function () { return my === token ? one(it, my, opts.rate) : null; })
          .then(function () { return new Promise(function (ok) { setTimeout(ok, my === token ? (opts.gap || 220) : 0); }); });
      });
      return p;
    });
  }
  function say(item, opts) { return sayAll([item], opts); }

  /* ---------------- recording ---------------- */
  var rec = null;
  function canRecord() { return !!(root.navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia && root.MediaRecorder); }
  function startRecording(maxMs) {
    stop();
    return navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      var chunks = [], mr, stopped = false, resolveDone, finished = new Promise(function (r) { resolveDone = r; });
      try { mr = new root.MediaRecorder(stream); } catch (e) { stream.getTracks().forEach(function (t) { t.stop(); }); throw e; }
      mr.ondataavailable = function (e) { if (e.data && e.data.size) chunks.push(e.data); };
      mr.onstop = function () {
        stream.getTracks().forEach(function (t) { t.stop(); });
        resolveDone(new root.Blob(chunks, { type: mr.mimeType || 'audio/webm' }));
      };
      mr.start();
      var timer = setTimeout(function () { finish(); }, maxMs || 3500);
      function finish() { if (stopped) return finished; stopped = true; clearTimeout(timer); try { mr.stop(); } catch (e) { resolveDone(null); } return finished; }
      rec = { stop: finish };
      return rec;
    });
  }

  /* ---------------- recorder panel (parents) ---------------- */
  function el(tag, props, kids) {
    var n = document.createElement(tag), k;
    for (k in (props || {})) {
      if (k === 'text') n.textContent = props[k];
      else if (k.slice(0, 2) === 'on') n[k] = props[k];
      else n.setAttribute(k, props[k]);
    }
    (kids || []).forEach(function (c) { if (c) n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  function recorderPanel(onBack) {
    var sel = 'a', root_ = el('div', { class: 'wag-list' }), status = el('div', { class: 'wag-sub', text: '' });
    var gridBox = el('div', { class: 'wag-chips' }), detail = el('div', { class: 'wag-list' });
    function has(k) { return !!clips[k]; }
    function done(l) { return has('name:' + l) && has('sound:' + l) && has('word:' + wordOf(l)); }
    function drawGrid() {
      gridBox.innerHTML = '';
      LETTERS.forEach(function (l) {
        var b = el('button', { class: 'wag-icon big' + (l === sel ? ' sel' : ''), text: l.toUpperCase() + (done(l) ? '✓' : (has('name:' + l) || has('sound:' + l) || has('word:' + wordOf(l)) ? '·' : '')), 'aria-label': 'Letter ' + l });
        b.onclick = function () { sel = l; draw(); };
        gridBox.appendChild(b);
      });
    }
    function draw() {
      drawGrid();
      var l = sel, w = wordOf(l);
      detail.innerHTML = '';
      detail.appendChild(el('div', { class: 'wag-em big', text: l.toUpperCase() + ' ' + l }));
      [['Letter name (' + nameOf(l) + ')', 'name:' + l, nameItem(l)], ['Letter SOUND (' + soundOf(l) + ')', 'sound:' + l, soundItem(l)], ['Word: ' + w + ' ' + emojiOf(l), 'word:' + w, wordItem(w)]].forEach(function (r) {
        detail.appendChild(recRow(r[0], r[1], r[2]));
      });
    }
    function recRow(label, key, item) {
      var state = { r: null };
      var playB = el('button', { class: 'wag-btn alt', text: '▶ Hear' });
      var recB = el('button', { class: 'wag-btn', text: has(key) ? '🎙️ Record again' : '🎙️ Record' });
      var delB = has(key) ? el('button', { class: 'wag-btn alt', text: '🗑 Use the computer voice' }) : null;
      playB.onclick = function () { say(item); };
      if (delB) delB.onclick = function () { delClip(key).then(function () { status.textContent = 'Back to the computer voice for that one.'; draw(); }); };
      recB.onclick = function () {
        if (state.r) { state.r.stop(); return; }
        if (!canRecord()) { status.textContent = 'This browser cannot record. Try Chrome, Edge or Safari.'; return; }
        status.textContent = 'Starting the microphone…';
        startRecording(3500).then(function (r) {
          state.r = r; recB.textContent = '⏹ Stop'; status.textContent = 'Recording… say it clearly. It stops by itself after 3 seconds.';
          return r.stop().then(function (blob) {
            state.r = null; rec = null;
            if (!blob || blob.size < 800) { status.textContent = 'That was too quiet or too short. Try again.'; return draw(); }
            return putClip(key, blob).then(function () { status.textContent = 'Saved! Tap Hear to check it.'; draw(); });
          });
        }).catch(function () { state.r = null; status.textContent = 'The microphone is blocked. Allow it in the address bar and try again.'; });
      };
      return el('div', { class: 'wag-card wide', style: 'cursor:default;flex-wrap:wrap' }, [el('div', { class: 'wag-ct', style: 'width:100%' }, [el('div', { class: 'wag-cn', text: label }), el('div', { class: 'wag-row' }, [playB, recB]), delB])]);
    }
    root_.appendChild(el('h2', { class: 'wag-h', text: 'Record letter sounds' }));
    root_.appendChild(el('div', { class: 'wag-sub', text: 'Record your own voice for each letter name, letter sound and example word. The games use your recording instead of the computer voice. Recordings stay on this device.' }));
    root_.appendChild(gridBox); root_.appendChild(detail); root_.appendChild(status);
    root_.appendChild(el('button', { class: 'wag-btn alt', text: 'Back', onclick: function () { stop(); onBack(); } }));
    ready.then(draw);
    return root_;
  }

  root.WASpeech = {
    can: hasTTS, LETTERS: LETTERS, canRecord: canRecord,
    on: on, setOn: setOn, isSet: isSet, say: say, sayAll: sayAll, stop: stop,
    nameOf: nameOf, soundOf: soundOf, wordOf: wordOf, emojiOf: emojiOf,
    nameItem: nameItem, soundItem: soundItem, wordItem: wordItem,
    speakWords: speakWords, pron: pronWord, listVoices: listVoices, setVoice: setVoice, voiceName: voiceName,
    recorderPanel: recorderPanel, clips: clips, ready: ready, _putClip: putClip
  };
})(typeof window !== 'undefined' ? window : globalThis);
