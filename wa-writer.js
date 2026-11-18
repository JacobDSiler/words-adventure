/*! Words Adventure "Write" tab: WAWriter (uses wa-speech.js when present)
 * A writing station for little ones: word packs with pictures; tap a word to hear it, drag it (or press +) into the story strip,
 * drag tiles to re-order, tap "Read my story" to hear it with each word lit up, and "Fix-it" hides a few words so the child
 * picks the right one (listen, self-check, no scores). Stories save on the device.
 * API: WAWriter.open(profileOrNull)   WAWriter.close()
 */
(function (root) {
  'use strict';
  var doc = root.document, SP = root.WASpeech;
  if (!doc) return;
  var LSK = 'wa_writer_v1', LSW = 'wa_writer_words_v1';

  /* ---------- word packs: [word, emoji] ---------- */
  var LITTLE = 'the a an and is it to in on I me my we you he she they was are can see go look like said big up down not no yes with of at for but so one two'.split(' ').map(function (w) { return [w, '']; });
  function P(s) { return s.split(' ').map(function (x) { var p = x.split('/'); return [p[0], p[1] || '']; }); }
  var PACKS = [
    { k: 'first', t: '⭐ First words', w: LITTLE },
    { k: 'animals', t: '🐾 Animals', w: P('cat/🐱 dog/🐶 pig/🐷 hen/🐔 duck/🦆 frog/🐸 fox/🦊 bird/🐦 fish/🐟 cow/🐮 horse/🐴 bear/🐻 mouse/🐭 rabbit/🐰 sheep/🐑 owl/🦉 bee/🐝 lion/🦁 hedgehog/🦔 squirrel/🐿️ badger/🦡 goat/🐐 snail/🐌 dragon/🐉') },
    { k: 'home', t: '🏠 Home and me', w: P('mum/👩 dad/👨 baby/👶 friend/🧒 girl/👧 boy/👦 house/🏠 bed/🛏️ door/🚪 cup/☕ book/📖 ball/⚽ toy/🧸 cake/🎂 tea/🫖 car/🚗 bus/🚌 boat/⛵ hat/🎩 shoe/👟 hug/🤗') },
    { k: 'outside', t: '🌳 Outside', w: P('tree/🌳 flower/🌸 sun/☀️ moon/🌙 star/⭐ rain/🌧️ snow/❄️ cloud/☁️ hill/⛰️ river/🏞️ sea/🌊 wood/🌲 garden/🌻 rainbow/🌈 wind/💨') },
    { k: 'doing', t: '🏃 Doing words', w: P('run/🏃 walk jump hop skip sit sleep/😴 eat/🍎 drink play sing/🎤 dance/💃 read/📖 write/✏️ draw/🎨 make find help hide climb swim/🏊 fly/🕊️ laugh/😂 cry/😢 give take open shut') },
    { k: 'describe', t: '🎨 Describing', w: P('red/🔴 blue/🔵 green/🟢 yellow/🟡 small tiny huge fast slow soft loud quiet wet dry hot/🔥 cold/🧊 old new') },
    { k: 'feel', t: '😊 Feelings', w: P('happy/😀 sad/😢 scared/😨 cross/😠 excited/🤩 tired/😴 proud/😌 shy/🙈 kind/💛 brave/🦁 silly/🤪 funny/😆') },
    { k: 'join', t: '🔗 Joining words', w: P('and then because when where what who why how after before again too very every all some many') },
    { k: 'mine', t: '✏️ My words', w: [] }
  ];
  var CAT = {}; PACKS.forEach(function (p) { p.w.forEach(function (x) { if (!CAT[x[0].toLowerCase()]) CAT[x[0].toLowerCase()] = p.k; }); });
  var STARTERS = [['Once upon a time,', 'Once upon a time ,'], ['One day,', 'One day ,'], ['I like', 'I like'], ['The little', 'the little'], ['Suddenly,', 'Suddenly ,']];
  var SENT_END = /^[.!?]$/;

  /* ---------- helpers ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function lsGet(k, d) { try { var v = root.localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function lsSet(k, v) { try { root.localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
  function canSpeak() { return !!(SP && SP.can && SP.speakWords); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function hearWord(w) { if (!canSpeak()) return; try { SP.speakWords([String(w)], { rate: st.slow ? 0.62 : 0.78 }); } catch (e) { } }
  function stopSay() { try { if (SP) SP.stop(); } catch (e) { } }
  function uid() { return 's' + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36); }

  /* ---------- state ---------- */
  var st = { ov: null, prof: null, pid: 'guest', data: null, story: null, view: 'write', pack: 'first', slow: false, tok: 0, reading: false, mine: [], fix: null, level: 1, drag: null, picsOn: true };

  function load() {
    st.pid = st.prof && st.prof.id ? String(st.prof.id) : 'guest';
    var all = lsGet(LSK, {}); st.data = all[st.pid] || { cur: null, stories: [] };
    st.mine = (lsGet(LSW, {})[st.pid]) || [];
    var s = st.data.stories.filter(function (x) { return x.id === st.data.cur; })[0] || st.data.stories[0];
    if (!s) { s = newStory(); }
    st.story = s; st.data.cur = s.id;
  }
  function newStory() { var s = { id: uid(), title: '', tiles: [], t: Date.now() }; st.data.stories.unshift(s); return s; }
  function save() {
    if (!st.story) return; st.story.t = Date.now(); st.data.cur = st.story.id;
    var all = lsGet(LSK, {}); all[st.pid] = st.data; lsSet(LSK, all);
  }
  function saveMine() { var a = lsGet(LSW, {}); a[st.pid] = st.mine; lsSet(LSW, a); }

  /* ---------- css ---------- */
  var CSS = '' +
    '#waw{position:fixed;inset:0;z-index:99999;overflow:auto;background:linear-gradient(180deg,#fff4d6,#e9f3ff);font-family:Nunito,system-ui,sans-serif;color:#1A2E4A;-webkit-user-select:none;user-select:none}' +
    '#waw *{box-sizing:border-box}' +
    '.ww-wrap{max-width:900px;margin:0 auto;padding:10px 14px 40px}' +
    '.ww-top{display:flex;gap:8px;align-items:center;margin-bottom:8px}' +
    '.ww-btn{border:0;border-radius:16px;padding:10px 14px;font:800 1rem Nunito,sans-serif;cursor:pointer;background:#e8edf7;color:#1A2E4A;min-height:46px}' +
    '.ww-btn.go{background:#2D6BE4;color:#fff}.ww-btn.fun{background:#FF6B6B;color:#fff}.ww-btn.ok{background:#06D6A0;color:#fff}.ww-btn.sun{background:#ffb703}' +
    '.ww-btn:disabled{opacity:.4}.ww-btn:active{transform:scale(.95)}' +
    '.ww-title{flex:1;min-width:0;font:800 1.25rem "Baloo 2",Nunito,sans-serif;border:3px solid #d7defa;border-radius:14px;padding:8px 12px;background:#fff;color:#1A2E4A;-webkit-user-select:text;user-select:text}' +
    '.ww-strip{min-height:170px;background:#fff;border-radius:24px;border:4px dashed #b9c7f2;padding:14px;display:flex;flex-wrap:wrap;gap:10px 8px;align-content:flex-start;box-shadow:0 5px 16px rgba(26,46,74,.12)}' +
    '.ww-strip.over{border-color:#2D6BE4;background:#f3f8ff}' +
    '.ww-empty{color:#7a8aa8;font-weight:800;font-size:1.2rem;width:100%;text-align:center;padding:30px 10px}' +
    '.ww-tile{position:relative;display:inline-flex;flex-direction:column;align-items:center;justify-content:center;background:#fffbe8;border:3px solid #e6c85c;border-radius:14px;padding:6px 14px 8px;font:800 clamp(1.5rem,5.4vw,2rem)/1.2 "Baloo 2",Nunito,sans-serif;cursor:grab;touch-action:pan-y;box-shadow:0 3px 0 #e6c85c;transition:transform .12s}' +
    '.ww-tile .em{font-size:1.25rem;line-height:1}' +
    '.ww-tile.p{background:#eef2fb;border-color:#b9c7f2;box-shadow:0 3px 0 #b9c7f2;padding:6px 12px;min-width:36px}' +
    '.ww-tile.cw{background:#ffb703;border-color:#e59400;box-shadow:0 3px 0 #e59400;transform:scale(1.12)}' +
    '.ww-tile.lit{background:#ffe9a0}' +
    '.ww-tile.src{opacity:.25}' +
    '.ww-tile.ins{box-shadow:-9px 0 0 -3px #2D6BE4,0 3px 0 #e6c85c}' +
    '.ww-strip.insend::after{content:"";width:6px;height:46px;background:#2D6BE4;border-radius:3px}' +
    '.ww-x{position:absolute;top:-10px;right:-10px;width:26px;height:26px;border-radius:50%;border:2px solid #fff;background:#ff6b6b;color:#fff;font:900 .85rem/1 Nunito;cursor:pointer;padding:0;display:none}' +
    '.ww-tile:hover .ww-x,.ww-tile.sel .ww-x{display:block}' +
    '.ww-bar{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}' +
    '.ww-tabs{display:flex;gap:6px;overflow-x:auto;padding:4px 2px 8px;-webkit-overflow-scrolling:touch}' +
    '.ww-tab{flex:0 0 auto;border:3px solid #d7defa;background:#fff;border-radius:999px;padding:7px 12px;font:800 .95rem Nunito;cursor:pointer;color:#1A2E4A}' +
    '.ww-tab.on{background:#2D6BE4;border-color:#2D6BE4;color:#fff}' +
    '.ww-bank{display:flex;flex-wrap:wrap;gap:8px;background:rgba(255,255,255,.7);border-radius:20px;padding:12px;min-height:120px}' +
    '.ww-chip{display:inline-flex;align-items:stretch;background:#fff;border:3px solid #cfe0ff;border-radius:14px;overflow:hidden;box-shadow:0 3px 0 #cfe0ff}' +
    '.ww-w{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:6px 12px;font:800 1.3rem/1.15 "Baloo 2",Nunito,sans-serif;cursor:grab;touch-action:pan-y;min-width:54px}' +
    '.ww-w .em{font-size:1.5rem;line-height:1}' +
    '.ww-add{border:0;border-left:3px solid #cfe0ff;background:#e7f7ef;color:#0a9a6b;font:900 1.4rem Nunito;width:42px;cursor:pointer;padding:0}' +
    '.ww-add:active{background:#06D6A0;color:#fff}' +
    '.ww-ghost{position:fixed;z-index:100001;pointer-events:none;background:#fffbe8;border:3px solid #2D6BE4;border-radius:14px;padding:6px 14px;font:800 1.7rem "Baloo 2",Nunito,sans-serif;box-shadow:0 8px 20px rgba(0,0,0,.25);transform:translate(-50%,-60%) rotate(-3deg)}' +
    '.ww-own{display:flex;gap:6px;margin-top:8px;width:100%}' +
    '.ww-own input{flex:1;min-width:0;font:700 1.05rem Nunito;border:3px solid #d7defa;border-radius:12px;padding:8px 10px;-webkit-user-select:text;user-select:text}' +
    '.ww-note{font-weight:800;text-align:center;margin:8px 0;opacity:.85}' +
    '.ww-msg{background:#fff;border-radius:18px;padding:12px 14px;font-weight:800;font-size:1.1rem;text-align:center;margin:10px 0;box-shadow:0 3px 8px rgba(0,0,0,.08)}' +
    '.ww-blank{display:inline-block;min-width:88px;height:56px;border:4px dashed #ff9aa2;border-radius:14px;background:#fff0f1;vertical-align:middle}' +
    '.ww-blank.cur{border-color:#2D6BE4;background:#e8f0ff;animation:wwp 1s infinite}' +
    '@keyframes wwp{50%{box-shadow:0 0 0 6px rgba(45,107,228,.25)}}' +
    '.ww-tile.fixed{background:#d9f7ea;border-color:#06D6A0;box-shadow:0 3px 0 #06D6A0}' +
    '.ww-choices{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin:12px 0}' +
    '.ww-choice{border:4px solid #cfe0ff;background:#fff;border-radius:18px;padding:12px 22px;font:800 1.8rem "Baloo 2",Nunito,sans-serif;cursor:pointer;color:#1A2E4A;min-width:110px}' +
    '.ww-choice.no{opacity:.35;animation:wwsh .4s}.ww-choice.yes{background:#06D6A0;color:#fff;border-color:#06D6A0}' +
    '@keyframes wwsh{25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}' +
    '.ww-modal{position:fixed;inset:0;background:rgba(26,46,74,.5);z-index:100000;display:flex;align-items:center;justify-content:center;padding:16px}' +
    '.ww-card{background:#fff;border-radius:22px;max-width:520px;width:100%;max-height:80vh;overflow:auto;padding:16px}' +
    '.ww-row{display:flex;gap:8px;align-items:center;padding:8px;border-radius:12px;background:#f3f6fd;margin:6px 0;font-weight:800}' +
    '.ww-row .t{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
    '.ww-lv{display:flex;gap:6px;justify-content:center;margin:8px 0}' +
    '@media (prefers-reduced-motion:reduce){.ww-blank.cur,.ww-choice.no{animation:none}}';

  /* ---------- text rules ---------- */
  function wordTiles() { var r = []; st.story.tiles.forEach(function (t, i) { if (!t.p) r.push(i); }); return r; }
  function displayText(i) {
    var tiles = st.story.tiles, t = tiles[i];
    if (t.p) return t.w;
    var cap = (t.w === 'i') || (t.w === 'I'), j;
    var prev = null; for (j = i - 1; j >= 0; j--) { if (!tiles[j].p) { prev = tiles[j]; break; } if (SENT_END.test(tiles[j].w)) { prev = { end: 1 }; break; } }
    var firstWord = !prev || prev.end;
    if (firstWord || cap) return t.w === 'i' ? 'I' : t.w.charAt(0).toUpperCase() + t.w.slice(1);
    return t.w;
  }
  function sentences() {
    var tiles = st.story.tiles, out = [], cur = { idx: [], words: [] };
    tiles.forEach(function (t, i) {
      if (t.p) { if (cur.words.length) { cur.words[cur.words.length - 1] += t.w; if (SENT_END.test(t.w)) { out.push(cur); cur = { idx: [], words: [] }; } } return; }
      cur.idx.push(i); cur.words.push(displayText(i));
    });
    if (cur.words.length) out.push(cur);
    return out;
  }

  /* ---------- views ---------- */
  function paint(html) { st.ov.innerHTML = '<div class="ww-wrap">' + html + '</div>'; }
  function tileHtml(i, o) {
    var t = st.story.tiles[i]; o = o || {};
    if (o.blank) return '<span class="ww-blank' + (o.cur ? ' cur' : '') + '" data-i="' + i + '" aria-label="missing word"></span>';
    return '<span class="ww-tile' + (t.p ? ' p' : '') + (o.fixed ? ' fixed' : '') + '" data-i="' + i + '" tabindex="0">' + (t.e && st.picsOn && !t.p ? '<span class="em">' + t.e + '</span>' : '') + esc(displayText(i)) +
      (o.ro ? '' : '<button class="ww-x" data-x="' + i + '" aria-label="Remove ' + esc(t.w) + '">×</button>') + '</span>';
  }
  function stripHtml() {
    var tiles = st.story.tiles;
    if (!tiles.length) return '<div class="ww-empty">Tap a word to hear it.<br>Press <b>+</b> or drag it up here to start your story! ✨</div>';
    return tiles.map(function (t, i) { return tileHtml(i); }).join('');
  }
  function packHtml() {
    var p = PACKS.filter(function (x) { return x.k === st.pack; })[0] || PACKS[0];
    var words = p.k === 'mine' ? st.mine.map(function (w) { return [w, '']; }) : p.w;
    var html = words.map(function (x) {
      return '<span class="ww-chip"><span class="ww-w" data-w="' + esc(x[0]) + '" data-e="' + esc(x[1]) + '">' + (x[1] && st.picsOn ? '<span class="em">' + x[1] + '</span>' : '') + esc(x[0]) + '</span><button class="ww-add" data-add="' + esc(x[0]) + '" data-e="' + esc(x[1]) + '" aria-label="Add ' + esc(x[0]) + ' to my story">+</button></span>';
    }).join('');
    if (p.k === 'mine') html += '<div class="ww-own"><input id="ww-own" maxlength="20" placeholder="Type a new word..." autocapitalize="none" autocomplete="off"><button class="ww-btn go" id="ww-ownadd">Add</button></div>' + (words.length ? '' : '<div class="ww-note" style="width:100%">Type a word you want and press Add. It stays in your words.</div>');
    return html;
  }
  function writeView() {
    var s = st.story, n = wordTiles().length;
    paint(
      '<div class="ww-top"><button class="ww-btn" data-a="back" aria-label="Back">←</button><input class="ww-title" id="ww-title" maxlength="40" placeholder="My story title" value="' + esc(s.title) + '"><button class="ww-btn" data-a="list" title="My stories">📚</button><button class="ww-btn sun" data-a="new" title="New story">＋ New</button></div>' +
      '<div class="ww-strip" id="ww-strip">' + stripHtml() + '</div>' +
      '<div class="ww-bar"><button class="ww-btn fun" data-a="read" id="ww-read"' + (canSpeak() ? '' : ' style="display:none"') + '>🔊 Read my story</button>' +
      '<button class="ww-btn" data-a="slow" id="ww-slow"' + (canSpeak() ? '' : ' style="display:none"') + '>' + (st.slow ? '🐢' : '🐇') + '</button>' +
      '<button class="ww-btn go" data-a="fix" id="ww-fix">🔍 Fix-it game</button>' +
      '<button class="ww-btn" data-a="punct" data-p=".">.</button><button class="ww-btn" data-a="punct" data-p=",">,</button><button class="ww-btn" data-a="punct" data-p="?">?</button><button class="ww-btn" data-a="punct" data-p="!">!</button>' +
      '<button class="ww-btn" data-a="pics" title="Show or hide pictures">' + (st.picsOn ? '🖼️' : '🔤') + '</button><button class="ww-btn" data-a="undo" title="Take back the last word">↩</button></div>' +
      '<div class="ww-note" id="ww-count">' + (n ? 'Your story has ' + n + ' word' + (n === 1 ? '' : 's') + '.' : '') + '</div>' +
      '<div class="ww-bar" style="margin-top:0">' + STARTERS.map(function (x, i) { return '<button class="ww-btn" data-a="starter" data-s="' + i + '">' + esc(x[0]) + '</button>'; }).join('') + '</div>' +
      '<div class="ww-tabs" id="ww-tabs">' + PACKS.map(function (p) { return '<button class="ww-tab' + (p.k === st.pack ? ' on' : '') + '" data-pack="' + p.k + '">' + p.t + '</button>'; }).join('') + '</div>' +
      '<div class="ww-bank" id="ww-bank">' + packHtml() + '</div>');
  }
  function refreshStrip() {
    var el = st.ov.querySelector('#ww-strip'); if (!el) return; el.innerHTML = stripHtml();
    var n = wordTiles().length, c = st.ov.querySelector('#ww-count'); if (c) c.textContent = n ? 'Your story has ' + n + ' word' + (n === 1 ? '' : 's') + '.' : '';
    save();
  }
  function refreshBank() { var b = st.ov.querySelector('#ww-bank'); if (b) b.innerHTML = packHtml(); var tb = st.ov.querySelectorAll('.ww-tab'); for (var i = 0; i < tb.length; i++) tb[i].classList.toggle('on', tb[i].getAttribute('data-pack') === st.pack); }

  /* ---------- editing ---------- */
  function addTile(w, e, at) {
    var tile = { w: w }; if (e) tile.e = e;
    var a = st.story.tiles; if (at == null || at > a.length) a.push(tile); else a.splice(at, 0, tile);
    refreshStrip();
  }
  function addPunct(p) { var a = st.story.tiles; if (!a.length || a[a.length - 1].p && a[a.length - 1].w === p) return; a.push({ w: p, p: 1 }); refreshStrip(); }

  /* ---------- dragging ---------- */
  function onDown(ev) {
    if (st.view !== 'write') return;
    if (ev.target.closest('.ww-x') || ev.target.closest('.ww-add')) return;
    var src = ev.target.closest('.ww-w, .ww-tile'); if (!src) return;
    if (ev.pointerType === 'mouse' && ev.button !== 0) return;
    var isTile = src.classList.contains('ww-tile');
    var d = { src: isTile ? 'tile' : 'bank', el: src, id: ev.pointerId, x0: ev.clientX, y0: ev.clientY, started: false, touch: ev.pointerType === 'touch', hold: ev.pointerType !== 'touch', idx: isTile ? +src.getAttribute('data-i') : -1, w: isTile ? st.story.tiles[+src.getAttribute('data-i')].w : src.getAttribute('data-w'), e: isTile ? (st.story.tiles[+src.getAttribute('data-i')].e || '') : src.getAttribute('data-e'), p: isTile && st.story.tiles[+src.getAttribute('data-i')].p, ins: null };
    st.drag = d;
    if (d.touch) d.timer = setTimeout(function () { if (st.drag === d) { d.hold = true; } }, 170);
  }
  function startDrag(d) {
    d.started = true;
    var g = doc.createElement('div'); g.className = 'ww-ghost'; g.textContent = (d.e ? d.e + ' ' : '') + d.w; doc.body.appendChild(g); d.ghost = g;
    if (d.src === 'tile') d.el.classList.add('src');
    if (d.touch) { d.tm = function (e) { if (e.cancelable) e.preventDefault(); }; doc.addEventListener('touchmove', d.tm, { passive: false }); }
  }
  function insertionIndex(x, y) {
    var strip = st.ov.querySelector('#ww-strip'), tiles = strip.querySelectorAll('.ww-tile'), best = null;
    for (var i = 0; i < tiles.length; i++) {
      var el = tiles[i], r = el.getBoundingClientRect(), idx = +el.getAttribute('data-i');
      if (st.drag.src === 'tile' && idx === st.drag.idx) continue;
      if (y < r.top || (y <= r.bottom && x < r.left + r.width / 2)) { best = { el: el, idx: idx }; break; }
    }
    return best;
  }
  function onMove(ev) {
    var d = st.drag; if (!d || ev.pointerId !== d.id) return;
    var dx = ev.clientX - d.x0, dy = ev.clientY - d.y0, dist = Math.sqrt(dx * dx + dy * dy);
    if (!d.started) {
      if (d.touch && !d.hold) { if (dist > 10) { clearTimeout(d.timer); st.drag = null; } return; }
      if (dist < 6) return; startDrag(d);
    }
    d.ghost.style.left = ev.clientX + 'px'; d.ghost.style.top = ev.clientY + 'px';
    var strip = st.ov.querySelector('#ww-strip'), r = strip.getBoundingClientRect();
    var inside = ev.clientX >= r.left - 10 && ev.clientX <= r.right + 10 && ev.clientY >= r.top - 30 && ev.clientY <= r.bottom + 30;
    var old = strip.querySelector('.ins'); if (old) old.classList.remove('ins'); strip.classList.remove('insend', 'over');
    d.ins = null; d.inside = inside;
    if (inside) { strip.classList.add('over'); var b = insertionIndex(ev.clientX, ev.clientY); if (b) { b.el.classList.add('ins'); d.ins = b.idx; } else { strip.classList.add('insend'); d.ins = 'end'; } }
  }
  function onUp(ev) {
    var d = st.drag; if (!d || (ev.pointerId != null && ev.pointerId !== d.id)) return;
    st.drag = null; clearTimeout(d.timer); if (d.tm) doc.removeEventListener('touchmove', d.tm);
    if (d.ghost) d.ghost.remove();
    var strip = st.ov && st.ov.querySelector('#ww-strip'); if (strip) strip.classList.remove('insend', 'over');
    if (!d.started) { if (ev.type === 'pointerup' && !d.p) hearWord(d.w); else if (ev.type === 'pointerup' && d.p) { } return; }
    var a = st.story.tiles;
    if (d.src === 'bank') { if (d.inside) addTile(d.w, d.e, d.ins === 'end' || d.ins == null ? null : d.ins); return; }
    // reorder or drag out
    if (!d.inside) { a.splice(d.idx, 1); refreshStrip(); return; }
    var item = a.splice(d.idx, 1)[0], at = (d.ins === 'end' || d.ins == null) ? a.length : (d.ins > d.idx ? d.ins - 1 : d.ins);
    a.splice(at, 0, item); refreshStrip();
  }

  /* ---------- reading ---------- */
  function lit(i) { var o = st.ov.querySelectorAll('.ww-tile.cw'); for (var k = 0; k < o.length; k++) o[k].classList.remove('cw'); if (i == null) return; var el = st.ov.querySelector('.ww-tile[data-i="' + i + '"]'); if (el) el.classList.add('cw'); }
  function stopRead() { st.tok++; st.reading = false; stopSay(); lit(null); var b = st.ov && st.ov.querySelector('#ww-read'); if (b) b.textContent = '🔊 Read my story'; }
  function readStory(done) {
    var sents = sentences(); if (!sents.length || !canSpeak()) { if (done) done(); return; }
    var my = ++st.tok, k = 0; st.reading = true;
    var b = st.ov.querySelector('#ww-read'); if (b) b.textContent = '⏹ Stop';
    (function next() {
      if (my !== st.tok) return;
      if (k >= sents.length) { st.reading = false; lit(null); if (b) b.textContent = '🔊 Read my story'; if (done) done(); return; }
      var s = sents[k++];
      SP.speakWords(s.words, { rate: st.slow ? 0.62 : 0.82, onWord: function (i) { if (my === st.tok) lit(s.idx[i]); } }).then(function () { if (my === st.tok) setTimeout(next, 260); });
    })();
  }

  /* ---------- fix-it ---------- */
  function pickDistractors(w, pool) {
    var lw = w.toLowerCase(), cat = CAT[lw], same = [], other = [];
    var inCat = cat ? PACKS.filter(function (p) { return p.k === cat; })[0].w.map(function (x) { return x[0]; }) : LITTLE.map(function (x) { return x[0]; });
    same = shuffle(inCat.filter(function (x) { return x.toLowerCase() !== lw; }));
    other = shuffle(pool.filter(function (x) { return x.toLowerCase() !== lw && same.slice(0, 1).indexOf(x) < 0; }));
    var out = []; if (same.length) out.push(same[0]);
    var rest = other.concat(same.slice(1));
    for (var i = 0; i < rest.length && out.length < 2; i++) if (out.indexOf(rest[i]) < 0) out.push(rest[i]);
    return out;
  }
  function startFix() {
    stopRead();
    var wt = wordTiles(); var tiles = st.story.tiles;
    if (wt.length < 4) { toast('Write at least 4 words first, then try the Fix-it game!'); return; }
    var counts = { 1: 1, 2: 2, 3: 3 }, want = Math.min(counts[st.level], Math.max(1, Math.floor(wt.length / 3)));
    var cand = shuffle(wt);
    if (st.level === 1) { var small = cand.filter(function (i) { return CAT[tiles[i].w.toLowerCase()] === 'first'; }); cand = small.concat(cand.filter(function (i) { return small.indexOf(i) < 0; })); }
    var hid = [];
    for (var pass = 0; pass < 2 && hid.length < want; pass++) cand.forEach(function (i) { if (hid.length >= want || hid.indexOf(i) >= 0) return; if (pass === 0 && hid.some(function (h) { return Math.abs(h - i) <= 1; })) return; hid.push(i); });
    hid.sort(function (a, b) { return a - b; });
    var pool = wt.map(function (i) { return tiles[i].w; });
    st.fix = { hidden: hid, cur: 0, fixed: {}, total: wt.length, wrong: {}, order: hid.map(function (i) { var w = tiles[i].w, ch = shuffle([w].concat(pickDistractors(w, pool))); return ch; }) };
    st.view = 'fix'; fixView();
  }
  function fixView() {
    var f = st.fix, tiles = st.story.tiles, done = f.cur >= f.hidden.length;
    var strip = tiles.map(function (t, i) { var h = f.hidden.indexOf(i); if (h >= 0 && !f.fixed[i]) return tileHtml(i, { blank: 1, cur: h === f.cur }); return tileHtml(i, { ro: 1, fixed: !!f.fixed[i] }); }).join('');
    var cur = f.hidden[f.cur], ch = done ? [] : f.order[f.cur];
    paint(
      '<div class="ww-top"><button class="ww-btn" data-a="fixback" aria-label="Back to writing">← My story</button><div style="flex:1;font:800 1.2rem \'Baloo 2\',Nunito">🔍 Fix-it: ' + esc(st.story.title || 'my story') + '</div></div>' +
      '<div class="ww-lv">' + [1, 2, 3].map(function (n) { return '<button class="ww-tab' + (st.level === n ? ' on' : '') + '" data-lv="' + n + '">' + ['Easy', 'Medium', 'Tricky'][n - 1] + '</button>'; }).join('') + '</div>' +
      '<div class="ww-msg" id="ww-fm">' + (done ? '🎉 You fixed it! Every word is back. Let\'s read it together.' : 'Your story has ' + f.total + ' words. I hid ' + f.hidden.length + ' of them' + (f.hidden.length > 1 ? ' (' + (f.hidden.length - f.cur) + ' left)' : '') + '. Which word fits in the empty box?') + '</div>' +
      '<div class="ww-strip" id="ww-strip" style="cursor:default">' + strip + '</div>' +
      (done ? '<div class="ww-bar" style="justify-content:center"><button class="ww-btn fun" data-a="fixread">🔊 Read it</button><button class="ww-btn go" data-a="fixagain">🔍 Fix another</button><button class="ww-btn ok" data-a="fixback">✍️ Back to writing</button></div>' :
        (canSpeak() ? '<div class="ww-bar" style="justify-content:center"><button class="ww-btn" data-a="fixhear">🔊 Hear the sentence</button></div>' : '') +
        '<div class="ww-choices">' + ch.map(function (w) { var lab = (!done && displayText(cur) !== tiles[cur].w && w !== 'I') ? w.charAt(0).toUpperCase() + w.slice(1) : w; return '<button class="ww-choice" data-c="' + esc(w) + '">' + esc(lab) + '</button>'; }).join('') + '</div>'));
    if (done) { burst(); if (canSpeak()) setTimeout(function () { if (st.view === 'fix' && st.fix === f) readStory(); }, 500); }
  }
  function sentenceWith(tileIdx, repl) {
    var s = sentences().filter(function (x) { return x.idx.indexOf(tileIdx) >= 0; })[0]; if (!s) return [];
    return s.words.map(function (w, k) { return s.idx[k] === tileIdx ? (repl == null ? 'blank' : repl) + (w.match(/[.,!?]+$/) || [''])[0] : (st.fix.hidden.indexOf(s.idx[k]) >= 0 && !st.fix.fixed[s.idx[k]] ? 'blank' : w); });
  }
  function chooseFix(btn) {
    var f = st.fix, cur = f.hidden[f.cur], pick = btn.getAttribute('data-c'), right = st.story.tiles[cur].w;
    if (pick.toLowerCase() === right.toLowerCase()) {
      btn.classList.add('yes'); f.fixed[cur] = 1; f.cur++; stopSay();
      if (canSpeak()) { hearWord(right); }
      setTimeout(function () { if (st.view === 'fix' && st.fix === f) fixView(); }, 650);
    } else {
      btn.classList.add('no'); btn.disabled = true;
      var m = st.ov.querySelector('#ww-fm'); if (m) m.textContent = 'Hmm, listen: does that sound right? Try another word.';
      if (canSpeak()) { var words = sentenceWith(cur, pick); SP.speakWords(words.map(function (w) { return w === 'blank' ? 'blank' : w; }), { rate: 0.8 }); }
    }
  }
  function burst() { var els = ['🎉', '⭐', '✨', '🌟']; for (var i = 0; i < 14; i++) { var s = doc.createElement('div'); s.textContent = els[i % 4]; s.style.cssText = 'position:fixed;top:-30px;left:' + Math.random() * 100 + 'vw;font-size:' + (20 + Math.random() * 24) + 'px;z-index:100002;pointer-events:none;transition:transform 1.6s ease-in,opacity 1.6s;'; doc.body.appendChild(s); (function (e) { setTimeout(function () { e.style.transform = 'translateY(' + (innerHeight + 60) + 'px) rotate(' + (Math.random() * 360) + 'deg)'; e.style.opacity = '0'; }, 30); setTimeout(function () { e.remove(); }, 1800); })(s); } }

  /* ---------- small UI bits ---------- */
  function toast(msg) { var n = st.ov && st.ov.querySelector('#ww-count'); if (n && st.view === 'write') { n.textContent = msg; n.style.color = '#c2410c'; setTimeout(function () { if (n) { n.style.color = ''; refreshStrip(); } }, 2600); } }
  function listModal() {
    var m = doc.createElement('div'); m.className = 'ww-modal';
    function draw() {
      var rows = st.data.stories.map(function (s) {
        var n = s.tiles.filter(function (t) { return !t.p; }).length, nm = s.title || (s.tiles.slice(0, 5).map(function (t) { return t.w; }).join(' ') || 'Empty story');
        return '<div class="ww-row"><span class="t">' + esc(nm) + ' <small>(' + n + ' words)</small></span><button class="ww-btn go" data-o="' + s.id + '">Open</button><button class="ww-btn" data-d="' + s.id + '" aria-label="Delete">🗑️</button></div>';
      }).join('');
      m.innerHTML = '<div class="ww-card"><h3 style="margin:0 0 6px;font-family:\'Baloo 2\',Nunito">📚 My stories</h3>' + (rows || '<div class="ww-note">No stories yet.</div>') + '<div style="text-align:right;margin-top:8px"><button class="ww-btn" data-close="1">Close</button></div></div>';
    }
    draw(); doc.body.appendChild(m);
    var sure = null;
    m.addEventListener('click', function (e) {
      var o = e.target.closest('[data-o]'), d = e.target.closest('[data-d]');
      if (e.target === m || e.target.closest('[data-close]')) { m.remove(); return; }
      if (o) { var s = st.data.stories.filter(function (x) { return x.id === o.getAttribute('data-o'); })[0]; if (s) { stopRead(); st.story = s; save(); m.remove(); st.view = 'write'; writeView(); } }
      if (d) {
        var id = d.getAttribute('data-d');
        if (sure !== id) { sure = id; d.textContent = 'Sure?'; d.classList.add('fun'); return; }
        st.data.stories = st.data.stories.filter(function (x) { return x.id !== id; });
        if (!st.data.stories.length) newStory();
        if (st.story.id === id) { st.story = st.data.stories[0]; }
        save(); sure = null; draw(); if (st.view === 'write') writeView();
      }
    });
  }

  /* ---------- events ---------- */
  function wire() {
    var ov = st.ov;
    ov.addEventListener('pointerdown', onDown);
    doc.addEventListener('pointermove', onMove); doc.addEventListener('pointerup', onUp); doc.addEventListener('pointercancel', onUp);
    ov.addEventListener('click', function (ev) {
      var t = ev.target, b;
      if ((b = t.closest('[data-add]'))) { addTile(b.getAttribute('data-add'), b.getAttribute('data-e')); hearWord(b.getAttribute('data-add')); return; }
      if ((b = t.closest('[data-x]'))) { st.story.tiles.splice(+b.getAttribute('data-x'), 1); refreshStrip(); return; }
      if ((b = t.closest('[data-pack]'))) { st.pack = b.getAttribute('data-pack'); refreshBank(); return; }
      if ((b = t.closest('[data-lv]'))) { st.level = +b.getAttribute('data-lv'); startFix(); return; }
      if ((b = t.closest('[data-c]'))) { chooseFix(b); return; }
      if (t.closest('#ww-ownadd')) { addOwn(); return; }
      if ((b = t.closest('[data-a]'))) {
        var a = b.getAttribute('data-a');
        if (a === 'back') { close(); }
        else if (a === 'list') { listModal(); }
        else if (a === 'new') { stopRead(); st.story = newStory(); save(); writeView(); }
        else if (a === 'read') { if (st.reading) stopRead(); else readStory(); }
        else if (a === 'slow') { st.slow = !st.slow; b.textContent = st.slow ? '🐢' : '🐇'; }
        else if (a === 'fix') { startFix(); }
        else if (a === 'fixback') { stopRead(); st.view = 'write'; st.fix = null; writeView(); }
        else if (a === 'fixagain') { startFix(); }
        else if (a === 'fixread') { readStory(); }
        else if (a === 'fixhear') { var f = st.fix; if (f && f.cur < f.hidden.length && canSpeak()) SP.speakWords(sentenceWith(f.hidden[f.cur], null), { rate: 0.8 }); }
        else if (a === 'punct') { addPunct(b.getAttribute('data-p')); }
        else if (a === 'pics') { st.picsOn = !st.picsOn; writeView(); }
        else if (a === 'undo') { st.story.tiles.pop(); refreshStrip(); }
        else if (a === 'starter') { var x = STARTERS[+b.getAttribute('data-s')][1].split(' '); x.forEach(function (w) { if (w === ',') addPunct(','); else addTile(w === 'I' ? 'I' : w.toLowerCase(), ''); }); }
        return;
      }
    });
    ov.addEventListener('input', function (ev) { if (ev.target.id === 'ww-title') { st.story.title = ev.target.value; save(); } });
    ov.addEventListener('keydown', function (ev) { if (ev.target.id === 'ww-own' && ev.key === 'Enter') addOwn(); });
  }
  function addOwn() {
    var inp = st.ov.querySelector('#ww-own'); if (!inp) return;
    var w = inp.value.trim().replace(/[^A-Za-z'\-]/g, ''); if (!w) return;
    if (st.mine.map(function (x) { return x.toLowerCase(); }).indexOf(w.toLowerCase()) < 0) { st.mine.push(w); saveMine(); }
    addTile(w, ''); hearWord(w); refreshBank();
    var i2 = st.ov.querySelector('#ww-own'); if (i2) i2.focus();
  }

  /* ---------- open / close ---------- */
  function open(prof) {
    if (st.ov) close();
    st.prof = prof || null; st.view = 'write'; st.fix = null; st.reading = false;
    if (!doc.getElementById('waw-css')) { var s = doc.createElement('style'); s.id = 'waw-css'; s.textContent = CSS; doc.head.appendChild(s); }
    load();
    st.pack = /^(PS|PK|K|1)$/.test(String(prof && prof.gradeId || 'K')) || !prof ? 'first' : 'first';
    st.ov = doc.createElement('div'); st.ov.id = 'waw'; st.ov.setAttribute('role', 'dialog'); st.ov.setAttribute('aria-label', 'Writing station'); doc.body.appendChild(st.ov);
    wire(); writeView();
  }
  function close() {
    stopRead(); stopSay(); save();
    doc.removeEventListener('pointermove', onMove); doc.removeEventListener('pointerup', onUp); doc.removeEventListener('pointercancel', onUp);
    if (st.drag && st.drag.ghost) st.drag.ghost.remove(); st.drag = null;
    if (st.ov) { st.ov.remove(); st.ov = null; }
  }
  root.WAWriter = { open: open, close: close, _packs: PACKS };
})(typeof window !== 'undefined' ? window : globalThis);
