/*! Rhyme Time: rhymes and word families for Words Adventure (plugin for wa-games.js + wa-game-kit.js)
 * Pictures first, then odd-one-out, word families, finishing rhymes and rhymes that are spelled differently.
 * App topics: early_rhyme, rhyme_families, short_vowels.
 */
(function (root) {
  'use strict';
  var WAG = root.WAGames, K = WAG && WAG.kit;
  if (!K) throw new Error('Load wa-games.js and wa-game-kit.js before wa-game-rhymetime.js');

  // Rhyme groups: [word, emoji]. Emoji '' = no picture (used from level 3 up). Every group ends in a different sound.
  var G = [
    [['cat', '🐱'], ['bat', '🦇'], ['hat', '🎩'], ['rat', '🐀'], ['mat', ''], ['sat', '']],
    [['dog', '🐶'], ['log', '🪵'], ['frog', '🐸'], ['fog', '🌫️'], ['jog', '']],
    [['pig', '🐷'], ['wig', ''], ['dig', ''], ['big', ''], ['jig', '']],
    [['sun', '☀️'], ['run', '🏃'], ['fun', ''], ['bun', '']],
    [['star', '⭐'], ['car', '🚗'], ['jar', '🫙'], ['far', '']],
    [['fish', '🐟'], ['dish', '🍽️'], ['wish', '🌠']],
    [['cake', '🎂'], ['snake', '🐍'], ['lake', '🏞️'], ['rake', ''], ['bake', '']],
    [['boat', '⛵'], ['goat', '🐐'], ['coat', '🧥'], ['float', '']],
    [['ring', '💍'], ['king', '🤴'], ['wing', '🪽'], ['sing', ''], ['swing', '']],
    [['bed', '🛏️'], ['sled', '🛷'], ['red', ''], ['head', '']],
    [['clock', '🕰️'], ['sock', '🧦'], ['rock', '🪨'], ['block', '🧱']],
    [['hen', '🐔'], ['pen', '🖊️'], ['ten', '🔟'], ['men', ''], ['den', '']],
    [['bug', '🐛'], ['mug', '☕'], ['hug', '🤗'], ['rug', ''], ['jug', '']],
    [['fox', '🦊'], ['box', '📦'], ['ox', '🐂']],
    [['bell', '🔔'], ['shell', '🐚'], ['well', ''], ['tell', '']],
    [['ball', '⚽'], ['call', '📞'], ['wall', ''], ['fall', ''], ['tall', '']],
    [['bee', '🐝'], ['tree', '🌳'], ['key', '🔑'], ['sea', '']],
    [['moon', '🌙'], ['spoon', '🥄'], ['balloon', '🎈']],
    [['bear', '🐻'], ['chair', '🪑'], ['pear', '🍐'], ['stair', ''], ['hair', '']],
    [['kite', '🪁'], ['light', '💡'], ['night', '🌃'], ['bite', ''], ['white', '']],
    [['rain', '🌧️'], ['train', '🚂'], ['plane', '✈️'], ['brain', '🧠'], ['chain', '⛓️']],
    [['feet', '🦶'], ['meat', '🥩'], ['seat', ''], ['beet', '']],
    [['blue', '🔵'], ['shoe', '👟'], ['glue', ''], ['two', '']],
    [['house', '🏠'], ['mouse', '🐭']]
  ];

  // Rhymes that are spelled differently (level 6)
  var SPELL = [
    ['blue', 'shoe', 'two', 'zoo', 'new', 'knew'],
    ['night', 'kite', 'bite', 'white', 'right', 'fight'],
    ['boat', 'note', 'coat', 'float', 'vote', 'wrote'],
    ['key', 'bee', 'sea', 'tree', 'knee', 'free'],
    ['rain', 'plane', 'cane', 'brain', 'train', 'main'],
    ['pair', 'bear', 'chair', 'stair', 'hair', 'share'],
    ['pie', 'sky', 'fly', 'eye', 'high', 'cry'],
    ['say', 'day', 'play', 'weigh', 'tray', 'may'],
    ['phone', 'bone', 'stone', 'cone', 'alone', 'throne'],
    ['red', 'bed', 'head', 'said', 'bread', 'thread'],
    ['hear', 'deer', 'near', 'cheer', 'year', 'steer'],
    ['room', 'broom', 'bloom', 'zoom', 'tomb', 'doom']
  ];

  // Word families (level 4): ending -> words
  var FAM = {
    'at': ['cat', 'bat', 'hat', 'mat', 'rat', 'sat', 'fat', 'pat'],
    'an': ['can', 'fan', 'man', 'pan', 'ran', 'van', 'tan'],
    'ap': ['cap', 'map', 'nap', 'tap', 'lap', 'gap'],
    'ig': ['big', 'dig', 'fig', 'pig', 'wig', 'jig'],
    'in': ['bin', 'fin', 'pin', 'tin', 'win', 'thin'],
    'it': ['bit', 'fit', 'hit', 'kit', 'sit', 'pit'],
    'op': ['hop', 'mop', 'pop', 'top', 'cop', 'drop'],
    'ot': ['cot', 'dot', 'hot', 'lot', 'pot', 'rot'],
    'og': ['dog', 'log', 'fog', 'jog', 'hog', 'frog'],
    'ug': ['bug', 'hug', 'mug', 'rug', 'jug', 'dug'],
    'un': ['bun', 'fun', 'run', 'sun', 'gun', 'spun'],
    'en': ['hen', 'men', 'pen', 'ten', 'den'],
    'et': ['bet', 'get', 'jet', 'net', 'pet', 'wet'],
    'ed': ['bed', 'red', 'fed', 'led', 'sled'],
    'ock': ['clock', 'sock', 'rock', 'block', 'lock', 'dock'],
    'ell': ['bell', 'tell', 'well', 'shell', 'sell'],
    'ing': ['king', 'ring', 'sing', 'wing', 'swing', 'thing'],
    'ake': ['cake', 'lake', 'make', 'take', 'bake', 'snake'],
    'ail': ['nail', 'tail', 'mail', 'sail', 'pail', 'snail']
  };
  var FAM_KEYS = Object.keys(FAM);

  // Finish the rhyme (level 5): [line 1, line 2 with ___, answer, wrong, wrong, wrong]
  var COUPLETS = [
    ['The frog sat still upon a log,', 'surrounded by the morning ___.', 'fog', 'rain', 'cloud', 'dust'],
    ['It was cold outside, so I wore my coat,', 'then I rowed away in a little ___.', 'boat', 'bus', 'bike', 'train'],
    ['The sun is up, it is time for fun,', 'so let us go outside and ___!', 'run', 'walk', 'skip', 'jump'],
    ['A little pig put on a wig,', 'and danced a happy little ___.', 'jig', 'song', 'walk', 'step'],
    ['The bee was buzzing in the tree,', 'making honey just for ___.', 'me', 'you', 'us', 'them'],
    ['The rain came down and hit the train,', 'we watched the drops on the window ___.', 'pane', 'glass', 'door', 'floor'],
    ['I ate a slice of birthday cake,', 'then I jumped in the cool blue ___.', 'lake', 'pool', 'sea', 'river'],
    ['Tick, tock, tick, tock,', 'goes the big round ___.', 'clock', 'watch', 'phone', 'bell'],
    ['The king wore a golden ring,', 'and sat on his throne to ___.', 'sing', 'eat', 'rest', 'read'],
    ['I like to hop and skip and jump,', 'then I land with a great big ___.', 'bump', 'thud', 'crash', 'splash'],
    ['My bed is soft and my hair is red,', 'it is time to rest my sleepy ___.', 'head', 'face', 'hand', 'neck'],
    ['I saw a bear sit on a chair,', 'and munch a juicy green ___.', 'pear', 'apple', 'grape', 'plum'],
    ['Look at the star above the car,', 'it shines so bright and it is so ___.', 'far', 'near', 'high', 'tall']
  ];

  var LV = [null,
    { label: 'Which picture rhymes? (2 to pick from)', kind: 'pic', n: 2, ms: 12000 },
    { label: 'Which picture rhymes? (4 to pick from)', kind: 'pic', n: 4, ms: 12000 },
    { label: 'Odd one out', kind: 'odd', ms: 14000 },
    { label: 'Word families: -at, -op, -ig...', kind: 'family', ms: 13000 },
    { label: 'Finish the rhyme', kind: 'couplet', ms: 18000 },
    { label: 'Rhymes that look different', kind: 'spell', ms: 15000 }
  ];

  function label(w) { return w[1] ? w[1] + ' ' + w[0] : w[0]; }
  function others(rng, notIdx, pred) {
    return rng.shuffle(G.map(function (g, i) { return i; }).filter(function (i) { return i !== notIdx && (!pred || pred(G[i])); }));
  }
  function withPics(g) { return g.filter(function (w) { return w[1]; }); }

  K.choiceGame({
    id: 'rhymetime',
    name: 'Rhyme Time',
    emoji: '🎵',
    blurb: 'Hear the rhyme, find the match',
    grades: 'Ages 3 to 7',
    prompt: 'Which one rhymes?',
    levels: LV,
    makeSpec: function (rng, cfg) {
      var gi, g, pics, target, right, order, ch, i, fam, ans, c;
      if (cfg.kind === 'pic') {
        do { gi = rng.int(0, G.length - 1); pics = withPics(G[gi]); } while (pics.length < 2);
        pics = rng.shuffle(pics); target = pics[0]; right = pics[1];
        ch = [right];
        order = others(rng, gi, function (g2) { return withPics(g2).length > 0; });
        for (i = 0; i < order.length && ch.length < cfg.n; i++) ch.push(rng.pick(withPics(G[order[i]])));
        return {
          question: 'What rhymes with ' + target[0].toUpperCase() + '?', visual: K.emojiHtml(target[1]),
          choices: rng.shuffle(ch).map(function (w) { return { v: w[0], label: label(w) }; }), answer: right[0], cols: cfg.n === 2 ? 2 : 2,
          explain: target[0] + ' and ' + right[0] + ' rhyme!'
        };
      }
      if (cfg.kind === 'odd') {
        do { gi = rng.int(0, G.length - 1); } while (G[gi].length < 3);
        g = rng.shuffle(G[gi]).slice(0, 3);
        order = others(rng, gi); ans = rng.pick(G[order[0]]);
        ch = g.concat([ans]);
        return {
          question: 'Which word does NOT rhyme?', visual: '',
          choices: rng.shuffle(ch).map(function (w) { return { v: w[0], label: label(w) }; }), answer: ans[0], cols: 2,
          explain: g.map(function (w) { return w[0]; }).join(', ') + ' rhyme. ' + ans[0] + ' does not.'
        };
      }
      if (cfg.kind === 'family') {
        fam = rng.pick(FAM_KEYS); ans = rng.pick(FAM[fam]);
        ch = [ans];
        rng.shuffle(FAM_KEYS.filter(function (k) { return k !== fam; })).slice(0, 3).forEach(function (k) {
          // a distractor must not accidentally end in the family ending
          var w = rng.pick(FAM[k]); if (w.slice(-fam.length) !== fam) ch.push(w);
        });
        c = 0; while (ch.length < 4 && c++ < 20) { var x = rng.pick(FAM[rng.pick(FAM_KEYS)]); if (x.slice(-fam.length) !== fam && ch.indexOf(x) < 0) ch.push(x); }
        return {
          question: 'Which word is in the -' + fam + ' family?', visual: K.bigHtml('_' + fam),
          choices: rng.shuffle(ch), answer: ans, cols: 2,
          explain: ans + ' ends with -' + fam + ': ' + FAM[fam].slice(0, 4).join(', ')
        };
      }
      if (cfg.kind === 'couplet') {
        c = rng.pick(COUPLETS);
        return {
          question: 'Finish the rhyme!', visual: '<div class="wk-sent">' + K.esc(c[0]) + '<br>' + K.esc(c[1]).replace('___', '<span class="wk-gap">&nbsp;</span>') + '</div>',
          choices: rng.shuffle(c.slice(2)), answer: c[2], cols: 2,
          explain: c[2] + ' rhymes with ' + c[0].replace(/[,.!?]+$/, '').split(' ').pop()
        };
      }
      // spell: rhymes that are written differently
      gi = rng.int(0, SPELL.length - 1); g = rng.shuffle(SPELL[gi]);
      target = g[0]; right = g[1];
      ch = [right];
      rng.shuffle(SPELL.map(function (s, i) { return i; }).filter(function (i) { return i !== gi; })).slice(0, 3).forEach(function (i) { ch.push(rng.pick(SPELL[i])); });
      return {
        question: 'What rhymes with ' + target.toUpperCase() + '?', visual: K.wordHtml(target),
        choices: rng.shuffle(ch), answer: right, cols: 2, explain: target + ' and ' + right + ' rhyme, even though they are spelled differently'
      };
    }
  });
})(typeof window !== 'undefined' ? window : globalThis);
