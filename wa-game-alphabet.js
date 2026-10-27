/*! Alphabet Explorer: learn letters and sounds for Words Adventure (plugin for wa-games.js + wa-game-kit.js)
 * No quiz and no clock: one letter at a time with a big capital and small letter, a picture, and a voice that says the
 * letter name, its SOUND and a word. Tap anything to hear it again. Uses recorded voices from wa-speech.js when a parent made them.
 * App topics: early_letters, letter_sounds.
 */
(function (root) {
  'use strict';
  var WAG = root.WAGames, K = WAG && WAG.kit, SP = root.WASpeech;
  if (!K) throw new Error('Load wa-games.js and wa-game-kit.js before wa-game-alphabet.js');
  var ABC = 'abcdefghijklmnopqrstuvwxyz'.split('');
  var NAVY = '#1b2a49';

  function tell(l) {   // the full lesson for one letter
    var n = SP ? SP.nameItem(l) : l, s = SP ? SP.soundItem(l) : l, w = SP ? SP.wordItem(SP.wordOf(l)) : '';
    return [n, s, n, 'is for', w];
  }

  WAG.register({
    id: 'alphabet', name: 'Alphabet Explorer', emoji: '🔠', blurb: 'Hear every letter and its sound',
    grades: 'Ages 2 to 4', modes: ['solo'], rounds: 26, maxLevel: 1, maxDurationMs: 20 * 60 * 1000,
    readAloud: true,
    levelLabel: function () { return 'A to Z, one at a time'; },
    makeRound: function (rng, level, i) {
      var l = ABC[i % 26];
      return { letter: l, durationMs: 20 * 60 * 1000, question: '', level: 1, answer: l, choices: [{ v: l, label: l }], explain: '' };
    },
    create: function (el, host) {
      K.ensureCss();
      var st = { spec: null, next: null };
      function say(items) { if (SP && SP.on(true)) SP.sayAll(items); }
      function tile(text, small, onTap, label) {
        var b = document.createElement('button');
        b.className = 'wk-btn'; b.type = 'button'; b.textContent = text; b.setAttribute('aria-label', label || text);
        b.style.cssText = 'font-size:' + (small ? '5.5rem' : '6.5rem') + ';line-height:1;padding:14px 26px;min-width:120px';
        b.onclick = onTap; return b;
      }
      function ready(spec) {
        st.spec = spec; el.innerHTML = '';
        var l = spec.letter, w = SP ? SP.wordOf(l) : '', em = SP ? SP.emojiOf(l) : '';
        var head = document.createElement('div'); head.className = 'wk-q'; head.textContent = 'Letter ' + (ABC.indexOf(l) + 1) + ' of 26';
        var pair = document.createElement('div'); pair.style.cssText = 'display:flex;gap:16px;justify-content:center;flex-wrap:wrap';
        pair.appendChild(tile(l.toUpperCase(), false, function () { say(['Capital', SP ? SP.nameItem(l) : l]); }, 'Capital ' + l));
        pair.appendChild(tile(l, false, function () { say(['Small', SP ? SP.nameItem(l) : l]); }, 'Small ' + l));
        var pic = document.createElement('button'); pic.className = 'wk-emoji'; pic.type = 'button'; pic.textContent = em;
        pic.style.cssText = 'background:none;border:0;cursor:pointer'; pic.onclick = function () { say([SP ? SP.wordItem(w) : w]); };
        var wordLbl = document.createElement('div'); wordLbl.className = 'wk-q';
        wordLbl.innerHTML = '<b>' + K.esc(l.toUpperCase()) + '</b> is for ' + K.esc(w);
        var row = document.createElement('div'); row.style.cssText = 'display:flex;gap:10px;justify-content:center;flex-wrap:wrap';
        function pill(t, fn) { var b = document.createElement('button'); b.className = 'wk-btn sm'; b.type = 'button'; b.textContent = t; b.style.padding = '10px 16px'; b.onclick = fn; return b; }
        row.appendChild(pill('🔊 Name', function () { say([SP ? SP.nameItem(l) : l]); }));
        row.appendChild(pill('🗣️ Sound', function () { say([SP ? SP.soundItem(l) : l]); }));
        row.appendChild(pill('🖼️ Word', function () { say([SP ? SP.wordItem(w) : w]); }));
        st.next = document.createElement('button'); st.next.className = 'wk-btn big'; st.next.type = 'button';
        st.next.textContent = ABC.indexOf(l) === 25 ? 'All done! ⭐' : 'Next letter ➜';
        st.next.style.padding = '12px 28px';
        st.next.onclick = function () { if (SP) SP.stop(); host.answer(true); };
        [head, pair, pic, wordLbl, row, st.next].forEach(function (n) { el.appendChild(n); });
        el.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:14px';
      }
      function go() { if (st.spec) say(tell(st.spec.letter)); }
      function reveal() { /* nothing to show: there is no wrong answer here */ }
      function destroy() { if (SP) SP.stop(); el.innerHTML = ''; }
      return { ready: ready, go: go, reveal: reveal, destroy: destroy };
    }
  });
})(typeof window !== 'undefined' ? window : globalThis);
