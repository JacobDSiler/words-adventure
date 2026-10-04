/*! Letter Pop: letters and sounds for Words Adventure (plugin for wa-games.js + wa-game-kit.js)
 * Big letters, picture clues and sounds. Starts with matching capitals to lowercase and grows into
 * beginning sounds, ending sounds, digraphs and blends.
 * App topics: early_letters, phonics_blends, short_vowels.
 */
(function (root) {
  'use strict';
  var WAG = root.WAGames, K = WAG && WAG.kit;
  if (!K) throw new Error('Load wa-games.js and wa-game-kit.js before wa-game-letterpop.js');

  var UP = 'ABCDEFGHIJKLMNOPRSTUVWZ'.split('');           // letters used for matching (no Q / X / Y confusions)
  // [letter, emoji, word]  first-letter pictures that are hard to mistake for something else
  var START = [
    ['A', '🍎', 'apple'], ['B', '🍌', 'banana'], ['C', '🐱', 'cat'], ['D', '🐶', 'dog'],
    ['E', '🥚', 'egg'], ['F', '🐟', 'fish'], ['G', '🍇', 'grapes'], ['H', '🎩', 'hat'],
    ['I', '🍦', 'ice cream'], ['K', '🔑', 'key'], ['L', '🦁', 'lion'], ['M', '🌙', 'moon'],
    ['N', '👃', 'nose'], ['O', '🐙', 'octopus'], ['P', '🐧', 'penguin'], ['R', '🌹', 'rose'],
    ['S', '☀️', 'sun'], ['T', '🐢', 'turtle'], ['U', '☂️', 'umbrella'], ['V', '🎻', 'violin'],
    ['W', '🍉', 'watermelon'], ['Z', '🦓', 'zebra']
  ];
  var SOUND = { A: 'aaa', B: 'buh', D: 'duh', F: 'fff', H: 'hhh', L: 'lll', M: 'mmm', N: 'nnn', P: 'puh', R: 'rrr', S: 'sss', T: 'tuh', V: 'vvv', Z: 'zzz', K: 'kuh', J: 'juh', W: 'wuh', G: 'guh' };
  var SOUND_KEYS = Object.keys(SOUND);
  // [last letter, emoji, word]
  var END = [
    ['T', '🐱', 'cat'], ['G', '🐶', 'dog'], ['N', '☀️', 'sun'], ['G', '🐷', 'pig'],
    ['S', '🚌', 'bus'], ['D', '🛏️', 'bed'], ['N', '🐔', 'hen'], ['P', '🗺️', 'map'],
    ['P', '🥤', 'cup'], ['X', '🦊', 'fox'], ['N', '🚐', 'van'], ['G', '🪵', 'log'],
    ['T', '🎩', 'hat'], ['G', '🐸', 'frog'], ['L', '🔔', 'bell']
  ];
  var END_LETTERS = 'TGNSDPXKLBMR'.split('');
  // [chunk, emoji, word, kind]
  var CLUSTER = [
    ['SH', '🐑', 'sheep'], ['SH', '👕', 'shirt'], ['SH', '🦈', 'shark'], ['SH', '👞', 'shoe'],
    ['CH', '🧀', 'cheese'], ['CH', '🐔', 'chicken'], ['CH', '🍒', 'cherry'], ['CH', '🪑', 'chair'],
    ['TH', '👍', 'thumb'], ['TH', '🧵', 'thread'], ['WH', '🐋', 'whale'], ['SH', '🚢', 'ship'], ['SH', '🐚', 'shell'], ['CH', '🐥', 'chick'], ['CH', '⛪', 'church'],
    ['FR', '🐸', 'frog'], ['TR', '🌳', 'tree'], ['SP', '🕷️', 'spider'], ['ST', '⭐', 'star'],
    ['SN', '🐌', 'snail'], ['CR', '🦀', 'crab'], ['FL', '🌸', 'flower'], ['DR', '🥁', 'drum'],
    ['GR', '🌿', 'grass'], ['BR', '🍞', 'bread'], ['PL', '🛫', 'plane'], ['SL', '🛷', 'sled']
  ];
  var DIGRAPHS = ['SH', 'CH', 'TH', 'WH'];
  var BLENDS = ['FR', 'TR', 'SP', 'ST', 'SN', 'CR', 'FL', 'DR', 'GR', 'BR', 'PL', 'SL'];

  var LV = [null,
    { label: 'Capital to small letter', kind: 'case', ms: 10000 },
    { label: 'Tricky pairs: b d p q', kind: 'pairs', ms: 12000 },
    { label: 'First letter of a picture', kind: 'first', ms: 11000 },
    { label: 'Which letter makes the sound?', kind: 'sound', ms: 11000 },
    { label: 'Last letter of a picture', kind: 'last', ms: 12000 },
    { label: 'Digraphs: sh ch th wh', kind: 'digraph', ms: 12000 },
    { label: 'Blends: fr tr sp st and more', kind: 'blend', ms: 12000 }
  ];

  function pickOthers(rng, pool, avoid, n) {
    return rng.shuffle(pool.filter(function (x) { return avoid.indexOf(x) < 0; })).slice(0, n);
  }
  function lower(l) { return l.toLowerCase(); }

  K.choiceGame({
    id: 'letterpop',
    name: 'Letter Pop',
    emoji: '🔤',
    blurb: 'Letters, sounds and picture clues',
    grades: 'Ages 3 to 6',
    prompt: 'Tap the letter!',
    levels: LV,
    makeSpec: function (rng, cfg) {
      var L, set, a, others, item, ch;
      if (cfg.kind === 'case') {
        L = rng.pick(UP);
        others = pickOthers(rng, UP, [L], 3).map(lower);
        return { question: 'Find the small letter for', visual: K.bigHtml(L), choices: rng.shuffle([lower(L)].concat(others)), answer: lower(L), big: true, cols: 4, explain: L + ' and ' + lower(L) + ' are the same letter' };
      }
      if (cfg.kind === 'pairs') {
        // b / d / p look alike: a picture says which one starts the word
        var PR = rng.pick([['b', '\uD83C\uDF4C', 'banana'], ['d', '\uD83D\uDC36', 'dog'], ['p', '\uD83D\uDC27', 'penguin'], ['b', '\uD83D\uDC1D', 'bee'], ['d', '\uD83E\uDD86', 'duck'], ['p', '\uD83C\uDF55', 'pizza'], ['b', '\uD83D\uDEB2', 'bike'], ['d', '\uD83E\uDD95', 'dinosaur'], ['b', '\uD83D\uDC3B', 'bear'], ['b', '\uD83D\uDC26', 'bird'], ['d', '\uD83C\uDF69', 'donut'], ['d', '\uD83E\uDD41', 'drum'], ['p', '\uD83C\uDF50', 'pear'], ['p', '\uD83C\uDF4D', 'pineapple']]);
        return { question: 'Which small letter starts it?', visual: K.emojiHtml(PR[1]), choices: ['b', 'd', 'p', 'q'], answer: PR[0], big: true, cols: 4, explain: PR[2] + ' starts with ' + PR[0] };
      }
      if (cfg.kind === 'first') {
        item = rng.pick(START);
        others = pickOthers(rng, START.map(function (s) { return s[0]; }), [item[0], item[0] === 'C' ? 'K' : item[0] === 'K' ? 'C' : ''], 3);
        return { question: 'What letter does it start with?', visual: K.emojiHtml(item[1]), choices: rng.shuffle([item[0]].concat(others)), answer: item[0], big: true, cols: 4, explain: item[0] + ' is for ' + item[2] };
      }
      if (cfg.kind === 'sound') {
        L = rng.pick(SOUND_KEYS);
        others = pickOthers(rng, SOUND_KEYS, [L], 3);
        return { question: 'Which letter says "' + SOUND[L] + '"?', visual: '', choices: rng.shuffle([L].concat(others)), answer: L, big: true, cols: 4, explain: L + ' says "' + SOUND[L] + '"' };
      }
      if (cfg.kind === 'last') {
        item = rng.pick(END);
        others = pickOthers(rng, END_LETTERS, [item[0]], 3);
        return { question: 'What letter does it end with?', visual: K.emojiHtml(item[1]), choices: rng.shuffle([item[0]].concat(others)), answer: item[0], big: true, cols: 4, explain: item[2] + ' ends with ' + item[0] };
      }
      // digraphs and blends: show the picture, pick the starting chunk
      var chunks = cfg.kind === 'digraph' ? DIGRAPHS : BLENDS;
      var pool = CLUSTER.filter(function (c) { return chunks.indexOf(c[0]) >= 0; });
      item = rng.pick(pool);
      others = pickOthers(rng, chunks, [item[0]], 3).slice(0, cfg.kind === 'digraph' ? 3 : 3);
      return {
        question: 'How does it start?', visual: K.emojiHtml(item[1]),
        choices: rng.shuffle([item[0]].concat(others)).map(function (c) { return { v: c, label: c.toLowerCase() }; }), answer: item[0], big: true, cols: 4,
        explain: item[2] + ' starts with ' + item[0].toLowerCase()
      };
    }
  });
})(typeof window !== 'undefined' ? window : globalThis);
