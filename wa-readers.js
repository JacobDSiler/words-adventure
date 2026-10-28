/*! Words Adventure "Read" tab: WAReaders (needs wa-stories.js; uses wa-speech.js when present)
 * Reading as play: tap any word to hear it, tap the animals for a silly line, tap wiggly words to swap in a silly word,
 * answer "what do you think?" questions (no wrong answers), then a hear-and-find word hunt and "talk about it" cards.
 * API: WAReaders.open(profileOrNull)   WAReaders.close()
 */
(function (root) {
  'use strict';
  var ST = root.WA_STORIES, SP = root.WASpeech, doc = root.document;
  if (!ST || !doc) return;
  var LSK = 'wa_readers_v1', MYK = 'wa_readers_mine_v1';

  /* ---------- tiny helpers ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function lsGet(k, d) { try { var v = root.localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function lsSet(k, v) { try { root.localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
  function canSpeak() { return !!(SP && SP.can); }
  function say(text, opts) { if (!canSpeak()) return Promise.resolve(); try { return SP.sayAll(chunks(text), opts || {}); } catch (e) { return Promise.resolve(); } }
  function stopSay() { try { if (SP) SP.stop(); } catch (e) { } }
  function chunks(t) { var m = String(t).replace(/\s+/g, ' ').trim().match(/[^.!?…]+[.!?…]+["”']*\s*|[^.!?…]+$/g); return m ? m.map(function (x) { return x.trim(); }).filter(Boolean) : [String(t)]; }
  function cleanWord(w) { return String(w).replace(/^[^A-Za-z0-9']+|[^A-Za-z0-9']+$/g, ''); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* ---------- silly lines when you tap the pictures ---------- */
  var QUIPS = {
    '🦔': ['Prickle, prickle! Please do not hug me too hard!', 'I am a hedgehog. I am NOT a tiny cactus. Well, maybe a bit.', 'Sniff sniff. I can smell... a snack!', 'I curled into a ball. Now I am a prickly football. Please do not kick me!'],
    '🐿️': ['Zoom zoom! My tail is a fluffy rocket!', 'I buried a nut. Where? Oh no. Ask me tomorrow.', 'Squeak! I did a flip! Did you see it? Did you? DID YOU?', 'My tail is so fluffy it could be a hat. Want to wear it?'],
    '🦡': ['Grrrr... that was my tummy, not me.', 'I am not grumpy. I am just a bit crunchy on the outside.', 'Hmmph. Is it breakfast yet? Is it lunch yet? Is it supper yet?', 'Badgers do not snore. That was the wind. The wind snores. Hmmph!'],
    '🐦': ['Tweet! That was my quiet voice. Ready for my loud one? TWEEEEET!', 'I am the smallest bird with the biggest song!', 'Tweedle-dee-dee! I made that up just now.', 'Cheep cheep! Would you like a spider? No? More for me!'],
    '🦊': ['Shhh... I am being sneaky. Is it working?', 'My tail is called a brush, just like a paintbrush!', 'Yip yip! Oh. Did I say that out loud?', 'I am shy, but I am brave, and I am a tiny bit hungry.'],
    '🌰': ['PLOP! That was me, the acorn!', 'Plant me and I will grow into a giant oak tree one day. Wow!', 'Do not eat me yet. I am busy being brave.'],
    '🍂': ['Crunch, crunch, crunch! Step on me. I am very crunchy!', 'Whoosh! The wind is playing with us!', 'We are red and gold and brown. We are the fanciest leaves in the wood.'],
    '🌲': ['Creak, creak! I am a tree. I have been standing here a very long time.', 'Shh. I am listening to the wood.', 'Want a hug? I have lots of branches.'],
    '🌫️': ['Whooooosh... I am the fog. Boo! Did I scare you? No? Hmm.', 'I am a cloud that came down for a walk.'],
    '🍯': ['Sticky, sticky, yum, yum!', 'Bzzz! Who took my honey?'],
    '🍓': ['Squish! Squelch! Yum!', 'We are the sweetest berries in the whole wood.'],
    '🍞': ['Mmm! Nut bread! Crunchy and soft at the same time.'],
    '🕯️': ['Glow, glow, glow! I am a moss lantern.', 'Green light, soft light, bedtime light.'],
    '⭐': ['Twinkle, twinkle! I am very far away.', 'I am a star. I do not do much. I just sparkle.'],
    '🌟': ['Ta-da! I am a very important star.'],
    '🌙': ['Goodnight, wood! Sleep tight.', 'I am the moon. Bramble tells stories about me.'],
    '🌊': ['Splish, splash! I am a very noisy brook today!', 'Glug, glug! Do not fall in!'],
    '🌉': ['Creak! I hold on tight so you do not get wet.', 'Thump! I used to be a birch tree. Now I am a bridge!'],
    '🕳️': ['Hello? Is anyone in there? ...there... there...', 'Echo, echo, echo!'],
    '🪵': ['I am a log. I am wet. I am not cosy.', 'Knock, knock! Who is there? A log. Log who? A log-ical question!'],
    '🏔️': ['I am a hill. I like to be climbed. Huff, puff!'],
    '🌧️': ['Drip, drop, drip, drop! Sorry about your roof.'],
    '🌿': ['Swish, swish! I am a fern. I tickle noses.'],
    '🕷️': ['Eek! Wait, I am the spider. Do not eat me!'],
    '🦉': ['Hoo! Hoo! Hoo knows? I do not.'],
    '🎵': ['La la la! Do re mi!', 'Tra la la! Sing along!'],
    '👃': ['Sniff, sniff, snort! I smell something good.']
  };
  var qIdx = {};
  function nextQuip(e, story) { var a = (story && story.q && story.q[e]) || QUIPS[e] || (story && story.q && story.q.any) || ['Hello from Hollybrook Wood!']; qIdx[e] = ((qIdx[e] == null ? Math.floor(Math.random() * a.length) : qIdx[e] + 1)) % a.length; return a[qIdx[e]]; }

  /* ---------- shelves (reading levels) ---------- */
  var SHELVES = [
    { id: 'K', label: 'Little readers', sub: 'Nursery to Kindergarten', emoji: '🌱' },
    { id: '12', label: 'First readers', sub: '1st and 2nd class (Grades 1 to 2)', emoji: '🦔' },
    { id: '34', label: 'Action and giggles', sub: '3rd and 4th class (Grades 3 to 4)', emoji: '⚡' },
    { id: '56', label: 'Mysteries and schemes', sub: '5th and 6th class (Grades 5 to 6)', emoji: '🕵️' },
    { id: '78', label: 'Plots and plans', sub: 'Grades 7 to 8', emoji: '🧭' },
    { id: '912', label: 'Thought-stirrers', sub: 'Grades 9 to 12', emoji: '🌧️' },
    { id: 'beyond', label: 'Beyond school', sub: 'Stories for grown-ups, or anyone', emoji: '☕' }
  ];
  function shelfOf(s) { return s.shelf || '12'; }
  function gradeNum(id) { id = String(id); return id === 'PS' ? -2 : id === 'PK' ? -1 : id === 'K' ? 0 : id === 'AD' ? 13 : (parseInt(id, 10) || 0); }
  function myShelf() {
    if (!st.prof || st.prof.gradeId == null) return null;
    var g = gradeNum(st.prof.gradeId);
    return g <= 0 ? 'K' : g <= 2 ? '12' : g <= 4 ? '34' : g <= 6 ? '56' : g <= 8 ? '78' : g <= 12 ? '912' : 'beyond';
  }
  function inShelf(id) { return ST.all.filter(function (s) { return shelfOf(s) === id; }); }

  /* ---------- progress ---------- */
  function pid() { return st.prof ? String(st.prof.id) : 'guest'; }
  function getProg() { var all = lsGet(LSK, {}); return all[pid()] || {}; }
  function setProg(id, v) { var all = lsGet(LSK, {}); var p = all[pid()] || {}; p[id] = v; all[pid()] = p; lsSet(LSK, all); }
  function nextUp(shelf) { var p = getProg(), l = inShelf(shelf); for (var i = 0; i < l.length; i++) if (!(p[l[i].id] && p[l[i].id].done)) return l[i].id; return null; }

  /* ---------- styles ---------- */
  var CSS = '' +
    '.war-ov{position:fixed;inset:0;z-index:9500;overflow-y:auto;-webkit-overflow-scrolling:touch;font-family:Nunito,system-ui,sans-serif;color:#1A2E4A}' +
    '.war-wrap{max-width:720px;margin:0 auto;padding:12px 16px 110px;min-height:100%}' +
    '.war-top{display:flex;align-items:center;gap:10px;margin-bottom:8px}' +
    '.war-back{background:rgba(255,255,255,.75);border:0;border-radius:14px;padding:8px 14px;font:800 1rem Nunito,sans-serif;color:#1A2E4A;cursor:pointer}' +
    '.war-h{font-family:"Baloo 2",cursive;font-weight:800;font-size:clamp(1.3rem,5vw,1.8rem);line-height:1.15;margin:4px 0}' +
    '.war-sub{opacity:.8;font-weight:700;font-size:.95rem;margin-bottom:12px}' +
    '.war-chips{display:flex;gap:8px;flex-wrap:wrap;margin:6px 0 14px}' +
    '.war-chip{background:#fff;border:2px solid rgba(26,46,74,.12);border-radius:16px;padding:6px 12px;font:800 .92rem Nunito,sans-serif;cursor:pointer;display:flex;align-items:center;gap:6px}' +
    '.war-chip:active{transform:scale(.94)}.war-chip .e{font-size:1.6rem}' +
    '.war-shelf-h{font-family:"Baloo 2",cursive;font-weight:800;font-size:1.3rem;margin:8px 0 2px}.war-shelf{background:rgba(255,255,255,.55);border-radius:18px;padding:8px 12px;margin:0 0 10px}.war-shelf summary{font:800 1.05rem Nunito,sans-serif;cursor:pointer;padding:6px 0}.war-shelf summary small{font-weight:700;opacity:.7;font-size:.8rem;display:block}.war-shelf[open] summary{margin-bottom:8px}' +
    '.war-card{display:flex;gap:14px;align-items:center;width:100%;text-align:left;background:#fff;border:0;border-radius:22px;padding:14px;margin:0 0 12px;box-shadow:0 4px 14px rgba(26,46,74,.12);cursor:pointer;font-family:inherit;color:inherit;position:relative}' +
    '.war-card:active{transform:scale(.985)}' +
    '.war-card .big{font-size:2.6rem;line-height:1;min-width:64px;height:64px;border-radius:18px;display:flex;align-items:center;justify-content:center}' +
    '.war-card b{display:block;font-family:"Baloo 2",cursive;font-size:1.15rem;line-height:1.2}' +
    '.war-card small{display:block;opacity:.75;font-weight:700;font-size:.82rem;margin-top:2px}' +
    '.war-badge{position:absolute;top:-8px;right:12px;background:#FFD166;color:#1A2E4A;border-radius:12px;padding:3px 10px;font:800 .78rem Nunito,sans-serif;box-shadow:0 2px 6px rgba(0,0,0,.15)}' +
    '.war-badge.done{background:#06D6A0}' +
    '.war-bar{height:10px;background:rgba(255,255,255,.7);border-radius:6px;overflow:hidden;flex:1}' +
    '.war-bar i{display:block;height:100%;background:#2D6BE4;border-radius:6px;transition:width .3s}' +
    '.war-tiles{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin:10px 0 6px}' +
    '.war-tile{font-size:3.6rem;line-height:1;background:rgba(255,255,255,.65);border:3px solid rgba(255,255,255,.9);border-radius:24px;padding:10px 14px;cursor:pointer;box-shadow:0 4px 10px rgba(0,0,0,.08)}' +
    '.war-tile.hop{animation:warhop .6s}' +
    '@keyframes warhop{0%{transform:scale(1)}25%{transform:translateY(-16px) rotate(-8deg) scale(1.15)}50%{transform:translateY(0) rotate(7deg)}75%{transform:translateY(-6px) rotate(-3deg)}100%{transform:none}}' +
    '.war-bub{min-height:3.2rem;margin:4px auto 10px;max-width:560px;text-align:center;font-weight:800;font-size:1.05rem;background:#fff;border-radius:18px;padding:10px 14px;box-shadow:0 3px 8px rgba(0,0,0,.08);position:relative}' +
    '.war-bub.hint{background:rgba(255,255,255,.55);font-weight:700;opacity:.85}' +
    '.war-chap{font-family:"Baloo 2",cursive;font-weight:800;font-size:1.25rem;text-align:center;margin:6px 0}' +
    '.war-text{background:#fff;border-radius:24px;padding:18px 18px 14px;box-shadow:0 5px 16px rgba(26,46,74,.14);font-size:clamp(1.3rem,4.6vw,1.65rem);line-height:1.75;font-weight:600}' +
    '.war-text p{margin:0 0 .65em;padding:2px 6px;border-radius:12px;transition:background .2s}' +
    '.war-text p.hl{background:#fff3b8}' +
    '.war-text .w{cursor:pointer;border-radius:8px;padding:0 1px}' +
    '.war-text .w:active{background:#cfe3ff}' +
    '.war-text .spot{background:#ffe9a0;box-shadow:0 2px 0 #f2c94c}' +
    '.war-text .sw{cursor:pointer;color:#7C3AED;font-weight:800;border-bottom:3px wavy #b794f4;text-decoration:underline wavy #b794f4;text-underline-offset:5px;text-decoration-thickness:2px;border-bottom:0;animation:warwig 2.4s infinite;display:inline-block}' +
    '.war-text .sw.pop{animation:warpop .5s}' +
    '@keyframes warwig{0%,80%,100%{transform:none}86%{transform:rotate(-4deg)}92%{transform:rotate(4deg)}}' +
    '@keyframes warpop{0%{transform:scale(.6)}60%{transform:scale(1.3)}100%{transform:scale(1)}}' +
    '.war-text em{font-style:italic;color:#4a3f8f}' +
    '.war-ask{margin-top:14px;background:linear-gradient(135deg,#eaf3ff,#f4eaff);border-radius:22px;padding:14px}' +
    '.war-ask h4{font-family:"Baloo 2",cursive;font-size:1.1rem;margin:0 0 8px}' +
    '.war-opts{display:flex;gap:8px;flex-wrap:wrap}' +
    '.war-opt{flex:1 1 140px;background:#fff;border:3px solid #d7defa;border-radius:16px;padding:10px 8px;font:800 1rem Nunito,sans-serif;color:#1A2E4A;cursor:pointer}' +
    '.war-opt .e{display:block;font-size:2rem}' +
    '.war-opt.on{border-color:#2D6BE4;background:#e3edff}' +
    '.war-reply{margin-top:10px;font-weight:800;background:#fff;border-radius:14px;padding:10px 12px}' +
    '.war-nav{position:fixed;left:0;right:0;bottom:0;padding:10px 12px calc(10px + env(safe-area-inset-bottom));background:rgba(255,255,255,.92);box-shadow:0 -4px 16px rgba(0,0,0,.1);display:flex;gap:8px;justify-content:center;align-items:center;z-index:2}' +
    '.war-btn{border:0;border-radius:16px;padding:12px 16px;font:800 1.05rem Nunito,sans-serif;cursor:pointer;background:#e8edf7;color:#1A2E4A;min-height:48px}' +
    '.war-btn.go{background:#2D6BE4;color:#fff}.war-btn.fun{background:#FF6B6B;color:#fff}.war-btn.ok{background:#06D6A0;color:#fff}' +
    '.war-btn:disabled{opacity:.4}.war-btn:active{transform:scale(.95)}' +
    '.war-note{font-size:.85rem;font-weight:700;opacity:.8;text-align:center;margin:8px 0}' +
    '.war-grown{background:rgba(255,255,255,.7);border-radius:16px;padding:10px 14px;margin-top:10px;font-weight:600;font-size:.92rem;line-height:1.5}.war-grown summary{font-weight:800;cursor:pointer}' +
    '.war-hunt{font-size:3rem;text-align:center;margin:14px 0}' +
    '.war-hunt .say{font-size:1.2rem;font-weight:800}' +
    '.war-word{font-family:"Baloo 2",cursive;font-size:1.8rem;font-weight:800;padding:16px 10px;flex:1 1 30%}' +
    '.war-word.bad{animation:warshake .4s;background:#ffd5d5}.war-word.good{background:#c9f5e5;border-color:#06D6A0}' +
    '@keyframes warshake{0%,100%{transform:none}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}' +
    '.war-talk{background:#fff;border-radius:20px;padding:16px;margin:0 0 10px;font-size:1.2rem;font-weight:700;line-height:1.5;cursor:pointer;border:3px solid transparent;display:flex;gap:10px;align-items:flex-start;width:100%;text-align:left;font-family:inherit;color:inherit}' +
    '.war-talk.done{border-color:#06D6A0;background:#eafcf4}' +
    '.war-stars{font-size:3rem;text-align:center;letter-spacing:6px;margin:6px 0}' +
    '.war-mine{width:100%;min-height:150px;border-radius:18px;border:3px solid #d7defa;padding:12px;font:600 1.15rem/1.5 Nunito,sans-serif;resize:vertical;margin-top:10px}' +
    '.war-conf{position:fixed;inset:0;pointer-events:none;z-index:9700;overflow:hidden}' +
    '.war-conf span{position:absolute;top:-40px;font-size:2rem;animation:warfall 2.4s linear forwards}' +
    '@keyframes warfall{to{transform:translateY(110vh) rotate(360deg);opacity:.9}}';

  /* ---------- state + shell ---------- */
  var st = { prof: null, ov: null, story: null, pi: 0, tok: 0, slow: false, asked: {}, sw: {}, hunt: null, talked: {}, reading: false, stars: { read: 0, hunt: 0, talk: 0 } };

  function ensureCss() { if (doc.getElementById('war-css')) return; var s = doc.createElement('style'); s.id = 'war-css'; s.textContent = CSS; doc.head.appendChild(s); }
  function open(prof) {
    ensureCss(); close(true);
    st.prof = prof || null;
    st.ov = doc.createElement('div'); st.ov.className = 'war-ov'; st.ov.setAttribute('role', 'dialog'); st.ov.setAttribute('aria-label', 'Read');
    doc.body.appendChild(st.ov);
    doc.body.style.overflow = 'hidden';
    library();
  }
  function close(quiet) {
    st.tok++; stopSay();
    if (st.ov && st.ov.parentNode) st.ov.parentNode.removeChild(st.ov);
    st.ov = null; if (!quiet) doc.body.style.overflow = '';
    var c = doc.querySelector('.war-conf'); if (c) c.remove();
  }
  function paint(bg, html) { st.ov.style.background = bg; st.ov.innerHTML = '<div class="war-wrap">' + html + '</div>'; st.ov.scrollTop = 0; }
  function on(sel, evt, fn) { var els = st.ov.querySelectorAll(sel); for (var i = 0; i < els.length; i++) els[i].addEventListener(evt, fn); }
  function confetti(list) {
    var old = doc.querySelector('.war-conf'); if (old) old.remove();
    var c = doc.createElement('div'); c.className = 'war-conf'; list = list || ['🎉', '⭐', '🍂', '🌰', '✨'];
    for (var i = 0; i < 26; i++) { var s = doc.createElement('span'); s.textContent = pick(list); s.style.left = Math.random() * 100 + '%'; s.style.animationDelay = Math.random() * 0.8 + 's'; c.appendChild(s); }
    doc.body.appendChild(c); setTimeout(function () { if (c.parentNode) c.remove(); }, 3600);
  }

  /* ---------- library ---------- */
  function cardHtml(s, prog, up) {
    var p = prog[s.id] || {}, badge = p.done ? '<span class="war-badge done">' + '⭐'.repeat(Math.max(1, p.stars || 1)) + ' Read!</span>' : (s.id === up ? '<span class="war-badge">Read me next!</span>' : '');
    return '<button class="war-card" data-s="' + s.id + '">' + badge + '<span class="big" style="background:' + s.sky[1] + '">' + s.emoji + '</span><span><b>' + esc(s.title) + '</b><small>' + esc(s.blurb) + '</small><small>' + (s.ages ? esc(s.ages) + ' · ' : '') + esc(s.length) + '</small></span></button>';
  }
  function library() {
    st.tok++; stopSay();
    var prog = getProg(), done = 0, mine = myShelf();
    ST.all.forEach(function (s) { if (prog[s.id] && prog[s.id].done) done++; });
    var chips = ['🦔', '🐿️', '🦡', '🐦', '🦊'].map(function (e, i) { return '<button class="war-chip" data-q="' + e + '"><span class="e">' + e + '</span>' + ['Pip', 'Rusty', 'Bramble', 'Willow', 'Fern'][i] + '</button>'; }).join('');
    var chipBox = '<div class="war-sub" style="margin-bottom:2px">Tap an animal to say hello:</div><div class="war-chips">' + chips + '</div><div class="war-bub hint" id="war-lb">Tap me! Tap words! Tap wiggly words!</div>';
    function shelfBody(sh) { return (sh.id === '12' ? chipBox : '') + inShelf(sh.id).map(function (s) { return cardHtml(s, prog, nextUp(sh.id)); }).join(''); }
    var top = '', rest = '';
    SHELVES.forEach(function (sh) {
      if (!inShelf(sh.id).length) return;
      if (sh.id === mine) top = '<div class="war-shelf-h">⭐ Just right for you: ' + sh.emoji + ' ' + esc(sh.label) + '</div><div class="war-sub">' + esc(sh.sub) + '</div>' + shelfBody(sh);
      else rest += '<details class="war-shelf"' + (!mine && sh.id === 'K' ? ' open' : '') + '><summary>' + sh.emoji + ' ' + esc(sh.label) + ' <small>' + esc(sh.sub) + '</small></summary>' + shelfBody(sh) + '</details>';
    });
    paint('linear-gradient(180deg,#fff7e6,#ffe7c2)',
      '<div class="war-top"><button class="war-back" data-act="close">← Back</button></div>' +
      '<div class="war-h">📖 Read</div>' +
      '<div class="war-sub">Stories to play with: tap words, tap pictures, tap wiggly words. ' + done + ' of ' + ST.all.length + ' read.</div>' +
      top + (top && rest ? '<div class="war-shelf-h" style="margin-top:18px">More shelves</div>' : '') + rest +
      '<details class="war-grown"><summary>For grown-ups</summary>Let the child read the story aloud to you, to a sister or to a cuddly toy. Read the yellow "words to spot" together first. If she gets stuck, give her the word and keep going so the story keeps its flow. Tap any word to hear it. The "Read to me" button reads a page aloud, and the turtle slows it down. The pictures and wiggly words are there to make reading feel like play. The "what do you think?" questions have mostly no wrong answers, and "Talk about it" at the end is a chat, not a test. A favourite read twice builds the most confidence. The shelves go up from first readers to stories for grown-ups, so a child can always try the next shelf when she is ready.' + (canSpeak() ? '' : '<br><br><b>Note:</b> this device has no read-aloud voice, so the sound buttons will stay quiet.') + '</details>');
    on('[data-act=close]', 'click', function () { close(); });
    on('[data-s]', 'click', function () { startStory(this.getAttribute('data-s')); });
    on('[data-q]', 'click', function () { var e = this.getAttribute('data-q'), q = nextQuip(e, null), b = st.ov.querySelector('#war-lb'); b.classList.remove('hint'); b.textContent = e + ' ' + q; say(q); });
  }

  /* ---------- reader ---------- */
  function startStory(id) {
    st.story = ST.byId(id); st.pi = 0; st.asked = {}; st.sw = {}; st.hunt = null; st.talked = {}; st.stars = { read: 0, hunt: 0, talk: 0 };
    page();
  }
  function renderTokens(text, spotSet, pageSw) {
    var swCount = 0, html = '';
    var paras = text.split('\n');
    paras.forEach(function (para) {
      var out = '', re = /\{\{([^}]+)\}\}|\*([^*]+)\*|(\s+)|([^\s{*]+)/g, m;
      function words(str) {
        var o = '', r2 = /(\s+)|(\S+)/g, mm;
        while ((mm = r2.exec(str))) {
          if (mm[1]) { o += mm[1]; continue; }
          var cw = cleanWord(mm[2]).toLowerCase();
          o += '<span class="w' + (cw && spotSet[cw] ? ' spot' : '') + '" data-w="' + esc(cleanWord(mm[2])) + '">' + esc(mm[2]) + '</span>';
        }
        return o;
      }
      while ((m = re.exec(para))) {
        if (m[1]) { var alts = m[1].split('|'), k = swCount++, cur = pageSw[k] || 0; out += '<span class="sw" role="button" tabindex="0" data-k="' + k + '" data-alts="' + esc(alts.join('|')) + '">' + esc(alts[cur]) + '</span>'; }
        else if (m[2]) out += '<em>' + words(m[2]) + '</em>';
        else if (m[3]) out += m[3];
        else out += words(m[4]);
      }
      html += '<p>' + out + '</p>';
    });
    return { html: html, silly: swCount };
  }
  function page() {
    var s = st.story, p = s.pages[st.pi], last = st.pi === s.pages.length - 1;
    st.tok++; stopSay(); st.reading = false;
    var spot = {}; s.words.forEach(function (w) { spot[w.toLowerCase()] = 1; });
    var pageSw = st.sw[st.pi] || (st.sw[st.pi] = {});
    var r = renderTokens(p.t, spot, pageSw);
    var tiles = p.e.map(function (e) { return '<button class="war-tile" data-e="' + e + '" aria-label="Tap me">' + e + '</button>'; }).join('');
    var ask = '';
    if (p.ask) {
      var a = st.asked[st.pi];
      ask = '<div class="war-ask"><h4>💭 ' + esc(p.ask.q) + '</h4><div class="war-opts">' + p.ask.o.map(function (o, i) { return '<button class="war-opt' + (a === i ? ' on' : '') + '" data-o="' + i + '"><span class="e">' + o[0] + '</span>' + esc(o[1]) + '</button>'; }).join('') + '</div><div class="war-reply" id="war-rep"' + (a == null ? ' style="display:none"' : '') + '>' + (a != null ? esc(p.ask.o[a][2]) : '') + '</div></div>';
    }
    var mine = '';
    if (p.your) { var m = lsGet(MYK, {}); mine = '<textarea class="war-mine" id="war-mine" placeholder="Write your story here...">' + esc((m[pid()] || {}).text || '') + '</textarea><div class="war-opts" style="margin-top:8px">' + ['Once upon a time, a new animal came to Hollybrook Wood. It was a ', 'One night at the old stump, something very silly happened. ', 'My story is about '].map(function (t, i) { return '<button class="war-opt" data-st="' + i + '">' + ['🐾 A new friend', '😂 Something silly', '✏️ My own idea'][i] + '</button>'; }).join('') + '</div><div class="war-note">Your story saves on this device. You can draw it too!</div>'; }
    var pct = Math.round(((st.pi + 1) / s.pages.length) * 100);
    paint('linear-gradient(180deg,' + s.sky[0] + ',' + s.sky[1] + ')',
      '<div class="war-top"><button class="war-back" data-act="lib">← Stories</button><div class="war-bar" aria-label="Page ' + (st.pi + 1) + ' of ' + s.pages.length + '"><i style="width:' + pct + '%"></i></div></div>' +
      (st.pi === 0 ? '<div class="war-h" style="text-align:center">' + s.emoji + ' ' + esc(s.title) + '</div><div class="war-note">Yellow words are words to spot first.</div>' : '') +
      (p.ch ? '<div class="war-chap">' + esc(p.ch) + '</div>' : '') +
      '<div class="war-tiles">' + tiles + '</div><div class="war-bub hint" id="war-bub">' + (r.silly ? 'Tap the wiggly purple word to make it silly!' : 'Tap me! Tap any word to hear it.') + '</div>' +
      '<div class="war-text" id="war-text">' + r.html + '</div>' + ask + mine +
      '<div class="war-nav">' +
      '<button class="war-btn" data-act="prev"' + (st.pi === 0 ? ' disabled' : '') + ' aria-label="Back one page">◀</button>' +
      (canSpeak() ? '<button class="war-btn fun" data-act="read" id="war-read">🔊 Read to me</button><button class="war-btn" data-act="slow" aria-pressed="' + st.slow + '" title="Slower voice">' + (st.slow ? '🐢' : '🐇') + '</button>' : '') +
      '<button class="war-btn ' + (last ? 'ok' : 'go') + '" data-act="next">' + (last ? 'The end ⭐' : 'Next ▶') + '</button></div>');
    on('[data-act=lib]', 'click', library);
    on('[data-act=prev]', 'click', function () { if (st.pi > 0) { st.pi--; page(); } });
    on('[data-act=next]', 'click', function () { if (last) endStory(); else { st.pi++; page(); } });
    on('[data-act=slow]', 'click', function () { st.slow = !st.slow; this.textContent = st.slow ? '🐢' : '🐇'; this.setAttribute('aria-pressed', st.slow); });
    on('[data-act=read]', 'click', toggleRead);
    on('.war-tile', 'click', function () {
      var e = this.getAttribute('data-e'), q = nextQuip(e, s), b = st.ov.querySelector('#war-bub');
      this.classList.remove('hop'); void this.offsetWidth; this.classList.add('hop');
      b.classList.remove('hint'); b.textContent = q; say(q);
    });
    var tx = st.ov.querySelector('#war-text');
    tx.addEventListener('click', function (ev) {
      var sw = ev.target.closest && ev.target.closest('.sw');
      if (sw) { var alts = sw.getAttribute('data-alts').split('|'), k = +sw.getAttribute('data-k'), c = ((pageSw[k] || 0) + 1) % alts.length; pageSw[k] = c; sw.textContent = alts[c]; sw.classList.remove('pop'); void sw.offsetWidth; sw.classList.add('pop'); say(alts[c]); if (c) { var b = st.ov.querySelector('#war-bub'); b.classList.remove('hint'); b.textContent = 'Ha ha! "' + alts[c] + '"! Read the sentence again. Is it silly now?'; } return; }
      var w = ev.target.closest && ev.target.closest('.w');
      if (w) { var t = w.getAttribute('data-w'); if (t) say(t, { rate: st.slow ? 0.6 : 0.78 }); }
    });
    on('.war-opt[data-o]', 'click', function () {
      var i = +this.getAttribute('data-o'); st.asked[st.pi] = i;
      var all = st.ov.querySelectorAll('.war-opt[data-o]'); for (var j = 0; j < all.length; j++) all[j].classList.toggle('on', j === i);
      var rep = st.ov.querySelector('#war-rep'); rep.style.display = ''; rep.textContent = p.ask.o[i][2]; say(p.ask.o[i][2]);
    });
    var ta = st.ov.querySelector('#war-mine');
    if (ta) {
      ta.addEventListener('input', function () { var m = lsGet(MYK, {}); m[pid()] = { text: ta.value, t: Date.now() }; lsSet(MYK, m); });
      on('[data-st]', 'click', function () { var starters = ['Once upon a time, a new animal came to Hollybrook Wood. It was a ', 'One night at the old stump, something very silly happened. ', 'My story is about ']; ta.value = (ta.value ? ta.value + '\n' : '') + starters[+this.getAttribute('data-st')]; ta.focus(); ta.dispatchEvent(new Event('input')); });
    }
  }
  function toggleRead() {
    var btn = st.ov.querySelector('#war-read');
    if (st.reading) { st.tok++; stopSay(); st.reading = false; clearHl(); if (btn) btn.textContent = '🔊 Read to me'; return; }
    var my = ++st.tok, paras = st.ov.querySelectorAll('#war-text p'), i = 0;
    st.reading = true; if (btn) btn.textContent = '⏹ Stop';
    (function nextPara() {
      if (my !== st.tok) return;
      clearHl();
      if (i >= paras.length) { st.reading = false; if (btn) btn.textContent = '🔊 Read to me'; return; }
      var el = paras[i++]; el.classList.add('hl');
      SP.sayAll(chunks(el.textContent), { rate: st.slow ? 0.6 : 0.8, gap: 120 }).then(function () { if (my === st.tok) setTimeout(nextPara, 180); });
    })();
  }
  function clearHl() { if (!st.ov) return; var h = st.ov.querySelectorAll('#war-text p.hl'); for (var i = 0; i < h.length; i++) h[i].classList.remove('hl'); }

  /* ---------- after the story: word hunt, talk cards, finish ---------- */
  function endStory() { st.tok++; stopSay(); st.stars.read = 1; confetti(['🎉', '⭐', '📖']); hunt(true); }
  function hunt(first) {
    var s = st.story;
    if (first || !st.hunt) {
      var pool = []; ST.all.forEach(function (o) { if (o.id !== s.id && shelfOf(o) === shelfOf(s)) o.words.forEach(function (w) { pool.push(w); }); }); if (pool.length < 6) ST.all.forEach(function (o) { if (o.id !== s.id) o.words.forEach(function (w) { if (pool.indexOf(w) < 0) pool.push(w); }); });
      var targets = shuffle(s.words).slice(0, Math.min(5, s.words.length));
      st.hunt = { i: 0, ok: 0, rounds: targets.map(function (w) { var d = shuffle(pool).sort(function (a, b) { return Math.abs(a.length - w.length) - Math.abs(b.length - w.length) + (Math.random() - .5) * 3; }).slice(0, 2); return { w: w, opts: shuffle([w].concat(d)), tries: 0 }; }) };
    }
    var h = st.hunt;
    if (h.i >= h.rounds.length) { st.stars.hunt = h.ok >= Math.ceil(h.rounds.length * 0.8) ? 1 : 0; return talk(); }
    var r = h.rounds[h.i];
    paint('linear-gradient(180deg,' + s.sky[0] + ',' + s.sky[1] + ')',
      '<div class="war-top"><button class="war-back" data-act="lib">← Stories</button><div class="war-bar"><i style="width:' + Math.round(h.i / h.rounds.length * 100) + '%"></i></div></div>' +
      '<div class="war-h" style="text-align:center">🔎 Word hunt</div>' +
      '<div class="war-hunt">' + (canSpeak() ? '<button class="war-btn fun" data-act="hear" style="font-size:1.6rem;padding:16px 28px">🔊 Hear the word</button><div class="say" style="margin-top:10px">Which word did you hear?</div>' : '<div class="say">Find the word:</div><div style="font-family:Baloo 2,cursive;font-size:2.4rem">' + esc(r.w) + '</div>') + '</div>' +
      '<div class="war-opts">' + r.opts.map(function (w) { return '<button class="war-opt war-word" data-ww="' + esc(w) + '">' + esc(w) + '</button>'; }).join('') + '</div>' +
      '<div class="war-note">Round ' + (h.i + 1) + ' of ' + h.rounds.length + '</div>' +
      '<div class="war-nav"><button class="war-btn" data-act="skip">Skip the word hunt</button></div>');
    on('[data-act=lib]', 'click', library);
    on('[data-act=skip]', 'click', function () { st.hunt = null; talk(); });
    on('[data-act=hear]', 'click', function () { say(r.w, { rate: st.slow ? 0.6 : 0.78 }); });
    if (canSpeak()) setTimeout(function () { if (st.ov && st.hunt === h && h.rounds[h.i] === r) say(r.w, { rate: 0.78 }); }, 350);
    on('[data-ww]', 'click', function () {
      var w = this.getAttribute('data-ww'); r.tries++;
      if (w === r.w) {
        if (r.tries === 1) h.ok++;
        this.classList.add('good'); say('Yes! ' + r.w, { rate: 0.85 });
        var all = st.ov.querySelectorAll('[data-ww]'); for (var i = 0; i < all.length; i++) all[i].disabled = true;
        setTimeout(function () { if (st.hunt === h) { h.i++; hunt(); } }, 1100);
      } else { this.classList.add('bad'); var me = this; setTimeout(function () { me.classList.remove('bad'); }, 450); say(w + '. Hmm, not that one. Listen again.', { rate: 0.85 }).then(function () { return say(r.w, { rate: 0.78 }); }); }
    });
  }
  function talk() {
    var s = st.story; st.tok++; stopSay();
    paint('linear-gradient(180deg,' + s.sky[0] + ',' + s.sky[1] + ')',
      '<div class="war-top"><button class="war-back" data-act="lib">← Stories</button></div>' +
      '<div class="war-h" style="text-align:center">💬 Talk about it</div><div class="war-note">Chat about these with a grown-up, a sister or a cuddly toy. There are no wrong answers! Tap a card when you have talked about it.</div>' +
      s.talk.map(function (q, i) { return '<button class="war-talk' + (st.talked[i] ? ' done' : '') + '" data-t="' + i + '"><span style="font-size:1.8rem">' + (st.talked[i] ? '✅' : '💭') + '</span><span>' + esc(q) + '</span></button>'; }).join('') +
      '<div class="war-nav"><button class="war-btn ok" data-act="fin">Finish ⭐</button></div>');
    on('[data-act=lib]', 'click', library);
    on('[data-act=fin]', 'click', finish);
    on('[data-t]', 'click', function () { var i = +this.getAttribute('data-t'); if (!st.talked[i]) { st.talked[i] = 1; this.classList.add('done'); this.firstChild.textContent = '✅'; } say(s.talk[i], { rate: 0.8 }); });
  }
  function finish() {
    var s = st.story; st.tok++; stopSay();
    if (Object.keys(st.talked).length >= s.talk.length) st.stars.talk = 1;
    var stars = st.stars.read + st.stars.hunt + st.stars.talk, prev = getProg()[s.id] || {};
    setProg(s.id, { done: 1, stars: Math.max(stars, prev.stars || 0), t: Date.now() });
    var sh = inShelf(shelfOf(s)), nx = sh[sh.indexOf(s) + 1];
    confetti();
    paint('linear-gradient(180deg,' + s.sky[0] + ',' + s.sky[1] + ')',
      '<div class="war-top"><button class="war-back" data-act="lib">← Stories</button></div>' +
      '<div class="war-h" style="text-align:center;margin-top:18px">You read "' + esc(s.title) + '"!</div>' +
      '<div class="war-stars">' + '⭐'.repeat(stars) + '<span style="opacity:.25">' + '⭐'.repeat(3 - stars) + '</span></div>' +
      '<div class="war-note">⭐ read the story &nbsp; ⭐ word hunt &nbsp; ⭐ talked about it</div>' +
      '<div class="war-bub" style="margin-top:14px"><b>💡 Did you know?</b><br>' + esc(s.fact) + '</div>' +
      (canSpeak() ? '<div style="text-align:center"><button class="war-btn fun" data-act="fact">🔊 Hear it</button></div>' : '') +
      '<div class="war-nav">' + (nx ? '<button class="war-btn go" data-act="next">Next story ▶</button>' : '') + '<button class="war-btn" data-act="lib">All stories</button></div>');
    on('[data-act=lib]', 'click', library);
    on('[data-act=next]', 'click', function () { startStory(nx.id); });
    on('[data-act=fact]', 'click', function () { say(s.fact, { rate: 0.8 }); });
  }

  root.WAReaders = { open: open, close: close };
})(typeof window !== 'undefined' ? window : globalThis);
