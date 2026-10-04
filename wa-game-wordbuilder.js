/*! Word Builder: spelling with letter tiles for Words Adventure (plugin for wa-games.js + wa-game-kit.js)
 * Tap the letters in order to spell the picture or the word in the sentence.
 * App topics: early_letters, sight_words_k2, short_vowels, long_vowels, spelling.
 */
(function (root) {
  'use strict';
  var WAG = root.WAGames, K = WAG && WAG.kit;
  if (!K) throw new Error('Load wa-games.js and wa-game-kit.js before wa-game-wordbuilder.js');

  // [word, emoji]
  var W3 = [['cat', '🐱'], ['dog', '🐶'], ['sun', '☀️'], ['pig', '🐷'], ['hat', '🎩'], ['bus', '🚌'], ['bed', '🛏️'], ['hen', '🐔'],
    ['map', '🗺️'], ['fox', '🦊'], ['van', '🚐'], ['log', '🪵'], ['bug', '🐛'], ['car', '🚗'], ['egg', '🥚'], ['ant', '🐜'], ['bee', '🐝'],
    ['pen', '🖊️'], ['key', '🔑'], ['owl', '🦉'], ['cow', '🐄'], ['bat', '🦇'], ['rat', '🐀'], ['cup', '🥤']];
  var W4 = [['frog', '🐸'], ['fish', '🐟'], ['duck', '🦆'], ['bird', '🐦'], ['tree', '🌳'], ['star', '⭐'], ['moon', '🌙'], ['book', '📖'],
    ['cake', '🎂'], ['ball', '⚽'], ['drum', '🥁'], ['nest', '🪺'], ['bear', '🐻'], ['lion', '🦁'], ['door', '🚪'], ['leaf', '🍃'],
    ['sock', '🧦'], ['kite', '🪁'], ['bell', '🔔'], ['boat', '⛵'], ['crab', '🦀'], ['milk', '🥛'], ['bone', '🦴'], ['ship', '🚢']];
  var W5 = [['apple', '🍎'], ['tiger', '🐯'], ['horse', '🐴'], ['house', '🏠'], ['snake', '🐍'], ['whale', '🐋'], ['shark', '🦈'], ['grape', '🍇'],
    ['lemon', '🍋'], ['cloud', '☁️'], ['clock', '🕰️'], ['plane', '✈️'], ['train', '🚂'], ['truck', '🚚'], ['camel', '🐫'], ['zebra', '🦓'],
    ['panda', '🐼'], ['mouse', '🐭'], ['robot', '🤖'], ['pizza', '🍕'], ['bread', '🍞'], ['chair', '🪑'], ['spoon', '🥄'], ['sheep', '🐑']];
  var W9 = [['elephant', '🐘'], ['butterfly', '🦋'], ['dinosaur', '🦕'], ['rainbow', '🌈'], ['penguin', '🐧'], ['giraffe', '🦒'], ['spider', '🕷️'],
    ['pumpkin', '🎃'], ['volcano', '🌋'], ['umbrella', '☂️'], ['tractor', '🚜'], ['rocket', '🚀'], ['camera', '📷'], ['guitar', '🎸'],
    ['cherry', '🍒'], ['monkey', '🐒'], ['dolphin', '🐬'], ['octopus', '🐙'], ['strawberry', '🍓'], ['helicopter', '🚁'], ['snowman', '⛄'],
    ['mountain', '⛰️'], ['crocodile', '🐊'], ['kangaroo', '🦘']];
  // [word, sentence with ___]
  var SIGHT = [['said', '"Hello!" she ___.'], ['they', '___ are playing outside.'], ['with', 'I like to play ___ my friends.'],
    ['have', 'I ___ a red ball.'], ['were', 'We ___ at the park yesterday.'], ['there', 'Look over ___!'], ['where', '___ are my shoes?'],
    ['their', 'The children took ___ coats.'], ['would', 'I ___ like some tea, please.'], ['could', 'My teacher said I ___ go outside.'],
    ['about', 'This book is ___ a brave knight.'], ['again', 'Please read that story ___.'], ['friend', 'A ___ is someone you like to play with.'],
    ['people', 'Many ___ live in the city.'], ['school', 'We learn to read at ___.'], ['because', 'I am happy ___ it is sunny.'],
    ['mother', 'My ___ made me a cake.'], ['brother', 'My ___ and I play in the garden.'], ['every', 'I walk to the park ___ day.'],
    ['water', 'I drink a glass of ___.'], ['after', 'We play ___ lunch.'], ['before', 'Wash your hands ___ you eat.'],
    ['always', 'The sun ___ rises in the morning.'], ['children', 'The ___ played on the swings.'], ['through', 'We walked ___ the forest.'],
    ['little', 'The ___ mouse hid in the hay.'], ['father', 'My ___ drives a green tractor.'], ['sister', 'My ___ sings in the choir.']];
  // [word, meaning]
  var TRICKY = [['castle', 'A big stone building where a king or queen might live'], ['listen', 'To hear with care'],
    ['thumb', 'The short, thick finger on your hand'], ['wrist', 'The bendy part between your hand and your arm'],
    ['knee', 'The joint in the middle of your leg'], ['island', 'Land with water all around it'],
    ['answer', 'What you say when someone asks you a question'], ['ghost', 'A spooky spirit in stories'],
    ['whistle', 'To make a high sound by blowing through your lips'], ['climb', 'To go up a hill or a ladder'],
    ['knife', 'You cut your food with it'], ['write', 'To make words with a pencil'], ['autumn', 'The season when leaves fall'],
    ['calm', 'Quiet and peaceful'], ['weigh', 'To find out how heavy something is'], ['knight', 'A soldier who wore metal clothes and rode a horse long ago'],
    ['library', 'A place where you borrow books'], ['science', 'Learning about plants, animals and space'], ['rhyme', 'Words that end with the same sound'],
    ['laugh', 'What you do when something is very funny'], ['daughter', 'A girl who is somebody’s child'], ['special', 'Not ordinary; very important to you'],
    ['journey', 'A long trip from one place to another'], ['mirror', 'You look at yourself in it'], ['bubble', 'A thin ball of soap and air'],
    ['rabbit', 'A small animal with long ears that hops'], ['ladder', 'You climb up it to reach high places'], ['happen', 'To take place']];

  var ALPHA = 'abcdefghijklmnopqrstuvwxyz'.split('');
  var LV = [null,
    { label: 'Spell 3-letter words (with a picture)', kind: 'pic', list: W3, ms: 25000 },
    { label: 'Spell 4-letter words (with a picture)', kind: 'pic', list: W4, ms: 28000 },
    { label: 'Spell 5-letter words (one tile is extra)', kind: 'pic', list: W5, decoy: 1, ms: 32000 },
    { label: 'Sight words in a sentence', kind: 'sight', ms: 35000 },
    { label: 'Spell big words (with a picture)', kind: 'pic', list: W9, ms: 45000 },
    { label: 'Tricky spellings (silent and double letters)', kind: 'tricky', decoy: 1, ms: 45000 }
  ];

  function tiles(rng, word, decoys) {
    var t = word.split(''), i, c, tries;
    for (i = 0; i < decoys; i++) {
      tries = 0; do { c = rng.pick(ALPHA); } while (word.indexOf(c) >= 0 && tries++ < 40);
      t.push(c);
    }
    return K.scramble(rng, t);
  }

  K.buildGame({
    id: 'wordbuilder',
    name: 'Word Builder',
    emoji: '🧱',
    blurb: 'Tap the letters to spell the word',
    grades: 'Ages 4 to 9',
    prompt: 'Tap the letters in order, then Check!',
    levels: LV,
    makeSpec: function (rng, cfg) {
      var it, w;
      if (cfg.kind === 'pic') {
        it = rng.pick(cfg.list);
        return { question: 'Spell the word!', visual: K.emojiHtml(it[1]), pieces: tiles(rng, it[0], cfg.decoy || 0), target: it[0].split(''), join: '', explain: it[0] };
      }
      if (cfg.kind === 'sight') {
        it = rng.pick(SIGHT);
        return { question: 'Spell the missing word!', visual: K.sentHtml(it[1]), pieces: tiles(rng, it[0], 0), target: it[0].split(''), join: '', explain: it[1].replace('___', it[0]) };
      }
      it = rng.pick(TRICKY);
      return { question: 'Spell the word that means:', visual: '<div class="wk-sent">' + K.esc(it[1]) + '</div>', pieces: tiles(rng, it[0], cfg.decoy || 0), target: it[0].split(''), join: '', explain: it[0] };
    }
  });
})(typeof window !== 'undefined' ? window : globalThis);
