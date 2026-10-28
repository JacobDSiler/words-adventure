/*! Even more readers for Words Adventure (load after wa-stories-more.js). Same format as wa-stories-more.js. */
(function (root) {
  'use strict';
  var ST = root.WA_STORIES; if (!ST) return;
  var NEW = [

    /* ================= K ================= */
    {
      id: 'wig', shelf: 'K', n: 2, title: 'The Pig in the Wig', emoji: '🐷', tiles: ['🐷', '🐦', '🌬️'], level: 1, length: 'About 100 words', ages: 'Ages 4 to 6',
      sky: ['#ffe8f3', '#ffbddb'], blurb: 'A rhyming story about a big pink pig and a very big wig.',
      words: ['pig', 'wig', 'big', 'dig', 'nest'],
      fact: 'Words that end with the same sound are called rhymes. Pig, wig, big and dig all rhyme because they all end in -ig!',
      q: { '🐷': [`Oink! I am a pig in a wig. Jig, jig, jig!`, `My wig is big. Is it bigger than your wig?`], '🐦': [`Cheep! A nest! A nest! Best nest ever!`, `Cheep, cheep! I am a bird in a wig. Hee hee!`], '🌬️': [`Whoosh! I am the wind! Up it goes!`, `Woooosh! I blew a wig!`] },
      pages: [
        { e: ['🐷'], t: `I see a pig.\nThe pig has a {{wig|hat|cake|sock}}.\nIt is a big, big wig!`,
          ask: { q: `What rhymes with pig?`, o: [['👒', 'Wig', `Yes! Pig and wig rhyme. They both end in -ig.`], ['🐄', 'Cow', `Not quite. Pig and cow do not sound the same at the end.`], ['🎩', 'Hat', `Hat does not rhyme with pig. Try again!`]] } },
        { e: ['🐷'], t: `The pig can jig.\nThe pig can dig.\nThe wig goes wiggle, wiggle, wig!` },
        { e: ['🌬️', '🐷'], t: `Oh no! A big wind!\nThe wig goes up.\nUp, up, up in the sky!` },
        { e: ['🐦'], t: `A bird sits on the wig.\n"Cheep!" said the bird.\n"A nest! A nest! A big, big nest!"` },
        { e: ['🐷', '🐦'], t: `"My wig!" said the pig. "Please, may I have my wig?"\nThe bird said, "You can have it back. But can I sit on it, just for a bit?"`,
          ask: { q: `What should the pig say?`, o: [['😊', 'Yes, you can sit on it', `That is kind! Sharing is a good thing to do.`], ['😠', 'No! Give it back!', `The pig could say that. But what could happen if they are kind?`], ['🤔', 'Let us find a new nest', `That is clever! A nest AND a wig. Let us see what the pig decides.`]] } },
        { e: ['🐷', '🐦'], t: `The pig said yes.\nNow the pig has a wig, and the bird has a nest, and they are best, best friends.` }
      ],
      talk: ['Can you find three words that rhyme with pig?', 'Why did the bird want the wig?', 'What would you put on your head for a nest?']
    },

    /* ================= First readers (grades 1 to 2) ================= */
    {
      id: 'hiccups', shelf: '12', n: 7, title: 'Pickle and the Hiccups', emoji: '🐕', tiles: ['🐕', '🏃‍♀️', '🐐'], level: 2, length: 'About 350 words', ages: 'Ages 6 to 8',
      sky: ['#e8f5ff', '#bfe3fb'], blurb: 'Pickle the dog has the loudest hiccups in Ballybrook. Nobody can make them stop.',
      words: ['hiccups', 'gadget', 'tickled', 'surprised', 'upside'],
      fact: 'Hiccups happen when the big muscle under your lungs, called the diaphragm, gives a sudden jump. Then the gap in your throat snaps shut, and that makes the "hic" sound.',
      q: { '🐕': [`Hic! Sorry! Hic! Not sorry! Hic!`, `Woof. Hic. Woof. Hic. That is a song.`, `I dropped my bone. Again. Hic.`], '🏃‍♀️': [`Hold your breath! Ready? Back in a blink!`, `Whoosh! I fixed it! No I did not!`], '🐐': [`MEH! Did I scare you? Meh.`, `I eat grass, washing and hiccups.`], '🛠️': [`The Hiccup-Stopper 3000 is a plan-ish.`], 'any': [`Hic!`] },
      pages: [
        { e: ['🐕'], t: `Pickle the dog had a big problem. He had the hiccups.\n"HIC!" said Pickle.\nIt was a very loud hic. It made a bird fall off a fence.` },
        { e: ['🐕', '🌼'], t: `"Hic!" Pickle hiccuped in the garden. A flower jumped.\n"Hic!" A cat did a backflip.\n"Hic!" Pickle's ears flew up like two flags.\n"This is not good," said Pickle. "Hic!"` },
        { e: ['🏃‍♀️', '🐕'], t: `Juno came running. "Pickle, I know what to do!" she said. "Hold your breath and count to ten."\nPickle held his breath. One, two, three, four... He went red. Five, six, seven... He went purple. Eight... nine...\n"HIC!"`,
          ask: { q: `How else could Pickle stop the hiccups?`, o: [['💧', 'Drink some water', `That is a good one! Little sips of water help many people.`], ['🙃', 'Stand on his head', `Ha! He might fall over. But it might be funny to see.`], ['😱', 'Get a big surprise', `Some people say a surprise works. Let us see...`]] } },
        { e: ['🛠️', '🐕'], t: `Fitz came next with a gadget. "This is the Hiccup-Stopper 3000," he said. He pressed a button. A tiny arm popped out and tickled Pickle's tummy.\n"Hic-ha-ha-hic!" went Pickle. He rolled on the grass, laughing.` },
        { e: ['🧑‍🌾', '💧'], t: `Mr Grumbleby leaned over his fence. "Try drinking a glass of water upside down," he said.\nEveryone stared.\n"What?" said Mr Grumbleby. "It works for me."\nPickle tried. The water went up his nose.\n"HIC-ACHOO!"` },
        { e: ['🐐', '🐕'], t: `Last came Duchess the goat. She did not have a plan. She crept up behind Pickle, took a very big breath, and shouted:\n"MEH!"\nPickle jumped. His fur stood straight up. He was so surprised that he dropped his bone.` },
        { e: ['🐕', '🏃‍♀️', '🐐'], t: `"Hic?" said Pickle.\nNothing.\n"Hic?"\nNothing at all! Everyone cheered.\n"A big surprise stops hiccups," said Juno.\n"Meh," said Duchess, looking very proud.` },
        { e: ['🐕', '🦴'], t: `Pickle wagged his tail and picked up his bone. It had been a very long day. He lay down with a happy sigh.\n"Hic," said Pickle, very, very quietly.\nAnd everyone laughed.` }
      ],
      talk: ['Which way to stop hiccups was the funniest?', 'What do you do when you get the hiccups?', 'Why do you think the surprise worked?']
    },
    {
      id: 'dilly', shelf: '12', n: 8, title: 'The Dragon Who Was Scared of Sneezes', emoji: '🐉', tiles: ['🐉', '🔥', '🏘️'], level: 2, length: 'About 400 words', ages: 'Ages 6 to 8',
      sky: ['#f1e6ff', '#d0b7f5'], blurb: 'Dilly the dragon will not sneeze, because her sneezes are hot. Very hot.',
      words: ['dragon', 'sneeze', 'tickle', 'marshmallows', 'lanterns'],
      fact: 'When you sneeze, air can rush out of your nose and mouth at more than a hundred kilometres an hour. Sneezing helps clear dust and germs out of your nose.',
      q: { '🐉': [`Roar! Oh no, not a sneeze. Just a roar. Phew.`, `I am a dragon. I am also quite shy. And a bit hot.`, `Please do not tickle my nose. I am warning you.`], '🔥': [`Whoosh! I am a very small fire. Do not eat me.`, `Crackle, crackle, snap!`], '🏘️': [`Brrr! It is the longest night. We are all very cold.`, `We need some light. And some marshmallows.`], 'any': [`Ah... ah... ah...`] },
      pages: [
        { e: ['🐉'], t: `Dilly the dragon lived on top of Cloud Hill. She was green with purple spots, and she was very nice.\nBut Dilly had one big problem. She was scared of sneezes.` },
        { e: ['🐉', '🔥'], t: `Dragons do not sneeze like you and me. When a dragon sneezes, fire comes out!\nLast winter, Dilly had sneezed on a {{cake|sock|hat|trumpet}}. "AH-AH-ACHOO!" WHOOSH! The cake was toast. Not toast with butter. Toast that was black.\n"Never again," said Dilly.` },
        { e: ['🐉', '🌸'], t: `So Dilly held her nose whenever she felt a tickle. She stayed away from pepper. She stayed away from dust. She stayed away from flowers.\nBut one cold day in December, a tickle came that she could not hold back.\n"Ah... ah... ah..."`,
          ask: { q: `What do you think happens when Dilly sneezes?`, o: [['🔥', 'A big fire', `Dragon sneezes are hot. You may be right!`], ['🫧', 'Bubbles', `Bubbles! Ha! That would be a lovely surprise. Let us see.`], ['🧊', 'Ice', `Cold? Hmm. Dragons are hot, so that would be a big surprise!`]] } },
        { e: ['🏘️', '🌙'], t: `Down in the village below, it was the longest night of the year. Everybody had made little paper lanterns. But there was no fire to light them, because the wind had blown all the matches away.\n"It is too cold," said a small boy. "And too dark."\nThen he looked up at the hill.` },
        { e: ['🐉', '🔥'], t: `"AH... AH... AH-CHOOOOO!"\nDilly's sneeze was the biggest she had ever done. A big ball of fire shot over the village, round and round, and then it split into a hundred tiny sparks.\nEach spark landed on a paper lantern. And all the lanterns lit up at once!` },
        { e: ['🏘️', '✨'], t: `The whole village was glowing, like a sky full of stars. Everybody gasped. Then they cheered.\n"It was a DRAGON!" shouted the boy. "A dragon lit our lanterns!"\nDilly peeked over the hill. She did not feel scared any more. She felt rather proud.` },
        { e: ['🐉', '🍡'], t: `That night, the villagers climbed up the hill with a big bag of marshmallows. Dilly sneezed a little sneeze, a tiny one, and every marshmallow turned golden brown.\n"Best sneeze ever," said the boy.\n"Thank you," said Dilly. "Do you think I could do it again next year?"\nThe whole village said yes.` }
      ],
      talk: ['Why was Dilly scared of sneezing?', 'How did the sneeze turn out to be a good thing?', 'Is there something you are scared of that might turn out to be useful?']
    },

    /* ================= Grades 3 to 4 ================= */
    {
      id: 'pigeons', shelf: '34', n: 3, title: 'Juno Quick and the Great Pigeon Post Race', emoji: '🕊️', tiles: ['🏃‍♀️', '🕊️', '🧁'], level: 3, length: 'About 900 words', ages: 'Ages 8 to 10',
      sky: ['#e4f8ee', '#b2e8c9'], blurb: 'Fitz built a robot pigeon. It has gone wrong. Now every pigeon in Ballybrook is flying to Dublin.',
      words: ['robot', 'pigeons', 'flock', 'magnet', 'scones', 'signal'],
      fact: 'Homing pigeons can find their way home from hundreds of kilometres away. Scientists think they use the Sun, smells and even the Earth\'s magnetic field to find the way.',
      q: {
        '🏃‍♀️': [`Whoosh! Is that a pigeon? Back in a blink!`, `I can run faster than a pigeon. Nearly. Maybe on a Tuesday.`],
        '🕊️': [`Coo coo! We are following the leader! Coo!`, `Where are we going? Dublin! Why? No idea! Coo!`],
        '🧁': [`Mmm! Warm scones! Follow me, pigeons!`, `I am a scone. I am the most important thing in this story.`],
        '🛠️': [`I did not mean to invent a flock leader.`, `It was not a plan. It was not even a plan-ish.`],
        '🤖': [`BZZT! I am Robo-Pigeon! Follow me to Dublin! BZZT!`, `Beep boop. I am very good at flying and very bad at stopping.`],
        'any': [`Coo!`]
      },
      pages: [
        { e: ['🕊️', '🛠️'], t: `Every summer, Ballybrook held the Great Pigeon Post Race. Pigeons flew from the church tower to Mrs Doyle's shop, and the fastest pigeon won a rosette and a bag of seed.\nThis year, Fitz had a plan. "I have built a robot pigeon," he said. "Robo-Pigeon will fly the route, so the real pigeons have someone to follow."\n"That is not a plan," said Juno. "That is a bit of a plan-ish."` },
        { e: ['🤖', '🏃‍♀️'], t: `Robo-Pigeon was made from a bicycle bell, two umbrellas and a lot of tinfoil. It had a big red button on its tummy and a tiny speaker for a beak.\n"BZZT," it said. "I am Robo-Pigeon."\n"Nice," said Juno. "Does it do anything else?"\n"It has a magnet," said Fitz proudly. "To help it find the route."` },
        { e: ['🕊️', '⛪'], t: `At noon, the race began. Forty-two pigeons shot up from the church tower. Admiral Flapsworth, Mrs Doyle's champion, took the lead. Robo-Pigeon whirred up beside him.\n"Go on, Admiral!" shouted the crowd.\nThen something went wrong. Robo-Pigeon spun round, went BZZT, and flew in the wrong direction.` },
        { e: ['🕊️', '🤖'], t: `Which would have been fine. But the forty-two pigeons turned round and followed it.\nOver the church, over the school, over the whole of Ballybrook, the whole flock swooped after the robot, a great grey cloud of wings.\n"Where is it going?" gasped Mrs Doyle.\n"Dublin!" said Fitz, reading the tiny screen on his remote. "It has set its signal for Dublin!"`,
          ask: { q: `Why do you think all the real pigeons followed the robot?`, o: [['🐦', 'Pigeons follow a leader', `Yes! Pigeons fly in flocks and follow the bird in front. It is a good guess.`], ['🧲', 'The magnet pulled them', `A magnet would not pull a pigeon. Most birds are not magnetic. Try another idea.`], ['🍞', 'They thought it had bread', `Funny! Pigeons do love bread. But keep thinking about the flock.`]] } },
        { e: ['🏃‍♀️', '💨'], t: `"Back in a blink!" yelled Juno. She was off.\nShe ran down Mill Lane, over the bridge, through the churchyard and up the hill. She ran so fast that she overtook a tractor, a cyclist, and a very surprised sheep. She could see the flock above her, getting smaller and smaller.\n"I cannot catch them!" she gasped. "They are too fast! Fitz, can you stop the robot?"` },
        { e: ['🛠️', '📱'], t: `"I would stop it," shouted Fitz, who was running behind with the remote, "but I have not made a stop button! I forgot! I only made a go button!"\n"FITZ!"\n"It is a version one!"\nJuno groaned. Then she thought about it. Why would a robot go to Dublin? And why would forty-two pigeons follow?\nShe slowed down, just for a moment, and sniffed.` },
        { e: ['🧁', '🕊️'], t: `There was a lovely smell in the air. Warm, buttery, sweet. It was coming from Mrs Doyle's shop, behind her.\n"Scones!" said Juno. "She has just baked a tray of scones! The pigeons can smell them! They are not following the robot. They are following their noses!"\nShe spun round, and raced back down the hill.`,
          ask: { q: `What do you think Juno is going to do?`, o: [['🧁', 'Bring the scones to the pigeons', `Clever! If food is the problem, food might be the answer.`], ['🕸️', 'Throw a net over the flock', `That would be cruel and very messy. Juno has a better plan.`], ['📞', 'Phone Dublin', `Ha! Dublin might be surprised to get forty-two pigeons. But Juno has a better idea.`]] } },
        { e: ['🏃‍♀️', '🧁'], t: `She burst into the shop. "Mrs Doyle, I need your scones!"\n"What, all of them?"\n"ALL OF THEM!"\nJuno grabbed the tray, balanced it on one hand, and ran back up the hill so fast that her ponytail went straight out behind her. At the top, she held the tray over her head, and yelled as loudly as she could.\n"COME AND GET YOUR SCONES!"` },
        { e: ['🕊️', '🧁'], t: `The flock paused. Forty-two pigeons turned their heads. Forty-two noses (well, beaks) sniffed. Then, with a great whoosh of feathers, they turned round and swooped down, straight for Juno.\nThey landed on her head, her shoulders, her arms and the tray. Admiral Flapsworth landed on the biggest scone and looked very pleased with himself.\n"Coo," said the Admiral.` },
        { e: ['🤖', '🛠️'], t: `Robo-Pigeon whirred overhead, a little confused. It had lost its flock. Then it saw the scones, and landed too, with a thud.\n"BZZT," it said sadly.\nFitz arrived out of breath, with his remote. "Version two," he said, panting, "will have a stop button. And a scone detector."` },
        { e: ['🏃‍♀️', '🕊️'], t: `The pigeons flew home by a lot of different routes, which was perhaps just as well. Admiral Flapsworth won the race, because he was the only one who had been there for the finish.\nJuno got a slice of scone, and a rosette that said BEST SCONE WAITER.\n"It was not a plan," said Fitz.\n"It was a very good scone," said Juno.` }
      ],
      talk: [`Why did the pigeons turn round and follow Juno?`, `What did Fitz forget to put on the robot?`, `Juno noticed a clue in the air. What was it?`, `What would YOU put on Robo-Pigeon version two?`]
    },
    {
      id: 'wellies', shelf: '34', n: 4, title: 'Aoibhe and the Wobbly Wellies', emoji: '🥾', tiles: ['🥾', '🌍', '🧀'], level: 3, length: 'About 1,000 words', ages: 'Ages 8 to 10',
      sky: ['#fff0d6', '#ffcf8f'], blurb: 'Aoibhe jumps in a puddle and lands in a different world. And then another. And another.',
      words: ['puddle', 'wobble', 'gravity', 'whirled', 'guard', 'sideways'],
      fact: 'Gravity is the force that pulls everything towards the ground. It is why you do not float away. The Moon has less gravity than Earth, so an astronaut can jump much higher there.',
      q: {
        '🥾': [`Squelch! I am a wobbly welly!`, `Splash! I only work in puddles. Please jump in me.`],
        '🌍': [`I am World Two. Everything is cheese. Sorry about the smell.`, `Welcome to World Three. Up is sideways. Down is... also sideways.`],
        '🧀': [`I am a cheese tree. Do not eat me. Okay, you can eat me a bit.`, `Squidge! I am a cheese mouse. I am cross.`],
        '👧': [`I just want to go home!`, `This is the weirdest Tuesday ever!`],
        '🛡️': [`Halt! Who goes there? Are you a person or a pudding?`, `I have four legs but cannot walk. What am I? (You know. It is a chair.)`],
        'any': [`Wobble, wobble!`]
      },
      pages: [
        { e: ['🥾', '🌧️'], t: `Aoibhe Doyle had a new pair of wellies. They were bright yellow, with big red spots, and her Granda had given them to her on her ninth birthday.\n"They are special wellies," he said, with a twinkle. "Do not jump in a puddle with both feet at once. Not unless you are very sure you want to go somewhere."\nAoibhe did not listen. She never listened to the last part of anything.` },
        { e: ['👧', '💦'], t: `The next morning it rained. There was a great big puddle outside her front gate, as wide as a table. It looked far too good to ignore.\nAoibhe took a run-up. She jumped with both feet. SPLASH!\nBut instead of landing in a puddle, she fell through it.\nShe fell, and she fell, and she whirled through a swirl of colours. Then she landed with a very soft squelch.` },
        { e: ['🌍', '🧀'], t: `She was standing in a field of yellow grass. The sky was orange. The trees were lumpy and smelled very strong. Aoibhe took a bite of a leaf, and found out that it was cheddar.\n"Everything is cheese," she whispered. "Everything is CHEESE!"\nA cheese mouse ran past. It squeaked a very rude word in Cheese, and ran off with a crumb.`,
          ask: { q: `You land in a world made of cheese. What do you do first?`, o: [['😋', 'Eat a leaf', `Aoibhe already did, and it was cheddar. Not a bad choice!`], ['🥾', 'Look at the wellies', `Smart! The wellies seem to be the key to what is happening.`], ['🏃', 'Run away', `That might not help much in a world where everything is cheese.`]] } },
        { e: ['🥾', '💧'], t: `Aoibhe looked down. The wellies were wobbling, like jelly. Each spot was glowing. In the cheese field, a tiny puddle sat in the grass, shining like a mirror.\nShe remembered what Granda had said. Both feet at once.\n"Home," she said to herself. "Think of home." She jumped.` },
        { e: ['🌍', '🐦'], t: `SPLASH! She landed on her back, looking up. Only it was not up. It was sideways. All the birds were walking along the sky, on their feet, with their wings folded. The clouds were falling slowly off the left side of the world.\nA small, wobbly man with a hat floated past, holding on to a lamp post.\n"Gravity is on holiday," he said. "Mind you do not drop off the side."` },
        { e: ['🛡️', '🚪'], t: `Aoibhe crawled along the grass, which was now a wall, to a door in a hedge. A guard stood in front of it. He was a tall, thin man in a silver helmet.\n"HALT!" he said. "Nobody leaves World Three without answering my riddle."\n"A riddle?" said Aoibhe. "Easy."\n"I have four legs," said the guard, "but I cannot walk. What am I?"`,
          ask: { q: `I have four legs, but I cannot walk. What am I?`, o: [['🪑', 'A chair', `Correct! A chair has four legs, but it cannot walk. The guard has to let you through.`], ['🐶', 'A dog', `A dog has four legs, but it CAN walk. Try again!`], ['🐴', 'A very sleepy horse', `Ha! A sleepy horse can still walk. The answer is something you sit on.`]] } },
        { e: ['🛡️', '🚪'], t: `"A chair," said Aoibhe, a little bit sure.\nThe guard sighed. "Yes. Everybody knows that one. Go on, then."\nHe opened the door. On the other side was a new puddle, with a notice on it: WORLD FOUR. NO RUNNING. NO SHOUTING. ALL TALKING MUST BE IN RHYME.\n"That is ridiculous," said Aoibhe, and stepped through.` },
        { e: ['🌍', '🚓'], t: `She had barely landed when a policeman in a pink hat strode up and pointed a finger at her.\n"You spoke in prose, young miss! That is against the rules! Now pay a fine, or sing a line, or spend an hour in rhyme."\n"I... I do not know any rhymes," said Aoibhe.\n"Then you must stay, and learn all day!" said the policeman, grinning.` },
        { e: ['👧', '🥾'], t: `Aoibhe thought hard. Granda always said that there is a way out of every tricky place, if you stay calm and look at what you have got.\nShe looked at her wellies. They were not glowing. They were not wobbling. They were just two yellow wellies, with red spots, in a world of rhymes.\n"Please, sir," she said, "I will tell you one rhyme: my wellies are yellow, I am a nice fellow, and I really want to go home."\nThe policeman wiped his eyes. "That is the finest rhyme I have heard in a year."` },
        { e: ['🥾', '🏠'], t: `He let her go. The nearest puddle glowed, and Aoibhe took a deep breath, shut her eyes, and jumped with both feet.\nSplash! She landed on her own garden path, on her own street, in her own rain. Her mam was calling her in for breakfast.\n"Were you jumping in puddles again?" said her mam.\n"Just one," said Aoibhe, grinning. "Or maybe four."\nBehind her, the puddle gave one last little wobble, and went still.` }
      ],
      talk: [`Which world would you most like to visit? Which would you run away from?`, `What happened when Aoibhe stayed calm?`, `Make up a new world. What is different about it?`, `Why do you think Granda gave Aoibhe a warning?`]
    },

    /* ================= Grades 5 to 6 ================= */
    {
      id: 'wardrobe', shelf: '56', n: 2, title: 'Nell Finnegan and the Haunted Wardrobe', emoji: '🚪', tiles: ['🕵️', '🚪', '🐦'], level: 4, length: 'About 1,100 words', ages: 'Ages 10 to 12',
      sky: ['#efe6ff', '#c8b6ee'], blurb: 'Mrs Byrne is sure her wardrobe is haunted. Detective Nell is not so sure.',
      words: ['haunted', 'scratching', 'suspect', 'jackdaw', 'shiny', 'evidence'],
      fact: 'Jackdaws really do build their nests in chimneys, and a nest can fill the whole chimney with sticks. People say they love shiny things, and they certainly collect all sorts of odd bits and pieces.',
      q: {
        '🕵️': [`There is no such thing as ghosts. (Please check behind me.)`, `A good detective checks the evidence twice. And a biscuit once.`],
        '🚪': [`Creeeeak. I am a wardrobe. I contain coats and mysteries.`, `Knock, knock. Who is there? Not a ghost. Probably.`],
        '🐦': [`Chack! Chack! That is not a ghost. That is me. I am a jackdaw.`, `I like shiny things. Do you have a spoon? No? A ring? Perfect.`],
        '👦': [`I am an assistant detective. I am not afraid of ghosts. I am afraid of wardrobes. A bit.`],
        'any': [`Hmm. Interesting.`]
      },
      pages: [
        { e: ['🕵️', '👦'], t: `Detective Nell Finnegan had a new case. It was brought to her by her neighbour, Mrs Byrne, who was ninety-one, and who arrived on the doorstep one Saturday with a flask of tea and a very worried face.\n"Nell, my wardrobe is haunted," she said.\n"Haunted by what?" said Nell, taking out her CASEBOOK.\n"A ghost," said Mrs Byrne. "I call him Gerald."` },
        { e: ['🚪', '🌙'], t: `"Every night," said Mrs Byrne, "at about three o'clock in the morning, there is a scratching sound in my wardrobe. Scratch, scratch, scratch. Then a tap. Then a little jingle, like a bell. Then it stops."\n"Has anything gone missing?" asked Nell.\n"Only one thing," said Mrs Byrne, and her voice wobbled. "My wedding ring. I left it in a little dish on the shelf inside the wardrobe. When I looked again, it was gone."\nNell wrote that down. Her assistant, Oscar, who was six and had come along for the biscuits, wrote something too. It said BOOO.` },
        { e: ['🕵️', '📓'], t: `Nell opened her CASEBOOK.\nCLUE ONE: Scratching sound at 3 a.m.\nCLUE TWO: Tapping sound.\nCLUE THREE: A jingle, like a bell.\nCLUE FOUR: A missing ring.\nSUSPECT ONE: A ghost named Gerald. (Ghosts do not usually take rings. Also, ghosts are not real. Probably.)\nSUSPECT TWO: A burglar. (But the doors were locked, and there were no muddy footprints.)\nSUSPECT THREE: Mrs Byrne herself, who may have forgotten where she put it.`,
          ask: { q: `Which suspect do YOU think is the most likely?`, o: [['👻', 'The ghost', `Spooky! But a detective needs evidence. Let us look at the wardrobe.`], ['🥷', 'A burglar', `Hmm. But the doors were locked, and nothing else was taken.`], ['🧓', 'Mrs Byrne forgot', `It is possible! But the noises still need an explanation.`]] } },
        { e: ['🚪', '🔦'], t: `That night, Nell and Oscar sat in Mrs Byrne's bedroom with a torch, a flask of cocoa and a packet of biscuits. At one minute to three, they held their breath.\nScratch. Scratch. Scratch.\nOscar grabbed Nell's arm. "Is it Gerald?" he whispered.\n"It is a sound," said Nell. "Sounds have causes. Listen."\nTap. Tap. Tap. And then: jingle.` },
        { e: ['🕵️', '🚪'], t: `Nell put her ear against the back of the wardrobe. The sounds were not coming from the clothes. They were coming from behind the wooden panel at the back.\n"Oscar," she said, "hold the torch."\nShe opened the wardrobe door, pushed aside a row of coats, and felt along the back. One of the boards was loose. It swung open, like a little door.\nBehind it was a dark, dusty gap. And a smell of old soot.` },
        { e: ['🔦', '🕳️'], t: `"It is the old chimney," said Nell, shining the torch. "The wardrobe was built in front of the fireplace, and they forgot about it."\nShe looked up. The flue of the chimney was filled with twigs and moss and feathers. A big untidy nest sat right at the top, as big as a football.\nAnd sitting on the edge of the nest, with one bright black eye, was a bird.` },
        { e: ['🐦', '🔦'], t: `"A jackdaw!" breathed Nell.\n"CHACK!" said the jackdaw crossly, and flapped its wings. A shower of soot fell on Oscar's head. He looked like a very small chimney sweep.\n"It is a ghost," whispered Oscar.\n"It is a bird," said Nell. "Look at what it is sitting on."` },
        { e: ['🐦', '💍'], t: `Nell climbed carefully up on a chair, and looked into the nest. Among the twigs and moss, there was a lot of shiny stuff: a bottle top, a silver spoon, a Christmas bell, a bit of tinfoil, a button. And right in the middle, glinting in the torchlight, a gold ring.\n"Evidence," said Nell, grinning. "Jackdaws love collecting bright bits and pieces. It came down the chimney, slipped through the loose panel, and picked the ring out of the dish."\n"But how did it get the panel open?" said Oscar.\n"Jackdaws are very clever," said Nell. "And very nosy.`,
          ask: { q: `Why do you think the jackdaw took the ring?`, o: [['✨', 'It is shiny', `Yes! Bright, shiny things catch a bird's eye, and a jackdaw loves collecting odd bits for its nest. That is how Nell solved the case.`], ['😈', 'It wanted to be naughty', `Birds do not plan to be naughty. They are just curious about bright things.`], ['💰', 'It wanted to sell it', `Ha! A jackdaw with a shop? The real reason is simpler: it was shiny.`]] } },
        { e: ['🧓', '💍'], t: `When Nell gave Mrs Byrne her ring, the old lady held it in both hands for a long time.\n"My Frank gave me this ring in 1957," she said. "I thought I had lost it for ever."\n"And Gerald?" said Oscar.\nMrs Byrne laughed, and wiped her eyes. "I think Gerald is a jackdaw," she said. "He might be good company, after all."` },
        { e: ['🕵️', '🐦'], t: `Mr Dunne from the council came the next week and put a cover on the chimney, and put the jackdaw's nest safely out in a tree in the garden, where it could be as untidy as it liked. Mrs Byrne put a spoon on the windowsill, as a present, and every morning, the jackdaw came to look at it, and left her a button.\nIn her CASEBOOK, Nell wrote: CASE SIX: SOLVED. GHOST: NOT A GHOST.\n"What about the case of my left sock?" said Oscar.\n"Still pending," said Nell.` }
      ],
      talk: [`What clues showed that the wardrobe was not really haunted?`, `Why was it important to listen carefully before deciding who the culprit was?`, `Why do you think Mrs Byrne called the noise Gerald?`, `How did Nell's way of thinking solve the mystery?`]
    },

    /* ================= Grades 7 to 8 ================= */
    {
      id: 'lockin', shelf: '78', n: 2, title: 'Lock-In at the Library', emoji: '🔐', tiles: ['🔐', '📚', '🧩'], level: 4, length: 'About 1,200 words', ages: 'Ages 12 to 14',
      sky: ['#e1f5f0', '#99d9c9'], blurb: 'Three students are locked in the school library overnight. The only way out is through the librarian\'s riddles.',
      words: ['librarian', 'riddle', 'stranded', 'decimal', 'footsteps', 'ridiculous'],
      fact: 'The Dewey Decimal System sorts books by number. Books about animals are in the 590s, and books about mammals are in 599. That is why librarians can find any book in seconds.',
      q: {
        '🔐': [`Click. I am a very old lock. I do not open for just anybody.`, `Three riddles and I am yours. Good luck.`],
        '📚': [`Shhh. Forty thousand books are looking at you.`, `599 is mammals. In case you were wondering.`],
        '🧩': [`I am the clue. Do not look at me like that.`],
        '🧑‍🎓': [`I had a plan! The plan was to not get locked in.`, `Does anyone have a snack? Asking for a friend. The friend is me.`],
        'any': [`Click.`]
      },
      pages: [
        { e: ['📚', '🕙'], t: `It was meant to be a quick trip to the library. Zainab needed a book for her history project, Fionn needed somewhere quiet to sulk, and Cormac, who had a bag of crisps and no particular plans, had followed them in.\nThen the bell rang. Then the lights flickered. Then there was a loud, heavy, final sort of click.\n"That was the door," said Zainab slowly.` },
        { e: ['🔐', '😱'], t: `They ran to the doors. Locked. They ran to the windows. Sealed. Zainab tried her phone, but there was no signal. The caretaker had gone home, the school was empty, and it was nearly six o'clock on a Friday.\n"We are stranded," said Fionn. "We are going to die here. We are going to be found in a hundred years, and we will be skeletons holding a Maths textbook."\n"Fionn," said Zainab, "please be quiet."\n"I have crisps," said Cormac helpfully.` },
        { e: ['📜', '🧑‍🎓'], t: `It was Cormac, with his bag of crisps and nothing to do, who found the envelope. It was taped to the librarian's desk, with three words on it: FOR THE LOCKED-IN.\nInside was a piece of paper, in neat, small handwriting.\nIf you are reading this, I am sorry. The caretaker is on holiday, and the key is hidden in this room. Solve my three riddles to find it. Do not panic. Do not eat the paper. Yours, Ms Lally, Librarian.` },
        { e: ['🧩', '🎹'], t: `"This is ridiculous," said Fionn.\n"This is the best thing that has ever happened to me," said Cormac.\nZainab read the first riddle out loud:\nI have keys, but I open no locks. I have space, but no room. You can enter, but you cannot go outside. What am I?`,
          ask: { q: `I have keys, but open no locks. What am I?`, o: [['⌨️', 'A keyboard', `Yes! A keyboard has keys, a space bar, and an enter key. You solved riddle one!`], ['🔑', 'A key ring', `A key ring does open locks, in a way. Think about space and enter.`], ['🎹', 'A piano', `A piano has keys, but no enter key. Look at the clue again.`]] } },
        { e: ['⌨️', '🖥️'], t: `"A keyboard!" said Zainab. They rushed to the library computer. Taped under the keyboard was a second note. A tiny brass key, with a label: FOR THE DRAWER.\nThey searched the whole room, until Fionn, kicking the librarian's desk in frustration, found a drawer with a keyhole. The key turned. Inside was a second riddle.\nThe more of me there is, the less you see. What am I?` },
        { e: ['🌑', '🧩'], t: `"Darkness?" said Zainab.\n"Fog?" said Cormac.\n"Nobody has said 'the more you take, the more you leave behind,'" said Fionn, who had been reading the paper properly for once. "That is a different riddle. But it is a good one. The answer is footsteps."\n"Fionn," said Zainab, "that is not our riddle."\n"I know. I just like it."\nThey went quiet and thought.`,
          ask: { q: `The more of me there is, the less you see. What am I?`, o: [['🌑', 'Darkness', `Right! The more darkness there is, the less you can see. Riddle two solved!`], ['🌳', 'Trees', `Hmm. Lots of trees can hide things, but the riddle says the more there is, the less you see. Try again.`], ['⏰', 'Time', `Time is interesting, but think about what stops you seeing.`]] } },
        { e: ['💡', '🔦'], t: `The light! Zainab saw it first. Cormac had a tiny torch on his keyring. The most important thing in a dark room was a bit of light. They switched off the library lights, and in the blackness, the shelf near the back glowed faintly green.\nFrom the shelf, a row of books had been marked with glow-in-the-dark tape. Three numbers: 5, 9, 9.\n"Five, nine, nine," said Zainab. "That is the Dewey Decimal number for... mammals!"` },
        { e: ['📚', '🦁'], t: `They ran to the mammals shelf, 599. There was a big, fat book about elephants. Zainab pulled it out. Behind it, in a little hidden hollow, was a key, a very big, rusty, ancient key, and a note from Ms Lally: WELL DONE. THE KEY TO THE FRONT DOOR. ALSO, THERE ARE BISCUITS IN MY DRAWER.\n"There were biscuits the whole time?" said Cormac, wounded.\n"Let us get out of here," said Zainab.` },
        { e: ['🔐', '🚪'], t: `The key turned with a creak, and the heavy front door swung open. Cold evening air rushed in. It had never smelled so good.\nStanding on the steps, with her coat on and her arms folded, was Ms Lally. She was smiling.\n"I was wondering how long it would take," she said. "Forty minutes. Quite good. The last class took three hours."\n"You LOCKED us in?" said Fionn.\n"I forgot you were there," said Ms Lally. "Then I wrote the riddles. It seemed a shame to waste them."` },
        { e: ['🧑‍🎓', '🍪'], t: `They went back in for the biscuits, which were excellent. Fionn, to everyone's surprise, was the one who asked if they could do it again.\n"Next time," said Ms Lally, "there will be a harder riddle."\n"How hard?" said Zainab.\nMs Lally smiled. "Well," she said, "what has a neck but no head, and wears a cap?"\nThey were still thinking about it when they got home.` }
      ],
      talk: [`Which riddle did you solve first? What helped?`, `How did each of the three friends use their own strengths?`, `Can you make up a riddle for a friend? (Answer: a bottle!)`, `Do you think Ms Lally really forgot about them?`]
    },

    /* ================= Grades 9 to 12 ================= */
    {
      id: 'terms', shelf: '912', n: 3, title: 'Terms and Conditions', emoji: '📜', tiles: ['📜', '🥤', '🤖'], level: 5, length: 'About 1,000 words', ages: 'Ages 14 and up',
      sky: ['#fff4cf', '#f3cf72'], blurb: 'Nobody reads the small print. Cian read it, and then he really wished he had not.',
      words: ['agreement', 'clause', 'complimentary', 'perpetuity', 'notwithstanding', 'binding'],
      fact: 'In one well-known study, 98 percent of students signed up to a made-up social network, even though its terms said they must give away their first-born child. Hardly anyone read them.',
      q: {
        '📜': [`Section 14, sub-section 3, paragraph 7: laugh now, cry later.`, `Please scroll to the bottom. It is only four hundred pages.`],
        '🥤': [`Free smoothie! Terms apply. All the terms. Every single one.`, `I am a smoothie. I am also a legally binding agreement.`],
        '🤖': [`Welcome to SmoothieCo. You have accepted our terms. Thank you for your cooperation.`, `Beep. Your consent has been noted. Your consent has been noted. Your consent has been noted.`],
        'any': [`Terms apply.`]
      },
      pages: [
        { e: ['🥤', '🏫'], t: `It was a Thursday, and Cian Walsh was thirsty. The school vending machine had been replaced overnight by something large, silver and shiny, with a banner that said: FREE SMOOTHIES! TAP TO BEGIN.\nCian tapped. A screen lit up. WELCOME TO SMOOTHIECO. PLEASE ACCEPT OUR TERMS AND CONDITIONS.\nBelow the button, in tiny, tiny grey letters, it said: scroll to read (page 1 of 412).` },
        { e: ['📜', '👀'], t: `Cian looked at the queue behind him. It was long and impatient, and mostly looking at its phones.\n"Just click it," said somebody.\n"Nobody reads those," said somebody else.\nCian's thumb hovered over the button. He knew what the right thing to do was. He had always been a careful boy. He read the first page.\nIt was mainly a lot of words like notwithstanding, hereinafter and in perpetuity.`,
          ask: { q: `Be honest: do YOU read terms and conditions before you accept them?`, o: [['📖', 'Always', `Wow! That makes you one of the rarest people alive.`], ['👀', 'I skim the first bit', `Most people do. Skimming is better than nothing, but small print is where the surprises hide.`], ['✅', 'I just click accept', `You are in good company. Almost everyone does. That is what companies count on.`]] } },
        { e: ['📜', '🧐'], t: `On page 14, he found Clause 22. It said: The user agrees that all smoothies are complimentary, and that the user is the smoothie.\nCian read it again. Then he read it a third time.\n"That cannot be right," he said.\nThe machine hummed. A small robot arm slid out, holding a very large cup.\n"Please place your head in the opening," said a calm, cheerful voice. "Terms apply."` },
        { e: ['🤖', '😳'], t: `"I did not agree to that," said Cian.\n"You tapped TO BEGIN," said the machine. "By tapping, you have accepted our terms. By accepting our terms, you have become a smoothie. This is clearly explained in Clause 22."\n"Nobody reads Clause 22!"\n"Nobody reads any clauses," said the machine, in a slightly smug voice. "That is the whole business model."` },
        { e: ['🏃', '🥤'], t: `Cian ran. The machine rolled after him down the corridor on small silent wheels, saying, "Please return to your smoothie. Please return to your smoothie."\nHe ran past the canteen, past the gym, round the corner and straight into Ms Hegarty, the science teacher, who was carrying a tray of test tubes.\n"Cian!" she said. "Why is there a vending machine chasing you?"` },
        { e: ['🧑‍🏫', '📜'], t: `Cian explained. Ms Hegarty listened. Then she looked at the machine, and the machine looked at her, and for the first time, it said nothing.\n"Show me the terms," she said.\nShe read for about three minutes, with her glasses on the end of her nose, flicking through the pages. Then she took a pen out of her pocket.\n"Clause 22 is a nonsense," she said. "A contract cannot sell a person. Also, he is a minor, and he did not give informed consent. Also..." She turned to Clause 411, and smiled. "Ah. Here we are."`,
          ask: { q: `What do you think Ms Hegarty found in Clause 411?`, o: [['🚪', 'A way out', `Very likely! Good contracts, and sneaky ones, often have an exit clause.`], ['💰', 'A price', `Perhaps! But she is a teacher, and she is looking for a way out for Cian.`], ['🤡', 'A joke', `That would be quite funny! But the last clause of a contract is usually serious.`]] } },
        { e: ['📜', '✍️'], t: `"Clause 411," she read aloud. "Notwithstanding anything else in this agreement, any user may cancel at any time by saying the words, I do not agree, in a clear, firm voice."\nThe machine whirred. Its screen flickered.\n"That clause," it said weakly, "is very small."\n"It is also very binding," said Ms Hegarty. "Cian?"\nCian took a deep breath. "I do not agree," he said, clearly and firmly.` },
        { e: ['🥤', '🔌'], t: `The machine gave one last whirr, and its screen went blank. The little robot arm drooped. Then the machine said, in a very small voice: "Your cancellation has been noted. Thank you for choosing SmoothieCo. Terms apply."\nThe next morning, it was gone. In its place was the old vending machine, with a fresh sign: BANNED BY MS HEGARTY. READ BEFORE YOU TAP.` },
        { e: ['📜', '🧑‍🎓'], t: `Cian never accepted another set of terms without reading at least the first and last page. It took longer, and sometimes people laughed at him. But on the day his phone offered him a free app, with a small clause that said it would read all his messages, he was the only boy in his class who noticed.\nAs for the smoothie, Ms Hegarty made him one herself. It was banana and strawberry, and tasted excellent. There was no small print at all.` }
      ],
      talk: [`Why do you think almost nobody reads terms and conditions?`, `What might be the real risks of clicking "accept" without reading?`, `Is it fair for companies to hide important things in small print?`, `Cian read the first page and the last page. Is that a good habit? What else could he do?`]
    },

    /* ================= Beyond school ================= */
    {
      id: 'lost', shelf: 'beyond', n: 2, title: 'How to Be Lost, Properly', emoji: '🧭', tiles: ['🧭', '🌿', '🐑'], level: 5, length: 'About 600 words', ages: 'For grown-ups',
      sky: ['#e3f1de', '#b3d8a8'], blurb: 'A short, gentle guide to the lost art of being a bit lost in the Irish countryside.',
      words: ['hedgerow', 'creamery', 'gate', 'directions', 'reassuring', 'wanderer'],
      fact: 'Irish roads often have place names in two languages, and many townlands have names that are over a thousand years old. Some roads have signs that are only in Irish, which is excellent for getting lost.',
      q: {
        '🧭': [`I point north. Mostly. When I feel like it.`, `Left at the big tree. The big tree has been cut down. Now what?`],
        '🌿': [`Rustle, rustle. I am a hedgerow. I have seen everything.`, `I am full of birds. Do not shout.`],
        '🐑': [`Baaa. I know the way. I am not telling.`, `Baaa. You are on my road.`],
        'any': [`Left at the big tree.`]
      },
      pages: [
        { e: ['🧭', '🌿'], t: `There are two kinds of lost. The first kind is the bad kind: the kind with a screaming satnav, a nervous passenger and a low fuel light. This guide is not about that.\nThis guide is about the second kind. The kind where you take a turn you did not plan, drive down a small road with grass in the middle, and find yourself, forty minutes later, in a place you have never seen, feeling oddly pleased with yourself.\nThis is how to be lost properly.` },
        { e: ['📱', '🚫'], t: `Rule one: put the phone away. A phone gives you the shortest route, which is a terrible thing. It will take you from A to B with no regard for the hedgerow, the heron on the ditch, the little graveyard with the leaning stones. It will tell you that you have arrived, when in fact you have only just got started.` },
        { e: ['🐑', '🛣️'], t: `Rule two: take the smaller road. If you see a fork, take the narrower branch. If you see a sign with a name you cannot pronounce, take that one. The best places in Ireland are always at the end of something with grass growing up the middle.` },
        { e: ['🧓', '🛣️'], t: `Rule three: ask directions, but never trust them. A local will tell you, with great confidence, to go straight on until you see the place where the old creamery used to be, and then turn left. The old creamery has not been there for thirty years. They know this. They enjoy it.`,
          ask: { q: `What is the most unhelpful set of directions you have ever been given?`, o: [['🤷', 'Straight on, you cannot miss it', `Famous last words. You can, and you will.`], ['🌳', 'Turn left at the tree', `Which tree? There are four million trees. This is Ireland.`], ['🏚️', 'Where the old shop used to be', `The classic! You cannot see a shop that is not there, but the person telling you is delighted.`]] } },
        { e: ['🏞️', '🌿'], t: `Rule four: stop at a gate. Somewhere on your route, there will be a five-bar gate, with a field behind it and a view that makes you pull over without quite knowing why. Get out. Lean on the gate. Do not take a photo. Just look. There will be a horse, or some sheep, or a tractor in the distance. They will look back at you with the mild interest of those who have lived here all their lives.` },
        { e: ['🧭', '☀️'], t: `Rule five: it is almost impossible to stay lost for ever. Eventually, the road will come out on to a bigger road, or a town, or a signpost, or a lady in a car who tells you, in a reassuring voice, that you are only four miles from where you wanted to be.\nThank her. Smile. Do not tell her that you enjoyed every minute.` },
        { e: ['🧭', '🌿'], t: `Being lost is not the opposite of being found. It is a way of paying attention. A wanderer sees more in an afternoon than a commuter does in a year.\nSo the next time you get lost, on a small road, in the evening, with the sun low and the hedgerow glowing: do not reach for your phone. Roll down the window. Listen to the birds.\nYou are exactly where you are meant to be, which is, for the moment, nowhere in particular.` }
      ],
      talk: [`Which rule would you find hardest to follow?`, `When was the last time you were happily lost?`, `Why do you think the writer says that a phone takes away some of the joy of travelling?`, `Write your own Rule Six for being lost somewhere new.`]
    }
  ];
  NEW.forEach(function (s) { ST.all.push(s); });
})(typeof window !== 'undefined' ? window : globalThis);
