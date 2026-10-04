/*! Words Adventure game: Word Workshop (needs wa-games.js + wa-game-kit.js)
 * 7 levels: compound words, prefixes, suffixes, synonyms/antonyms, context clues, roots, vocabulary.
 * All rounds are built only from the rng passed in, so every device sees the same round.
 */
(function (root) {
  'use strict';
  var WAG = root.WAGames, K = WAG && WAG.kit;
  if (!K) throw new Error('Load wa-games.js and wa-game-kit.js before wa-game-wordworkshop.js');

  function up(s) { return String(s).toUpperCase(); }
  function split(s) { return s.split(','); }

  /* ---- level 1: compound words. [first, 'second,second,...'] ---- */
  var COMPOUNDS = [
    ['foot', 'ball,print,path'], ['basket', 'ball'], ['base', 'ball'], ['snow', 'man,flake,ball'],
    ['sun', 'flower,light,shine'], ['rain', 'bow,coat,drop'], ['butter', 'fly'], ['star', 'fish,light'],
    ['gold', 'fish'], ['tooth', 'brush,paste'], ['hair', 'brush,cut'], ['bed', 'room,time'],
    ['class', 'room,mate'], ['book', 'shelf,case,mark'], ['door', 'bell,step,way'], ['back', 'pack,yard'],
    ['play', 'ground,time'], ['camp', 'fire,site'], ['bird', 'house'], ['tree', 'house,top'],
    ['light', 'house,bulb'], ['sand', 'castle,box'], ['pan', 'cake'], ['cup', 'cake,board'],
    ['water', 'fall,melon'], ['wind', 'mill,storm'], ['news', 'paper'], ['note', 'book'],
    ['finger', 'nail,print'], ['sail', 'boat'], ['hand', 'bag,shake'], ['moon', 'light,beam'],
    ['day', 'light,dream'], ['fire', 'fly,place,wood'], ['eye', 'lash,ball'], ['honey', 'comb,bee'],
    ['head', 'phone,band'], ['home', 'work,made'], ['fish', 'bowl,hook'], ['horse', 'shoe,back'],
    ['pop', 'corn'], ['pea', 'nut'], ['life', 'time,boat'], ['milk', 'shake']
  ];
  // none of these can join with any first word above to make a real word
  var NOT_SECOND = split('jump,green,soft,tall,three,slowly,from,quick,happy,never,because,loud,yellow,heavy,seven,gentle,cold,purple,always,under');

  /* ---- level 2: prefixes. [prefix, base, optional "not" wording] ---- */
  var PREFIXES = [
    ['un', 'happy'], ['un', 'kind'], ['un', 'fair'], ['un', 'safe'], ['un', 'lucky'], ['un', 'clear'], ['un', 'friendly'],
    ['un', 'equal'], ['un', 'fit'], ['un', 'known'], ['un', 'able'], ['un', 'wise'], ['un', 'true'], ['un', 'sure'],
    ['un', 'well'], ['un', 'seen'], ['un', 'finished'], ['un', 'usual'], ['un', 'likely'], ['un', 'healthy'], ['un', 'even'],
    ['re', 'write'], ['re', 'do'], ['re', 'play'], ['re', 'build'], ['re', 'fill'], ['re', 'read'], ['re', 'heat'],
    ['re', 'use'], ['re', 'paint'], ['re', 'open'], ['re', 'tell'], ['re', 'start'], ['re', 'count'], ['re', 'load'],
    ['re', 'wash'], ['re', 'join'],
    ['pre', 'view'], ['pre', 'test'], ['pre', 'heat'], ['pre', 'pay'], ['pre', 'wash'], ['pre', 'cook'], ['pre', 'order'], ['pre', 'mix'],
    ['dis', 'agree', 'do not agree'], ['dis', 'like', 'do not like'], ['dis', 'connect', 'not connected'],
    ['dis', 'appear', 'stop being seen'], ['dis', 'obey', 'do not obey'], ['dis', 'honest', 'not honest'],
    ['dis', 'trust', 'do not trust'], ['dis', 'approve', 'do not approve'], ['dis', 'loyal', 'not loyal'],
    ['mis', 'spell'], ['mis', 'read'], ['mis', 'place'], ['mis', 'lead'], ['mis', 'use'], ['mis', 'judge'], ['mis', 'hear'],
    ['mis', 'behave'], ['mis', 'count'], ['mis', 'label'], ['mis', 'understand'], ['mis', 'pronounce'], ['mis', 'quote']
  ];
  var PREF_MEAN = { un: 'not', dis: 'not or the opposite of', re: 'again', pre: 'before', mis: 'wrongly or badly' };

  /* ---- level 3: suffixes ---- */
  var SUF_FUL = split('care,help,joy,hope,thank,pain,peace,play,power,wonder,cheer,use,grace,truth,harm,rest,thought,faith');
  var SUF_LESS = split('care,hope,help,fear,pain,use,harm,end,speech,sleep,point,breath,cloud,spot,joy');
  var SUF_LY = [['slowly', 'slow'], ['quickly', 'quick'], ['quietly', 'quiet'], ['kindly', 'kind'], ['loudly', 'loud'],
    ['happily', 'happy'], ['gently', 'gentle'], ['softly', 'soft'], ['bravely', 'brave'], ['politely', 'polite'],
    ['sadly', 'sad'], ['neatly', 'neat'], ['proudly', 'proud'], ['safely', 'safe'], ['badly', 'bad'], ['calmly', 'calm'],
    ['bitterly', 'bitter'], ['warmly', 'warm']];
  var SUF_NESS = split('kind,happy,sad,dark,soft,weak,fair,loud,bright,quick,polite,gentle,sweet,calm,gloomy');
  var NESS_WORD = function (b) { return (b.charAt(b.length - 1) === 'y' ? b.slice(0, -1) + 'i' : b) + 'ness'; };
  var SUF_ER = [['teacher', 'teaches', 'teaching'], ['singer', 'sings', 'singing'], ['painter', 'paints', 'painting'],
    ['baker', 'bakes', 'baking'], ['farmer', 'farms', 'farming'], ['writer', 'writes', 'writing'],
    ['dancer', 'dances', 'dancing'], ['swimmer', 'swims', 'swimming'], ['reader', 'reads', 'reading'],
    ['builder', 'builds', 'building'], ['player', 'plays', 'playing'], ['helper', 'helps', 'helping'],
    ['driver', 'drives', 'driving'], ['drummer', 'drums', 'drumming'], ['runner', 'runs', 'running'],
    ['gardener', 'gardens', 'gardening'], ['catcher', 'catches', 'catching'], ['listener', 'listens', 'listening']];

  /* ---- level 4: synonyms and antonyms. 'cluster|word|synonyms|antonyms' (cluster = group of related words,
   *      so a distractor is never taken from a related cluster; only headwords are used as distractors) ---- */
  var ADJ = [
    'A|big|large,huge,giant|small,little,tiny', 'A|small|little,tiny|big,large,huge', 'A|huge|enormous,giant,gigantic|tiny,small',
    'A|tiny|little,small|huge,enormous,giant', 'A|old|ancient,aged|new,young,modern', 'A|new|fresh,modern|old,ancient',
    'A|young||old,aged,elderly',
    'B|fast|quick,speedy,rapid|slow', 'B|slow|sluggish|fast,quick,speedy,rapid', 'B|quick|fast,speedy,rapid|slow',
    'B|smart|clever,intelligent,brainy|foolish,silly', 'B|foolish|silly,unwise|smart,clever,wise,sensible',
    'B|strong|powerful,mighty,sturdy|weak,feeble,frail', 'B|weak|feeble,frail|strong,powerful,mighty,sturdy',
    'B|tired|weary,exhausted,sleepy|energetic,lively',
    'C|hot|boiling,scorching|cold,cool,chilly', 'C|cold|chilly,freezing,icy|hot,warm,boiling',
    'C|happy|glad,joyful,cheerful,pleased|sad,unhappy,gloomy', 'C|sad|unhappy,gloomy,miserable|happy,joyful,cheerful,glad',
    'C|angry|mad,furious,cross|calm,pleased', 'C|brave|bold,fearless,courageous|cowardly,fearful,timid',
    'C|scared|afraid,frightened,fearful|brave,bold,fearless', 'C|kind|caring,gentle,friendly|cruel,mean,unkind',
    'C|cruel|harsh,heartless,unkind|kind,gentle,caring', 'C|funny|amusing,comical,hilarious|serious,solemn',
    'C|serious|solemn,grave|funny,playful',
    'D|clean|spotless,pure|dirty,filthy,grubby', 'D|dirty|filthy,grubby,muddy|clean,spotless',
    'D|neat|tidy,orderly|messy,untidy,sloppy', 'D|messy|untidy,sloppy,cluttered|neat,tidy,orderly',
    'D|easy|simple,effortless|difficult,hard,tough', 'D|difficult|hard,tough,tricky|easy,simple,effortless',
    'D|wet|damp,soggy,soaked|dry', 'D|dry|arid,parched|wet,damp,soggy', 'D|full|packed,stuffed|empty,vacant,bare',
    'D|empty|vacant,bare,hollow|full,packed,stuffed', 'D|hungry|starving,famished,ravenous|full,stuffed',
    'D|loud|noisy,deafening,booming|quiet,silent,hushed', 'D|quiet|silent,hushed,still|loud,noisy',
    'D|shiny|glossy,gleaming,glittering|dull,dim', 'D|dark|dim,shadowy|bright,light,sunny'
  ];
  var VERB = [
    'E|begin|start,commence|end,finish,stop', 'E|end|finish,conclude|begin,start', 'E|open||shut,close', 'E|shut|close,seal|open',
    'F|buy|purchase|sell', 'F|sell||buy', 'F|find|discover,locate,spot|lose', 'F|lose|misplace|find,win', 'F|win|triumph,succeed|lose,fail',
    'G|shout|yell,scream,bellow|whisper,murmur', 'G|whisper|murmur|shout,yell',
    'H|jump|leap,spring|', 'H|throw|toss,fling,hurl|catch', 'H|catch|grab,seize|throw,toss', 'H|rush|hurry,dash,race|'
  ];
  function parseWords(list, pos) {
    return list.map(function (s) {
      var p = s.split('|');
      return { pos: pos, cl: p[0], w: p[1], syn: p[2] ? split(p[2]) : [], ant: p[3] ? split(p[3]) : [] };
    });
  }
  var WORDS = parseWords(ADJ, 'a').concat(parseWords(VERB, 'v'));
  var SYN_W = WORDS.filter(function (e) { return e.syn.length; });
  var ANT_W = WORDS.filter(function (e) { return e.ant.length; });

  /* ---- level 5: context clues. [word, sentence, meaning, [3 wrong meanings], clue] ---- */
  var CONTEXT = [
    ['enormous', 'The elephant was so enormous that it blocked the whole road, and the cars had to wait.', 'very, very big', ['very old', 'very noisy', 'very hungry'], 'it blocked the whole road'],
    ['fragile', 'Pack the glass vase carefully because it is fragile and could break if you drop it.', 'easily broken', ['very heavy', 'very shiny', 'very old'], 'it could break if dropped'],
    ['reluctant', 'Mia was reluctant to jump into the cold lake, so she stood at the edge and slowly shook her head.', 'not wanting to do it', ['eager to start', 'too small', 'very proud'], 'she stood at the edge and shook her head'],
    ['scarce', 'Water was scarce in the desert, so the campers saved every last drop.', 'hard to find', ['plentiful and cheap', 'dirty and brown', 'cold and fresh'], 'they saved every last drop'],
    ['vast', 'From the mountain top we could see the vast ocean stretching for miles in every direction.', 'very wide and large', ['very cold', 'very noisy', 'quite narrow'], 'it stretched for miles'],
    ['timid', 'The timid puppy hid behind the sofa whenever visitors came, because it was afraid of new people.', 'shy and easily scared', ['loud and bossy', 'sleepy and slow', 'hungry and greedy'], 'it hid because it was afraid'],
    ['cautious', 'Be cautious when you cross the icy bridge; step slowly and watch where you put your feet.', 'careful to avoid danger', ['in a great hurry', 'full of joy', 'very sleepy'], 'step slowly and watch your feet'],
    ['famished', 'After hiking all day without lunch, the children were famished and ate three helpings of stew.', 'very hungry', ['very cold', 'very happy', 'very muddy'], 'no lunch, then three helpings'],
    ['nimble', 'The nimble goat hopped from rock to rock without ever losing its balance.', 'quick and light on its feet', ['slow and clumsy', 'tall and strong', 'loud and wild'], 'it hopped without losing balance'],
    ['peculiar', 'The cake had a peculiar taste, like nothing I had ever eaten before, so I wasn\'t sure what was in it.', 'strange or unusual', ['sweet and tasty', 'burnt and black', 'plain and ordinary'], 'like nothing I had eaten before'],
    ['hesitate', 'She did not hesitate to answer; the words came out at once, with no pause at all.', 'pause before acting', ['speak very softly', 'forget the answer', 'say it twice'], 'no pause at all'],
    ['jubilant', 'The crowd was jubilant when the home team won, jumping up and down and cheering for joy.', 'very joyful', ['very angry', 'quite bored', 'a bit worried'], 'cheering for joy'],
    ['gleaming', 'The newly washed car was gleaming in the sunshine, so shiny that I could see my face in it.', 'shining brightly', ['covered in mud', 'very old', 'making noise'], 'so shiny I could see my face'],
    ['abundant', 'Apples were abundant that autumn; every tree was loaded and baskets overflowed in the barn.', 'plentiful', ['rotten', 'sour', 'rare'], 'baskets overflowed'],
    ['ravenous', 'By dinnertime the dog was ravenous and gobbled his whole bowl of food in seconds.', 'extremely hungry', ['very sleepy', 'full and happy', 'very muddy'], 'he gobbled his whole bowl'],
    ['tranquil', 'The lake was tranquil at dawn, with no wind, no waves and not a sound to be heard.', 'calm and peaceful', ['wild and stormy', 'busy and crowded', 'cold and dark'], 'no wind, no waves, no sound'],
    ['rigid', 'The old board was rigid and would not bend, no matter how hard I pushed on it.', 'stiff', ['soft and floppy', 'thin and light', 'wet and slippery'], 'it would not bend'],
    ['drab', 'The room looked drab with its faded walls and old brown curtains, until we hung some bright paintings.', 'dull and plain', ['bright and cheerful', 'new and clean', 'big and empty'], 'grey and brown until bright paintings'],
    ['devour', 'The hungry campers began to devour their pancakes, finishing the whole stack in minutes.', 'eat quickly and eagerly', ['cook slowly', 'throw away', 'share out'], 'finishing the stack in minutes'],
    ['concoct', 'Dad decided to concoct a new soup by mixing together whatever vegetables and spices he could find.', 'make by mixing things', ['buy in a shop', 'pour away', 'clean up'], 'mixing whatever he could find'],
    ['sturdy', 'The sturdy table did not wobble even when three children climbed on top of it.', 'strong and solid', ['tiny and thin', 'wobbly and weak', 'soft and warm'], 'it did not wobble'],
    ['weary', 'The weary hikers sat down, rubbed their sore feet and could barely keep their eyes open.', 'very tired', ['full of energy', 'very proud', 'rather bored'], 'could barely keep their eyes open'],
    ['generous', 'The generous baker gave free bread to every child who came by, and never asked for a penny.', 'happy to give a lot', ['selfish and mean', 'always busy', 'asking for money'], 'free bread, never asked for a penny'],
    ['conceal', 'The squirrel tried to conceal its nuts under a pile of leaves so no other animal could find them.', 'hide', ['count', 'break open', 'share'], 'so no one could find them'],
    ['bewildered', 'Lost in the huge crowd, the little boy looked bewildered and turned in circles, not knowing which way to go.', 'confused', ['delighted', 'sleepy', 'bored'], 'turned in circles, not knowing the way']
  ];

  /* ---- level 7: vocabulary in context. [word, sentence, meaning, [3 wrong meanings]] ---- */
  var VOCAB = [
    ['ubiquitous', 'Smartphones have become so ubiquitous that it is rare to walk down a street and not see several of them.', 'found everywhere', ['very expensive', 'hard to use', 'newly invented']],
    ['ephemeral', 'The beauty of the soap bubble was ephemeral; within seconds it had burst and vanished.', 'lasting a very short time', ['hard to describe', 'growing larger', 'pleasant to smell']],
    ['benevolent', 'The benevolent old doctor treated poor families for free and never asked for anything in return.', 'kind and generous', ['strict and demanding', 'forgetful and slow', 'wealthy and proud']],
    ['ambiguous', 'Her answer was ambiguous; some of us thought she said yes, while others were sure she meant no.', 'unclear in meaning', ['extremely rude', 'very short', 'completely false']],
    ['pragmatic', 'Rather than dream about a perfect plan, the pragmatic manager chose the simple approach that would actually work.', 'practical and realistic', ['dreamy and hopeful', 'careless and hasty', 'angry and stubborn']],
    ['meticulous', 'The meticulous clockmaker checked every tiny gear three times, because even the smallest mistake could stop the clock.', 'very careful about details', ['quick and careless', 'famous and wealthy', 'tired and bored']],
    ['ostentatious', 'His ostentatious mansion had gold taps, a fountain in every room and a statue of himself, all built to impress visitors.', 'showy, to impress people', ['plain and modest', 'old and crumbling', 'small and snug']],
    ['laconic', 'The laconic farmer answered every question with one word: "Yes", "No" or "Maybe", and nothing more.', 'using very few words', ['talking all the time', 'speaking loudly', 'telling funny stories']],
    ['gregarious', 'Gregarious by nature, Omar loved parties and was happiest when surrounded by friends and strangers alike.', 'sociable and friendly', ['shy and quiet', 'jealous of others', 'careful with money']],
    ['capricious', 'The weather in spring is capricious: bright sun at breakfast, hail by lunch and calm again by dinner.', 'changing without warning', ['steady and predictable', 'bitterly cold', 'pleasantly warm']],
    ['equivocal', 'The senator gave an equivocal reply, avoiding a direct answer so that no one could tell where she stood.', 'vague on purpose', ['honest and direct', 'loud and angry', 'well prepared']],
    ['magnanimous', 'Though he had won easily, the champion was magnanimous, praising his rival and offering to help him train.', 'generous and forgiving', ['boastful and proud', 'jealous and bitter', 'tired and bored']],
    ['obsequious', 'The obsequious assistant bowed at every word the boss spoke and praised even his worst ideas.', 'overly eager to please', ['rude and bossy', 'lazy and slow', 'wise and careful']],
    ['prudent', 'It is prudent to save some money each month, because you never know when an unexpected cost will arrive.', 'wise and careful', ['foolish and wasteful', 'generous to a fault', 'quick to anger']],
    ['tenacious', 'The tenacious climber refused to give up, and after three failed attempts she finally reached the summit.', 'refusing to give up', ['afraid of heights', 'very lucky', 'fast and strong']],
    ['verbose', 'The speech was so verbose that it took an hour to say what could have been said in two minutes.', 'using too many words', ['very exciting', 'quiet and calm', 'badly written']],
    ['candid', 'Please be candid with me; I would rather hear the honest truth than a polite fib.', 'honest and open', ['polite and shy', 'secretive', 'cheerful']],
    ['sporadic', 'Rain was sporadic that summer, falling only a few times in three months, with long dry spells between.', 'happening now and then', ['falling every day', 'very heavy', 'always welcome']],
    ['scrupulous', 'A scrupulous accountant, she double-checked every figure and would never bend the rules, even slightly.', 'honest and very careful', ['quick to anger', 'lazy and careless', 'willing to cheat']],
    ['ardent', 'An ardent supporter of the school band, he attended every concert and cheered louder than anyone.', 'passionate and eager', ['cold and bored', 'quiet and shy', 'rich and famous']],
    ['austere', 'The monk lived an austere life, sleeping on a hard floor and eating only plain bread and water.', 'plain and strict', ['rich and luxurious', 'noisy and busy', 'short and quick']],
    ['lucid', 'After the confusing lecture, her lucid explanation made the whole problem suddenly clear to everyone.', 'clear and understandable', ['long and complex', 'very quiet', 'half finished']],
    ['indolent', 'The indolent cat spent the whole day sprawled in the sun and would not move, even for a passing mouse.', 'lazy', ['hungry', 'playful', 'fierce']],
    ['adept', 'Even as a child she was adept at chess, beating adults and planning her moves several turns ahead.', 'highly skilled', ['unlucky', 'new to learning', 'overconfident']],
    ['diligent', 'The diligent student worked steadily every evening and finished each assignment well before the deadline.', 'hard-working and careful', ['clever but lazy', 'easily distracted', 'shy and quiet']],
    ['reticent', 'Normally chatty, Leo was reticent about his trip, and no amount of questions made him share the details.', 'reluctant to speak', ['eager to boast', 'forgetful', 'unable to travel']],
    ['frugal', 'Frugal with every coin, she brought lunch from home and mended old clothes rather than buying new ones.', 'careful with money', ['generous with gifts', 'jealous of others', 'fond of fashion']],
    ['cacophony', 'A cacophony of horns, shouts and alarms filled the street, and I could not hear my own thoughts.', 'a clash of loud noises', ['a peaceful silence', 'a sweet melody', 'a quiet song']]
  ];

  /* ---- level 6: roots. 'key|ROOT|meaning|group|example words'. A word listed under two roots counts for both. ---- */
  var ROOTS = [
    'bio|BIO|life|bio|biology,antibiotic,biography', 'geo|GEO|earth|geo|geology,geometry,geography',
    'aqua|AQUA|water|wat|aquarium,aquatic', 'hydr|HYDR|water|wat|hydrant,dehydrate,hydrate',
    'graph|GRAPH|write|wr|paragraph,graphic,autograph,photograph,biography,geography',
    'scrib|SCRIB / SCRIPT|write|wr|script,describe,prescription,manuscript',
    'phon|PHON|sound|snd|phonics,headphones,telephone,microphone,symphony',
    'tele|TELE|far|tele|telephone,telescope,television,telepathy,telecast',
    'micro|MICRO|small|micro|microscope,microwave,microphone',
    'macro|MACRO|large|macro|macroeconomics,macrocosm',
    'scope|SCOPE|see|see|telescope,microscope,periscope,kaleidoscope',
    'spect|SPECT|look|see|inspect,spectator,spectacles',
    'vis|VIS|see|see|television,visible,invisible,vision,visual',
    'dict|DICT|say|dict|dictionary,predict,dictate,contradict',
    'rupt|RUPT|break|rupt|erupt,interrupt,disrupt,rupture',
    'ject|JECT|throw|ject|eject,reject,inject,project',
    'struct|STRUCT|build|struct|construct,structure,construction',
    'chron|CHRON|time|chron|chronology,chronicle,chronological',
    'therm|THERM|heat|therm|thermometer,thermos,thermal,thermostat',
    'auto|AUTO|self|auto|automatic,automobile,autograph',
    'bene|BENE|good|bene|benefit,beneficial,benefactor,benevolent',
    'mal|MAL|bad|mal|malfunction,malicious,malware',
    'ped|PED|foot|ped|pedal,pedestrian,centipede',
    'cred|CRED|believe|cred|credible,incredible,credit',
    'aud|AUD|hear|snd|audio,audience,auditorium,audible',
    'tract|TRACT|pull|tract|tractor,attract,extract,subtract',
    'port|PORT|carry|port|transport,export,import,portable',
    'duc|DUC|lead|duc|produce,reduce,introduce,conduct',
    'cycl|CYCL|circle|cycl|bicycle,cyclone,recycle',
    'anthrop|ANTHROP|human|anthrop|anthropology,philanthropy',
    'photo|PHOTO|light|photo|photograph,photocopy,photosynthesis',
    'ast|AST|star|ast|astronaut,astronomy,asteroid'
  ].map(function (s) { var p = s.split('|'); return { k: p[0], r: p[1], m: p[2], g: p[3], ex: split(p[4]) }; });
  var WORD_KEYS = {};
  ROOTS.forEach(function (r) {
    r.ex.forEach(function (w) { (WORD_KEYS[w] = WORD_KEYS[w] || []).push(r.k); });
  });
  var ROOT_BY_KEY = {};
  ROOTS.forEach(function (r) { ROOT_BY_KEY[r.k] = r; });
  function wordGroups(w) { return WORD_KEYS[w].map(function (k) { return ROOT_BY_KEY[k].g; }); }
  var ROOT_WORDS = Object.keys(WORD_KEYS).filter(function (w) { return WORD_KEYS[w].indexOf('macro') < 0; });

  /* ---- helpers ---- */
  function pickN(rng, arr, n) { return rng.shuffle(arr).slice(0, n); }
  function mkChoices(rng, answer, wrongs) { return rng.shuffle([answer].concat(wrongs)); }

  function ctxSpec(rng, bank, serif, tail) {
    var it = rng.pick(bank), w = it[0], s = it[1];
    var at = s.toLowerCase().indexOf(w), mark = s.substr(at, w.length);
    return {
      question: 'What does ' + up(w) + ' mean here?',
      visual: K.sentHtml(s, mark, serif),
      choices: mkChoices(rng, it[2], it[3]), answer: it[2],
      explain: up(w) + ' means "' + it[2] + '"' + (tail && it[4] ? '. Clue: ' + it[4] + '.' : '.')
    };
  }

  function makeSpec(rng, cfg, level) {
    var it, i, w, b, opts, ans, lab;
    if (level === 1) {
      it = rng.pick(COMPOUNDS); b = rng.pick(split(it[1]));
      return {
        question: 'Finish the compound word:',
        visual: K.wordHtml(it[0] + ' + ___'),
        choices: WAG.textChoices(rng, b, NOT_SECOND, 3), answer: b,
        explain: it[0] + b + ' = ' + it[0] + ' + ' + b
      };
    }
    if (level === 2) {
      it = rng.pick(PREFIXES); w = it[0] + it[1];
      ans = it[2] || ('not ' + it[1]);
      opts = it[0] === 'un' || it[0] === 'dis' ? [ans, it[1] + ' again', it[1] + ' before', it[1] + ' wrongly'] : null;
      if (!opts) {
        var pos = { re: it[1] + ' again', pre: it[1] + ' before', mis: it[1] + ' wrongly' };
        ans = pos[it[0]];
        opts = ['not ' + it[1], it[1] + ' again', it[1] + ' before', it[1] + ' wrongly'];
        if (opts.indexOf(ans) < 0) throw new Error('bad prefix ' + w);
      }
      return {
        question: 'What does ' + up(w) + ' mean?',
        visual: K.bigHtml(w),
        choices: rng.shuffle(opts), answer: ans,
        explain: it[0] + '- means ' + PREF_MEAN[it[0]] + '. ' + w + ' = ' + ans + '.'
      };
    }
    if (level === 3) {
      var t = rng.int(1, 5), base, word, wrong;
      if (t === 1) {
        base = rng.pick(SUF_FUL); word = base + 'ful'; ans = 'full of ' + base;
        wrong = ['without ' + base, 'a kind of ' + base, 'looking for ' + base]; lab = '-ful means full of';
      } else if (t === 2) {
        base = rng.pick(SUF_LESS); word = base + 'less'; ans = 'without ' + base;
        wrong = ['full of ' + base, 'a kind of ' + base, 'looking for ' + base]; lab = '-less means without';
      } else if (t === 3) {
        it = rng.pick(SUF_LY); word = it[0]; base = it[1]; ans = 'in a ' + base + ' way';
        wrong = ['the state of being ' + base, 'not ' + base, 'someone who is ' + base]; lab = '-ly can mean "in a ... way"';
      } else if (t === 4) {
        base = rng.pick(SUF_NESS); word = NESS_WORD(base); ans = 'the state of being ' + base;
        wrong = ['in a ' + base + ' way', 'not ' + base, 'someone who is ' + base]; lab = '-ness means "the state of being"';
      } else {
        it = rng.pick(SUF_ER); word = it[0]; ans = 'someone who ' + it[1];
        wrong = ['the act of ' + it[2], 'a place for ' + it[2], 'without ' + it[2]]; lab = '-er can mean "someone who"';
      }
      return {
        question: 'What does ' + up(word) + ' mean?',
        visual: K.bigHtml(word),
        choices: mkChoices(rng, ans, wrong), answer: ans,
        explain: lab + '. ' + word + ' = ' + ans + '.'
      };
    }
    if (level === 4) {
      var syn = rng.int(0, 1) === 0, e = rng.pick(syn ? SYN_W : ANT_W), good = syn ? e.syn : e.ant;
      var bad = WORDS.filter(function (x) { return x.pos === e.pos && x.cl !== e.cl; }).map(function (x) { return x.w; });
      ans = rng.pick(good);
      return {
        question: syn ? 'Which word means the SAME as ' + e.w + '?' : 'Which word means the OPPOSITE of ' + e.w + '?',
        visual: K.bigHtml(e.w),
        choices: WAG.textChoices(rng, ans, bad, 4), answer: ans,
        explain: syn ? e.w + ' and ' + ans + ' mean almost the same.' : e.w + ' and ' + ans + ' are opposites.'
      };
    }
    if (level === 5) return ctxSpec(rng, CONTEXT, false, true);
    if (level === 7) return ctxSpec(rng, VOCAB, true, false);
    /* level 6 */
    var r = rng.pick(ROOTS);
    if (rng.int(0, 1) === 0 || !r.ex.length || r.k === 'macro') {
      var others = ROOTS.filter(function (x) { return x.g !== r.g; }), pickM = [], seenG = {};
      rng.shuffle(others).forEach(function (x) {
        if (pickM.length < 3 && !seenG[x.g] && x.m !== r.m) { seenG[x.g] = 1; pickM.push(x.m); }
      });
      var ex2 = r.ex.slice(0, 2);
      return {
        question: 'The root ' + r.r + ' means...',
        visual: K.bigHtml(r.r),
        choices: mkChoices(rng, r.m, pickM), answer: r.m,
        explain: r.r + ' means "' + r.m + '", as in ' + ex2.join(' and ') + '.'
      };
    }
    var good2 = rng.pick(r.ex), rest = r.ex.filter(function (x) { return x !== good2; });
    var pool = ROOT_WORDS.filter(function (x) { return wordGroups(x).indexOf(r.g) < 0; });
    var wrongW = pickN(rng, pool, 3);
    return {
      question: 'Which word comes from the root ' + r.r + ' (' + r.m + ')?',
      visual: K.bigHtml(r.r + ' = ' + r.m),
      choices: mkChoices(rng, good2, wrongW), answer: good2,
      explain: good2 + ' comes from ' + r.r + ' (' + r.m + ')' + (rest.length ? '. Another: ' + rng.pick(rest) + '.' : '.')
    };
  }

  K.choiceGame({
    id: 'wordworkshop', name: 'Word Workshop', emoji: '🔧', blurb: 'Build, break apart and decode words',
    grades: 'Ages 8 to 18', prompt: 'Tap the answer!', rounds: 10,
    levels: [null,
      { label: 'Compound words', ms: 12000 },
      { label: 'Prefixes: un-, re-, pre-, dis-, mis-', ms: 13000 },
      { label: 'Suffixes: -ful, -less, -ly, -ness, -er', ms: 14000 },
      { label: 'Same or opposite', ms: 14000 },
      { label: 'Context clues', ms: 18000 },
      { label: 'Roots and word parts', ms: 17000 },
      { label: 'Vocabulary in context', ms: 20000 }
    ],
    makeSpec: makeSpec
  });
})(window);
