/*! Words Adventure game kit v0.1.0 (helper for wa-games.js)
 * Two ready-made game shapes, so most games are just a levels table and a makeSpec() function.
 *
 *   WAGames.kit.choiceGame({ id, name, emoji, blurb, grades, modes?, rounds?, prompt?,
 *     levels: [null, { label:'...', ms:12000, ... }, ...],          // index = level, entry 0 unused
 *     makeSpec: function (rng, cfg, level, roundIndex) {
 *       return { question:'...', visual:'<html>'?, choices:[strings|{v,label}], answer: v,
 *                explain:'shown after the round', big:true?, cols:n? }
 *     } });
 *
 *   WAGames.kit.buildGame({ ...same header..., prompt?,
 *     makeSpec: function (rng, cfg, level, roundIndex) {
 *       return { question:'...', visual:'<html>'?, pieces:['c','a','t' ...shuffled by you],
 *                target:['c','a','t'], join:'' | ' ', accept:['alt answer'...]?, explain:'...' }
 *     } });                                    // tap tiles in order, then Check
 *
 * Every device builds its round from the same seed + the player's own level, so all multiplayer modes
 * (teamwork, face-off, race) work with no extra code in the game.
 * Anything put into `visual` / `question` HTML must go through K.esc() unless it is your own markup.
 */
(function (root) {
  'use strict';
  var WAG = root.WAGames;
  if (!WAG) throw new Error('Load wa-games.js before wa-game-kit.js');

  var NAVY = '#1b2a49';
  var CSS = [
    '.wk-q{font-weight:900;font-size:1.3rem;text-align:center;min-height:1.6em;line-height:1.3}',
    '.wk-vis{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;align-items:center;min-height:80px;max-width:100%;text-align:center}',
    '.wk-bar{width:100%;max-width:440px;height:12px;border:3px solid ' + NAVY + ';border-radius:99px;background:#fff;overflow:hidden}',
    '.wk-bar i{display:block;height:100%;width:100%;background:#3ddc97}',
    '.wk-bar.low i{background:#ff6b6b}',
    '.wk-pad{display:grid;gap:10px;width:100%;max-width:440px}',
    '.wk-btn{font:inherit;font-weight:900;font-size:1.35rem;padding:12px 6px;border-radius:16px;border:3px solid ' + NAVY + ';background:#fff;color:' + NAVY + ';box-shadow:0 5px 0 ' + NAVY + ';cursor:pointer;touch-action:manipulation;min-width:0;overflow-wrap:anywhere;line-height:1.2}',
    '.wk-btn.big{font-size:1.9rem}',
    '.wk-btn.sm{font-size:1.05rem}',
    '.wk-btn:active:not(:disabled){transform:translateY(4px);box-shadow:0 1px 0 ' + NAVY + '}',
    '.wk-btn:disabled{opacity:.55;cursor:default}',
    '.wk-btn.pick{background:#ffd23f;opacity:1}.wk-btn.good{background:#3ddc97;opacity:1}.wk-btn.bad{background:#ff6b6b;opacity:1}',
    '.wk-cap{font-weight:800;text-align:center;min-height:1.4em}',
    '.wk-emoji{font-size:4rem;line-height:1.1;text-align:center}',
    '.wk-emoji.sm{font-size:2.6rem}',
    '.wk-big{font-size:3rem;font-weight:900;text-align:center;letter-spacing:.05em}',
    '.wk-word{font-size:2.2rem;font-weight:900;text-align:center;letter-spacing:.08em}',
    '.wk-sent{background:#fff;border:3px solid ' + NAVY + ';border-radius:16px;padding:10px 14px;font-weight:800;font-size:1.15rem;line-height:1.5;text-align:left;box-shadow:0 5px 0 ' + NAVY + ';max-width:100%}',
    '.wk-sent.serif{font-family:Georgia,"Times New Roman",serif;font-weight:600;font-size:1.1rem}',
    '.wk-hl{background:#ffd23f;border-radius:6px;padding:0 4px}',
    '.wk-gap{display:inline-block;min-width:3.2em;border-bottom:4px solid ' + NAVY + ';text-align:center}',
    '.wk-slots{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;align-items:center;min-height:62px;width:100%;max-width:440px;padding:8px;background:#fff;border:3px dashed ' + NAVY + ';border-radius:16px;box-sizing:border-box}',
    '.wk-slots.good{border-style:solid;background:#d9f9ea}.wk-slots.bad{border-style:solid;background:#ffe0e0}',
    '.wk-tiles{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;width:100%;max-width:440px;min-height:56px}',
    '.wk-tile{font:inherit;font-weight:900;font-size:1.5rem;min-width:46px;padding:8px 10px;border-radius:12px;border:3px solid ' + NAVY + ';background:#fff;color:' + NAVY + ';box-shadow:0 4px 0 ' + NAVY + ';cursor:pointer;touch-action:manipulation}',
    '.wk-tile.w{font-size:1.15rem;padding:8px 12px}',
    '.wk-tile.put{background:#ffd23f}',
    '.wk-tile:active:not(:disabled){transform:translateY(3px);box-shadow:0 1px 0 ' + NAVY + '}',
    '.wk-tile:disabled{opacity:.5;cursor:default}',
    '.wk-tile.used{visibility:hidden}',
    '.wk-check{width:100%;max-width:440px}'
  ].join('\n');

  function ensureCss() {
    if (document.getElementById('wk-css')) return;
    var s = document.createElement('style'); s.id = 'wk-css'; s.textContent = CSS; document.head.appendChild(s);
  }
  function div(cls, txt) { var d = document.createElement('div'); d.className = cls; if (txt != null) d.textContent = txt; return d; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  /* ---- shared picture helpers (return HTML strings; text is escaped) ---- */
  function emojiHtml(e, small) { return '<div class="wk-emoji' + (small ? ' sm' : '') + '">' + esc(e) + '</div>'; }
  function bigHtml(t) { return '<div class="wk-big">' + esc(t) + '</div>'; }
  function wordHtml(t) { return '<div class="wk-word">' + esc(t) + '</div>'; }
  // a sentence in a card; wrap `mark` (a substring) in a highlight; "__" becomes a blank line
  function sentHtml(text, mark, serif) {
    var out = esc(text);
    if (mark) { var m = esc(mark); out = out.replace(m, '<span class="wk-hl">' + m + '</span>'); }
    out = out.replace(/__+/g, '<span class="wk-gap">&nbsp;</span>');
    return '<div class="wk-sent' + (serif ? ' serif' : '') + '">' + out + '</div>';
  }

  /* ---- the generic multiple-choice game ---- */
  function normChoices(list) {
    return list.map(function (c) { return (c && typeof c === 'object') ? { v: c.v, label: c.label != null ? c.label : String(c.v) } : { v: c, label: String(c) }; });
  }

  function register(def, makeRound, create, maxLevel) {
    return WAG.register({
      id: def.id, name: def.name, emoji: def.emoji, blurb: def.blurb, grades: def.grades,
      modes: def.modes || ['solo', 'coop', 'versus', 'race'],
      rounds: def.rounds || 10, maxLevel: maxLevel,
      maxDurationMs: def.levels.reduce(function (m, c) { return c && c.ms > m ? c.ms : m; }, 12000),
      levelLabel: function (l) { return def.levels[clamp(l | 0 || 1, 1, maxLevel)].label; },
      makeRound: makeRound, create: create
    });
  }

  /* ---- no repeats inside one match ----
   * Rounds are generated one at a time from the match seed. If a round comes out identical to an earlier round of
   * the same match, it is re-drawn from a derived seed (still deterministic, so every device agrees). */
  var MEMO = {}, MEMO_KEYS = [];
  function sigOf(spec) {
    return [spec.question, spec.visual || '', spec.pieces ? spec.target.join(' ') : String(spec.answer)].join('|');
  }
  function unique(def, rng, level, i, once) {
    var key = def.id + '|' + String(rng.seed || '').split('|')[0], m = MEMO[key], j, t, spec, sig, prior;
    if (!m) { m = MEMO[key] = {}; MEMO_KEYS.push(key); if (MEMO_KEYS.length > 8) delete MEMO[MEMO_KEYS.shift()]; }
    if (m[i] && m[i].level === level) return m[i].spec;
    prior = [];
    for (j = 0; j < i; j++) if (m[j]) prior.push(m[j].sig);
    for (t = 0; t < 16; t++) {
      spec = once(t ? WAG.rng(rng.seed + '#' + t) : rng);
      sig = sigOf(spec);
      if (prior.indexOf(sig) < 0) break;
    }
    m[i] = { level: level, spec: spec, sig: sig };
    return spec;
  }

  function choiceGame(def) {
    var maxLevel = def.levels.length - 1;
    function lv(l) { return clamp(l | 0 || 1, 1, maxLevel); }

    function makeRound(rng, level, i) {
      var L = lv(level), cfg = def.levels[L];
      return unique(def, rng, L, i, function (r) {
        var s = def.makeSpec(r, cfg, L, i);
        s.choices = normChoices(s.choices);
        var hit = s.choices.some(function (c) { return String(c.v) === String(s.answer); });
        if (!hit) throw new Error(def.id + ' level ' + L + ': answer ' + s.answer + ' missing from choices');
        s.durationMs = s.durationMs || cfg.ms || 12000;
        s.level = L;
        return s;
      });
    }

    function create(el, host) {
      ensureCss();
      var st = { spec: null, live: false, startAt: 0, timer: null, btns: [], picked: null, bar: null, cap: null };
      function lock() { st.btns.forEach(function (b) { b.disabled = true; }); }

      function ready(spec) {
        clearInterval(st.timer); el.innerHTML = '';
        st.spec = spec; st.live = false; st.btns = []; st.picked = null;
        WAG._lastSpec = spec;
        var q = div('wk-q', spec.question);
        var vis = div('wk-vis'); if (spec.visual) vis.innerHTML = spec.visual;
        var bar = div('wk-bar'), fill = document.createElement('i'); bar.appendChild(fill); st.bar = bar; st.fill = fill;
        var pad = div('wk-pad');
        var longest = spec.choices.reduce(function (m, c) { return Math.max(m, c.label.length); }, 0);
        var cols = spec.cols || (longest > 11 ? 1 : longest > 6 ? 2 : Math.min(spec.choices.length, 4));
        pad.style.gridTemplateColumns = 'repeat(' + cols + ',1fr)';
        spec.choices.forEach(function (c) {
          var b = document.createElement('button');
          b.className = 'wk-btn' + (spec.big ? ' big' : (longest > 18 ? ' sm' : ''));
          b.textContent = c.label; b.disabled = true; b.setAttribute('data-v', String(c.v));
          b.addEventListener('click', function () {
            if (!st.live) return;
            st.picked = String(c.v); b.classList.add('pick'); lock(); host.answer(String(c.v) === String(spec.answer));
          });
          pad.appendChild(b); st.btns.push(b);
        });
        st.cap = div('wk-cap', 'Get ready…');
        el.appendChild(q); el.appendChild(vis); el.appendChild(bar); el.appendChild(pad); el.appendChild(st.cap);
      }

      function tick() {
        var sp = st.spec; if (!sp || !st.live) return;
        var left = clamp(1 - (host.now() - st.startAt) / sp.durationMs, 0, 1);
        st.fill.style.width = (left * 100) + '%';
        st.bar.className = 'wk-bar' + (left < 0.25 ? ' low' : '');
        if (left <= 0) { lock(); st.live = false; }
      }
      function go(startAt) {
        st.live = true; st.startAt = startAt;
        st.btns.forEach(function (b) { b.disabled = false; });
        st.cap.textContent = def.prompt || 'Tap the answer!';
        clearInterval(st.timer); st.timer = setInterval(tick, 80); tick();
      }
      function reveal() {
        clearInterval(st.timer); st.live = false; lock();
        var sp = st.spec; if (!sp) return;
        st.btns.forEach(function (b) {
          var v = b.getAttribute('data-v');
          if (v === String(sp.answer)) b.classList.add('good');
          else if (st.picked === v) b.classList.add('bad');
        });
        st.cap.textContent = sp.explain || '';
      }
      function destroy() { clearInterval(st.timer); el.innerHTML = ''; }
      return { ready: ready, go: go, reveal: reveal, destroy: destroy };
    }
    return register(def, makeRound, create, maxLevel);
  }

  /* ---- the tap-the-tiles-in-order game (spelling, sentence order) ---- */
  function buildGame(def) {
    var maxLevel = def.levels.length - 1;
    function lv(l) { return clamp(l | 0 || 1, 1, maxLevel); }

    function makeRound(rng, level, i) {
      var L = lv(level), cfg = def.levels[L];
      return unique(def, rng, L, i, function (r) {
        var s = def.makeSpec(r, cfg, L, i);
        // every target tile must be on the table (extra decoy tiles are allowed)
        var pool = s.pieces.slice(), ok = s.target.every(function (t) { var k = pool.indexOf(t); if (k < 0) return false; pool.splice(k, 1); return true; });
        if (!ok) throw new Error(def.id + ' level ' + L + ': target tiles missing from pieces (' + s.target.join(' ') + ' / ' + s.pieces.join(' ') + ')');
        s.join = s.join == null ? '' : s.join;
        s.durationMs = s.durationMs || cfg.ms || 25000;
        s.level = L;
        return s;
      });
    }

    function create(el, host) {
      ensureCss();
      var st = { spec: null, live: false, startAt: 0, timer: null, tiles: [], placed: [], slots: null, tray: null, bar: null, cap: null, check: null, done: false };

      function lock() { st.tiles.forEach(function (t) { t.disabled = true; }); if (st.check) st.check.disabled = true; }
      function current() { return st.placed.map(function (i) { return st.spec.pieces[i]; }); }
      function matches() {
        var sp = st.spec, got = current().join(sp.join);
        return got === sp.target.join(sp.join) || (sp.accept || []).indexOf(got) >= 0;
      }
      function paint() {
        var sp = st.spec;
        st.slots.innerHTML = '';
        st.placed.forEach(function (idx, pos) {
          var b = document.createElement('button');
          b.className = 'wk-tile put' + (sp.join === ' ' ? ' w' : ''); b.textContent = sp.pieces[idx];
          b.disabled = !st.live;
          b.addEventListener('click', function () { if (!st.live) return; st.placed.splice(pos, 1); paint(); });
          st.slots.appendChild(b);
        });
        if (!st.placed.length) { var h = div('wk-cap', st.live ? 'Tap the tiles in order' : ''); st.slots.appendChild(h); }
        st.tiles.forEach(function (t, idx) { t.classList.toggle('used', st.placed.indexOf(idx) >= 0); });
        if (st.check) st.check.disabled = !st.live || !st.placed.length;
      }

      function ready(spec) {
        clearInterval(st.timer); el.innerHTML = '';
        st.spec = spec; st.live = false; st.placed = []; st.tiles = []; st.done = false;
        WAG._lastSpec = spec;
        var q = div('wk-q', spec.question);
        var vis = div('wk-vis'); if (spec.visual) vis.innerHTML = spec.visual;
        var bar = div('wk-bar'), fill = document.createElement('i'); bar.appendChild(fill); st.bar = bar; st.fill = fill;
        st.slots = div('wk-slots');
        st.tray = div('wk-tiles');
        spec.pieces.forEach(function (p, idx) {
          var b = document.createElement('button');
          b.className = 'wk-tile' + (spec.join === ' ' ? ' w' : ''); b.textContent = p; b.disabled = true;
          b.addEventListener('click', function () {
            if (!st.live || st.placed.indexOf(idx) >= 0) return;
            st.placed.push(idx); paint();
          });
          st.tray.appendChild(b); st.tiles.push(b);
        });
        st.check = document.createElement('button'); st.check.className = 'wk-btn wk-check'; st.check.textContent = 'Check ✔'; st.check.disabled = true;
        st.check.addEventListener('click', function () {
          if (!st.live || st.done) return;
          st.done = true; var ok = matches();
          lock(); st.slots.classList.add(ok ? 'good' : 'bad'); host.answer(ok);
        });
        st.cap = div('wk-cap', 'Get ready…');
        el.appendChild(q); el.appendChild(vis); el.appendChild(bar); el.appendChild(st.slots); el.appendChild(st.tray); el.appendChild(st.check); el.appendChild(st.cap);
        paint();
      }

      function tick() {
        var sp = st.spec; if (!sp || !st.live) return;
        var left = clamp(1 - (host.now() - st.startAt) / sp.durationMs, 0, 1);
        st.fill.style.width = (left * 100) + '%';
        st.bar.className = 'wk-bar' + (left < 0.25 ? ' low' : '');
        if (left <= 0) { st.live = false; lock(); }
      }
      function go(startAt) {
        st.live = true; st.startAt = startAt;
        st.tiles.forEach(function (b) { b.disabled = false; });
        st.cap.textContent = def.prompt || 'Tap the tiles in order, then Check!';
        paint();
        clearInterval(st.timer); st.timer = setInterval(tick, 80); tick();
      }
      function reveal() {
        clearInterval(st.timer); st.live = false; lock();
        var sp = st.spec; if (!sp) return;
        if (!st.done || !matches()) {
          st.slots.classList.remove('good'); st.slots.classList.add(matches() ? 'good' : 'bad');
          if (!matches()) {
            st.slots.innerHTML = '';
            sp.target.forEach(function (t) { var b = document.createElement('button'); b.className = 'wk-tile put' + (sp.join === ' ' ? ' w' : ''); b.textContent = t; b.disabled = true; st.slots.appendChild(b); });
          }
        }
        st.cap.textContent = sp.explain || '';
      }
      function destroy() { clearInterval(st.timer); el.innerHTML = ''; }
      return { ready: ready, go: go, reveal: reveal, destroy: destroy };
    }
    return register(def, makeRound, create, maxLevel);
  }

  // shuffle that never hands back the answer order (when there is more than one distinct tile)
  function scramble(rng, arr) {
    var out = rng.shuffle(arr), tries = 0;
    while (tries++ < 30 && arr.length > 1 && out.join('\u0001') === arr.join('\u0001')) out = rng.shuffle(arr);
    return out;
  }

  WAG.kit = { scramble: scramble, choiceGame: choiceGame, buildGame: buildGame, esc: esc, emojiHtml: emojiHtml, bigHtml: bigHtml, wordHtml: wordHtml, sentHtml: sentHtml, clamp: clamp };
})(typeof window !== 'undefined' ? window : globalThis);
