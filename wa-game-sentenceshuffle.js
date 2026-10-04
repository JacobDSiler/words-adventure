/*! Sentence Shuffle: build the sentence for Words Adventure (plugin for wa-games.js + wa-game-kit.js)
 * Tap the word tiles in the right order. Capital letters and full stops are on the tiles, so the tiles
 * themselves teach where a sentence starts and ends. Later levels bring in questions and commas.
 * App topics: simple_sentences, parts_of_speech, punctuation, paragraph.
 */
(function (root) {
  'use strict';
  var WAG = root.WAGames, K = WAG && WAG.kit;
  if (!K) throw new Error('Load wa-games.js and wa-game-kit.js before wa-game-sentenceshuffle.js');

  // [sentence, emoji or '']
  var S1 = [['The cat sat.', '🐱'], ['I see a bird.', '🐦'], ['The dog can run.', '🐶'], ['The sun is hot.', '☀️'], ['A frog can jump.', '🐸'],
    ['I like my hat.', '🎩'], ['The bus is red.', '🚌'], ['The fish can swim.', '🐟'], ['We can play.', '⚽'], ['I have a kite.', '🪁'],
    ['The cow says moo.', '🐄'], ['It is a big pig.', '🐷'], ['Look at the moon.', '🌙'], ['The hen has an egg.', '🥚'], ['I can see a star.', '⭐']];
  var S2 = [['The baby is asleep.'], ['My uncle can bake.'], ['We went to school.'], ['She has a red coat.'], ['The bird sang a song.'],
    ['He kicked the ball hard.'], ['The dog ate his dinner.'], ['I love my little brother.'], ['The rabbit ate a carrot.'], ['They are in the garden.'],
    ['Grandad reads a book.'], ['We can paint a picture.'], ['The bus stops at school.'], ['I have a new pencil.'], ['The snow is very cold.'], ['My cat likes to sleep.']];
  var S3 = [['The little bird sat in the tree.'], ['We went to the shop to buy milk.'], ['My sister reads a book every night.'],
    ['The children played outside in the sun.'], ['A big brown bear lives in the forest.'], ['Dad cooked pasta for dinner last night.'],
    ['The farmer fed the hungry sheep.'], ['I walk my dog after school each day.'], ['The tiny mouse hid under the big chair.'],
    ['We saw a rainbow after the rain.'], ['My teacher reads us a story on Fridays.'], ['The brave knight rode his white horse.']];
  var S4 = [['Do you want an apple or a pear?'], ['Where are my red shoes?'], ['What time does the bus come?'], ['Can we go to the park today?'],
    ['How many apples are in the bag?'], ['Who left the door open?'], ['Is it going to rain tomorrow?'], ['Why is the sky so blue?'],
    ['Please close the window.'], ['Look out for the big dog!'], ['What a beautiful day it is!'], ['Which book would you like to read?'],
    ['Are you coming to my party?'], ['Wow, that was amazing!']];
  var S5 = [['On Monday, we went to the zoo.'], ['After lunch, we played in the garden.'], ['When it rains, I wear my boots.'], ['If you are tired, you can rest.'],
    ['Yes, I would like some tea.'], ['Well, that was a surprise.'], ['I wanted to go, but it was raining.'], ['First, wash your hands.'],
    ['Dad, can I have a snack?'], ['In the morning, the birds begin to sing.'], ['At the end of the day, we go home.'], ['Luckily, the rain stopped before lunch.'],
    ['My friend lives in Dublin, and I live in Galway.'], ['Last summer, we visited my grandparents.']];
  var S6 = [['Although it was raining, we played outside.'], ['Because the bridge was closed, we took the long road.'], ['She smiled, picked up her bag, and walked home.'],
    ['The old man, who lived next door, grew roses.'], ['Please bring your coat, a hat, and some warm gloves.'], ['Before the show began, everyone found a seat.'],
    ['My brother, who is ten, plays the violin.'], ['When the bell rang, the children ran to the yard.'], ['I like soup, but my sister prefers sandwiches.'],
    ['If we leave now, we will catch the early train.'], ['The storm passed, and the sky turned a soft gold.'], ['Since it was late, we went straight to bed.']];

  var LV = [null,
    { label: 'Short sentences (with a picture)', list: S1, ms: 25000 },
    { label: 'Sentences with 4 or 5 words', list: S2, ms: 30000 },
    { label: 'Longer sentences', list: S3, ms: 40000 },
    { label: 'Questions and exclamations', list: S4, ms: 40000 },
    { label: 'Sentences with commas', list: S5, ms: 45000 },
    { label: 'Complex sentences', list: S6, ms: 50000 }
  ];

  K.buildGame({
    id: 'sentenceshuffle',
    name: 'Sentence Shuffle',
    emoji: '🧩',
    blurb: 'Put the words in order',
    grades: 'Ages 5 to 11',
    prompt: 'Tap the words in order, then Check!',
    levels: LV,
    makeSpec: function (rng, cfg) {
      var it = rng.pick(cfg.list), words = it[0].split(' ');
      return {
        question: 'Build the sentence!', visual: it[1] ? K.emojiHtml(it[1], true) : '',
        pieces: K.scramble(rng, words), target: words, join: ' ',
        explain: it[0]
      };
    }
  });
})(typeof window !== 'undefined' ? window : globalThis);
