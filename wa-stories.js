/*! The Hollybrook Wood Stories: six linked readers for Words Adventure (window.WA_STORIES)
 * Pages hold 1-4 short paragraphs. Markup inside page text:
 *   {{log|custard|sock}}  a SILLY WORD: the child taps it and the word swaps for a funny one (first is the real word)
 *   *like this*           italics
 * Page extras:  e = emoji tiles on the page (tap them for a silly line, see QUIPS in wa-readers.js)
 *               ask = a "what do you think?" question (no wrong answers): [emoji, label, reply]
 *               ch = a chapter heading shown above the page
 */
(function (root) {
  'use strict';
  var S = [
    {
      id: 'pip', n: 1, title: 'Pip and the Cosy Bed', emoji: '🦔', tiles: ['🦔', '🍂', '🌰'], level: 1, length: 'About 150 words',
      sky: ['#fff1d6', '#ffd9a8'], blurb: 'A tired hedgehog, three beds and one surprise acorn.',
      words: ['hedgehog', 'cosy', 'tired', 'acorn'],
      fact: 'A hedgehog has thousands of prickly spines. When it is scared it curls up into a tight ball, so nobody can nibble its tummy!',
      pages: [
        { e: ['🦔', '🌲'], t: 'Pip the hedgehog lived in Hollybrook Wood.\nPip was small. Pip was very tired.' },
        { e: ['🦔', '🪵'], t: '"I need a bed," said Pip.\nPip looked under a {{log|custard|trampoline|sock}}. It was wet. "No," said Pip.' },
        { e: ['🦔', '🕳️'], t: 'Pip looked in a {{hole|hat|teapot|wardrobe}}. It was dark. "No," said Pip.' },
        { e: ['🌲', '🍂'], t: 'Pip looked by a big oak tree. There was a pile of leaves. The leaves were red and gold and brown.',
          ask: { q: 'What do you think Pip will do with the leaves?', o: [['🛏️', 'Make a bed', 'Good thinking! Real hedgehogs do sleep in piles of leaves. Let us see what Pip does.'], ['😋', 'Eat them', 'Leaves are not very tasty. Pip would get a funny tummy! Let us see what she really does.'], ['🎉', 'Have a leaf party', 'A leaf party! Maybe tomorrow. Let us see what Pip does today.']] } },
        { e: ['🦔', '🍂'], t: 'Pip pushed the leaves into a heap. Pip dug in and curled up into a ball.\nIt was soft. It was warm. It was cosy.\n"This is the best bed," said Pip.' },
        { e: ['🦔', '🌰'], t: 'Pip shut her eyes.\nPlop!\nSomething hit the leaves. It was an acorn!',
          ask: { q: 'Who do you think was up in the tree?', o: [['🐿️', 'A squirrel', 'You might be right. Squirrels love acorns!'], ['🦉', 'An owl', 'Hoo knows? Owls do live in trees. Keep reading to find out.'], ['🐘', 'An elephant', 'An elephant in a tree? That would be a very big surprise. Keep reading!']] } },
        { e: ['🦔', '🐿️'], t: 'Pip looked up. A bushy red tail was waving in the tree.\n"Sorry!" said a small voice. "That is my acorn!"\nPip smiled. "I will help you find it in the morning," she said.\nThen Pip went to sleep.' }
      ],
      talk: ['Why did Pip say no to the log and the hole?', 'What was the bed made of?', 'Who do you think was up in the tree?']
    },
    {
      id: 'rusty', n: 2, title: 'Rusty and the Lost Acorns', emoji: '🐿️', tiles: ['🐿️', '🌰', '👃'], level: 1, length: 'About 250 words',
      sky: ['#ffe3d0', '#ffc2a0'], blurb: 'Rusty has hidden his acorns so well that even he cannot find them.',
      words: ['squirrel', 'remember', 'hidden', 'nose', 'stump'],
      fact: 'Real squirrels bury lots of acorns and then forget some of them. The forgotten acorns can grow into brand new oak trees!',
      pages: [
        { e: ['🦔', '🌲'], t: 'In the morning, Pip woke up. The sun was bright and the wood smelled of damp leaves.' },
        { e: ['🐿️', '🌲'], t: 'A red squirrel was running up and down the oak tree. It was Rusty.\n"Good morning, Pip!" called Rusty. "I hid lots of acorns for the winter. Now I cannot remember where I put them!"' },
        { e: ['🐿️', '🕳️'], t: '"Do not worry," said Pip. "I said I would help."\nRusty ran to the roots of a beech tree and dug a small hole. There was nothing in it. He looked under a {{fern|sandwich|pirate hat|banana}}. Nothing. He looked in a mossy log. Still nothing.' },
        { e: ['🐿️', '🦔'], t: '"I am a silly squirrel," said Rusty, and his tail drooped.\nPip lifted her nose and sniffed. A hedgehog has a very good nose.\n"I can smell something sweet and nutty," said Pip. "Follow me."',
          ask: { q: 'Pip finds things with her nose. What helps YOU find things?', o: [['👀', 'My eyes', 'Eyes are great for spotting things that are far away.'], ['👂', 'My ears', 'Ears are brilliant for finding things that make noise, like a ringing phone!'], ['👃', 'My nose', 'Noses are very clever. You can find a hot dinner without even looking!']] } },
        { e: ['🦔', '🌿'], t: 'Pip walked slowly through the ferns. Rusty ran along behind her, hopping over sticks. They went round a holly bush, and past the pond. At last, Pip stopped by an old tree stump.\n"Dig here," she said.' },
        { e: ['🐿️', '🌰'], t: 'Rusty dug and dug. Out came one acorn. Then two. Then ten! There was a whole pile hidden under the stump.\n"You found them!" cried Rusty. He did a happy dance on the stump, and his tail swished from side to side.' },
        { e: ['🦔', '🌰'], t: 'Rusty gave Pip three big acorns to say thank you.\n"I do not eat acorns," said Pip, "but I will keep them safe for a friend."\nJust then, a long, low grumble came from the hill. It sounded like a very big tummy.\n"What was that?" said Rusty.',
          ask: { q: 'What do you think made the grumbling sound?', o: [['😋', 'A giant tummy', 'A giant tummy would be rather noisy! Let us find out.'], ['🦡', 'A sleepy badger', 'Interesting guess! Keep reading.'], ['⛈️', 'A thunder cloud', 'It does sound like thunder. But look at the hill... keep reading!']] } }
      ],
      talk: ['How did Pip find the acorns when Rusty could not?', 'How did Rusty feel at the start? How did he feel at the end?', 'What do you think made the grumbling sound?']
    },
    {
      id: 'bramble', n: 3, title: 'Bramble Badger Is Grumpy', emoji: '🦡', tiles: ['🦡', '🍂', '🕳️'], level: 2, length: 'About 350 words',
      sky: ['#e9e4f5', '#c9bfe8'], blurb: 'A grumpy badger, a very drippy roof and two friends with an idea.',
      words: ['badger', 'grumpy', 'tunnel', 'bracken', 'enormous'],
      fact: 'Badgers live in underground homes called setts. They dig them with their big strong front claws, and a sett can have lots of tunnels and rooms.',
      pages: [
        { e: ['🏔️', '🕳️'], t: 'Pip and Rusty climbed up the hill to find out what was making the grumbling sound. At the top, there was a round hole in the ground. It was the door to a tunnel.\n"Hello?" called Pip.' },
        { e: ['🦡', '🕳️'], t: 'A big, stripy face popped out. It was Bramble the badger. His nose was twitching and his eyebrows were squashed together.\n"Go away," he growled. "I am very grumpy today."' },
        { e: ['🦡', '🐿️'], t: '"Why are you grumpy?" asked Rusty.\n"Because I am hungry," said Bramble. "And I am tired. And because I am cold."',
          ask: { q: 'Have you ever been grumpy because you were hungry or tired?', o: [['🙋', 'Yes!', 'Everybody has! Being hungry or tired can turn the nicest person grumpy.'], ['🤔', 'Sometimes', 'That is true for most of us. It helps to notice it.'], ['😇', 'Never. I am always sunny', 'Wow, a sunny person! Your grown-ups might have a different story...']] } },
        { e: ['🦡', '🌰'], t: 'Rusty looked at Pip. Pip looked at Rusty. Then Rusty held out two acorns.\n"We brought you a present," said Pip.\nBramble crunched the acorns in two big bites. His tummy stopped rumbling, and his eyebrows came apart a tiny bit.\n"Thank you," he said. "That is better. But I am still tired and cold."' },
        { e: ['🦡', '🕳️'], t: '"Can we see your home?" asked Pip.\nBramble let them in. The tunnel was long and winding. At the end was an enormous room, full of old {{furniture|jelly|trumpets|pancakes}}, and in the roof there was a big hole. Cold wind whistled through it, and a puddle was growing on the floor.' },
        { e: ['🌧️', '🦡'], t: '"The rain came in last night," sighed Bramble. "I did not sleep at all."\n"We can fix that," said Rusty. "Come on, Pip!"' },
        { e: ['🍂', '🦔'], t: 'Rusty ran outside and bit off armfuls of dry bracken. Pip rolled in the pile until her prickles were covered, then she carried the bracken in on her back. Together they pushed it into the hole, bit by bit, until the wind could not get through.\n"There," said Pip.',
          ask: { q: 'Pip used her prickles to carry the bracken. What would YOU use to plug a hole in a roof?', o: [['🛏️', 'A big pillow', 'A pillow is soft and thick. Good plan, if it does not rain on it!'], ['🥞', 'A giant pancake', 'Delicious AND waterproof? Well, maybe not waterproof. But it is a very tasty idea.'], ['🎩', 'A hat', 'A hat is a very handy roof for a very small hole!']] } },
        { e: ['🦡', '🦔'], t: 'Bramble looked up. Then he looked at the puddle, which was getting smaller. Then, very slowly, he smiled. It was a big, warm, gap-toothed smile.\n"I am sorry I was so grumpy," he said. "I did not know how to ask for help."\n"That is what friends are for," said Pip.' },
        { e: ['🦡', '🌙'], t: 'Bramble sat down in his old armchair. "When I was young, we all used to meet at the old stump at night," he said. "Everyone told stories. I miss that."\nPip and Rusty looked at each other again. They both had the same idea.',
          ask: { q: 'What idea do you think Pip and Rusty had?', o: [['🍽️', 'A supper with stories', 'Ooh, that sounds right. Everyone could meet at the stump again!'], ['🛏️', 'A pillow fight', 'A pillow fight in a badger tunnel? That would be a fluffy mess!'], ['🏃', 'A race', 'A race up the hill? Bramble might win. Those legs are strong!']] } }
      ],
      talk: ['What three things made Bramble grumpy?', 'How did Pip use her prickles to help?', 'What idea do you think Pip and Rusty had?']
    },
    {
      id: 'willow', n: 4, title: 'Willow and the Big Fog', emoji: '🐦', tiles: ['🐦', '🌫️', '🎵'], level: 3, length: 'About 400 words',
      sky: ['#e1f0f7', '#b6d8e8'], blurb: 'The smallest bird in the wood is lost in the fog, with only her song to save her.',
      words: ['wren', 'fog', 'shivered', 'silvery', 'echo', 'direction'],
      fact: 'The wren is one of the smallest birds in Ireland and Britain, but its song is one of the loudest for its size. It can sing so loudly that you can hear it far away.',
      pages: [
        { e: ['🐦', '🎵'], t: 'Willow the wren was the smallest bird in Hollybrook Wood, but she had the loudest song. When she sang, it rang through the trees like a little silver bell.' },
        { e: ['🐦', '🦉'], t: '"You are too noisy," said the old pigeons.\n"You will wake everyone up," said the sleepy owl.\nSo Willow had begun to sing more and more quietly, until one day she hardly sang at all.',
          ask: { q: 'Should Willow stop singing because others say she is too loud?', o: [['🎤', 'No! Keep singing!', 'Many people would say the same. Your own song matters.'], ['🔉', 'Sing a bit softer sometimes', 'That is a kind idea: loud when it is fine, soft when someone is sleeping.'], ['🎧', 'Give the owl ear muffs', 'Ha! Owl ear muffs. Problem solved, with a very silly hat.']] } },
        { e: ['🐦', '🕷️'], t: 'One cold morning, Willow went out to find breakfast. She hopped from branch to branch, picking up tiny {{spiders|noodles|sprinkles|buttons}} and seeds. She was so busy that she did not notice the fog.' },
        { e: ['🌫️', '🐦'], t: 'It rolled into the wood like a big, soft, grey blanket. It was so thick that Willow could not see her own wings. She could not see the trees. She could not see the holly bush where her nest was.\n"Oh dear," whispered Willow. "Which way is home?"' },
        { e: ['🐦', '🌲'], t: 'She flew a little way, and bumped into a branch. She flew the other way, and bumped into another. Her heart was thumping. She was lost.' },
        { e: ['🐦', '🎵'], t: 'Then she had an idea. She remembered something that her mother used to say: *when you cannot see, you can still be heard.*\nWillow took a deep breath. Then she sang as loudly as she could. Her song rang out, high and clear, through the grey.',
          ask: { q: 'If YOU were lost in a fog, how could you let people find you?', o: [['📣', 'Shout really loudly', 'Good idea. A loud voice travels a long way.'], ['🎶', 'Whistle or sing', 'Singing is what Willow did! Sounds can go through fog when eyes cannot.'], ['🥁', 'Bang a saucepan', 'Clang! That would certainly work. Everyone would find you AND cover their ears.']] } },
        { e: ['🐿️', '🦡'], t: 'Down below, Rusty was looking for acorns in the fog. He stopped. "That is Willow!" he said, and he shouted back, "This way!"\nPip heard the shouting and called out too. Bramble heard Pip and gave his big, deep "Hoo-ooo!" Soon the whole wood was full of voices, which rang out in the fog like a chain of echoes.' },
        { e: ['🐦', '🌫️'], t: 'Willow listened. First she heard Bramble\'s low voice, then Pip\'s, then Rusty\'s. Each one was a little bit closer. She followed them down through the silvery fog, from branch to branch, until she landed on the oak tree, right between her three friends.\n"You found me!" she chirped.' },
        { e: ['🐦', '🦔', '🐿️'], t: '"You found us," said Rusty. "Your song is the best thing in the wood."\n"I thought I was too loud," said Willow in a small voice.\n"Never," said Bramble. "Not for us."' },
        { e: ['🌿', '🦊'], t: 'On the edge of the clearing, a pair of bright eyes had been watching the whole thing. A russet-red shape slipped back into the ferns and was gone.\n"Who was that?" asked Pip.',
          ask: { q: 'Who do you think was watching from the ferns?', o: [['🦊', 'A fox', 'Russet-red is a fox colour. Good detective work!'], ['🐻', 'A bear', 'A bear would be much bigger than a fern. Look for clues!'], ['👽', 'An alien', 'An alien in Hollybrook Wood? That would be quite a story.']] } }
      ],
      talk: ['Why had Willow stopped singing so loudly?', 'How did the friends use sounds to find each other?', 'Who do you think was watching from the ferns?']
    },
    {
      id: 'fern', n: 5, title: 'Fern and the Broken Bridge', emoji: '🦊', tiles: ['🦊', '🌊', '🌉'], level: 4, length: 'About 500 words',
      sky: ['#dff3e3', '#b4e0bf'], blurb: 'The brook is rushing, the bridge is gone and a shy fox is on the wrong side.',
      words: ['fox', 'brook', 'rushing', 'current', 'sturdy', 'brave', 'narrow'],
      fact: 'Foxes have amazing hearing. A fox can hear a tiny mouse squeaking from far away. The bushy tail of a fox even has a special name: it is called a brush.',
      pages: [
        { e: ['🌊', '🐦'], t: 'The next morning, Pip, Rusty, Willow and Bramble went down to the brook. They wanted to find the russet-red shape that Willow had seen in the fog.' },
        { e: ['🌊', '🌧️'], t: 'Overnight, there had been a big storm. The little brook, which was usually quiet and shallow, was now brown and fast and noisy. The old log that everyone used as a bridge had been swept away.' },
        { e: ['🦊', '🌊'], t: 'On the other side of the water, a young fox was sitting all alone. She was watching them with big, bright eyes.\n"Hello!" called Pip, as loudly as she could. "Who are you?"' },
        { e: ['🦊', '🐿️'], t: '"I am Fern!" the fox called back. The water was so loud that she had to shout. "I live over here. I heard the singing in the fog. I wanted to say hello, but I was too shy."\n"Then come across!" said Rusty.' },
        { e: ['🦊', '🌊'], t: 'Fern shook her head. "The brook is too strong now. And there is no bridge."\nThe friends looked at the rushing water. Nobody spoke for a moment. Then Bramble rubbed his chin.' },
        { e: ['🦡', '🐦', '🐿️'], t: '"I am strong," he said, "but I cannot swim well in a current like that."\n"I can fly across," said Willow, "but I cannot carry a fox."\n"I can climb," said Rusty, "but I cannot carry a whole bridge."',
          ask: { q: 'Can YOU think of a way to get Fern across?', o: [['🌉', 'Build a bridge', 'Great idea, but the friends need something big and strong to make one.'], ['⛵', 'Make a little boat', 'A boat in a rushing brook might be wobbly! Be careful.'], ['💬', 'Ask Fern if she has an idea', 'Ooh, that is a clever answer. Let us see if Pip thinks so too.']] } },
        { e: ['🦔', '🦊'], t: 'Pip had been thinking very hard. "Fern," she called, "you know the wood on your side better than anyone. Is there a narrow place, where the brook is smaller?"\nFern\'s ears pricked up. She was good at noticing things, and nobody had ever asked her before.' },
        { e: ['🦊', '🐦'], t: '"Yes!" she called. "Upstream, past the three big stones. The brook is half as wide there. And there is a fallen birch tree beside it!"\nSo they made a plan. Willow flew up to look, and she came back chirping. "It is true! The birch tree is just long enough!"' },
        { e: ['🦡', '🌲'], t: 'Bramble marched upstream and put his big shoulder against the trunk. He pushed and pushed, and slowly, slowly, the birch tree slid over the water. It landed on the far bank with a THUMP.' },
        { e: ['🐿️', '🌉'], t: '"Now it needs tying down," said Rusty. He grabbed a long strand of {{ivy|spaghetti|bunting|a scarf}} and dashed across the trunk with it, his tail balancing him like a rope walker. On the other side, he looped the ivy round a root and pulled it tight.' },
        { e: ['🦔', '🌉'], t: 'Pip puffed up her prickles and walked across behind him, slowly and carefully. Bramble came last, step by step. The trunk creaked, but it held. It was sturdy.\nThe four friends stood together in front of Fern.' },
        { e: ['🦊', '🦔'], t: '"You are really here," said Fern, and she smiled a very small smile.\n"Come to the old stump tomorrow night," said Pip. "Bramble is having a supper. We have been planning it, and it would not be right without you."\nFern looked at the new bridge. Then she looked at her friends. Then, quite bravely, she stepped onto the log.' }
      ],
      talk: ['Why was Fern shy at the start?', 'Each friend said what they could not do. What did each one end up doing?', 'Why do you think Pip asked Fern a question instead of just giving an answer?']
    },
    {
      id: 'supper', n: 6, title: 'The Story Stump Supper', emoji: '🌙', tiles: ['🌙', '🕯️', '🍯'], level: 5, length: 'About 650 words, four chapters',
      sky: ['#d9d5f2', '#8f86c9'], blurb: 'Everyone in the wood meets at the old stump for a supper and the best stories of all.',
      words: ['supper', 'lantern', 'glowing', 'whispered', 'adventure', 'twinkled', 'favourite'],
      fact: 'People have told stories around a fire or a lantern for thousands of years. Stories helped families remember who they were, and helped children fall asleep.',
      pages: [
        { ch: 'Chapter 1: Getting ready', e: ['🐿️', '🦔', '🌰'], t: 'All day long, Hollybrook Wood was busy.\nRusty dashed up and down the trees, gathering the biggest, shiniest {{acorns|pickles|jellybeans|socks}} he could find. Pip swept the leaves off the old stump with her prickly back until the top was as smooth as a table.' },
        { e: ['🐦', '🎵'], t: 'Willow flew from branch to branch, singing a little song to everyone she met: *Come to the stump! Come to the stump! Supper at the stump tonight!*' },
        { e: ['🦡', '🍯'], t: 'Bramble was the busiest of all. He dragged a huge basket out of his tunnel, filled with jars of honey and blackberry jam and a big, round loaf of nut bread. "I have not done this for years," he said, and he whistled all the way down the hill.' },
        { e: ['🦊', '🍓'], t: 'Fern was the last to arrive. She hid behind a tree at first, until Pip pulled her gently into the light.\n"I brought something," said Fern in a quiet voice. She held out a bunch of ripe red berries, wrapped in a big green leaf. "I know where the best ones grow."\n"They are perfect," said Pip.' },
        { ch: 'Chapter 2: The supper', e: ['🕯️', '🌙'], t: 'As the sun went down, the wood turned gold, and then purple, and then deep blue. Bramble hung a lantern of glowing moss on a low branch, and its soft green light made the stump look like a little stage.' },
        { e: ['🍯', '🍞', '🍓'], t: 'The friends sat in a circle. They passed round the honey and the jam. They crunched the acorns and munched the nut bread. Fern\'s berries were the sweetest of all, and they were gone in no time.' },
        { e: ['🦡', '⭐'], t: '"This," said Bramble, patting his round tummy, "is the best supper I have had in a long, long time."\nAbove them, one by one, the stars came out.',
          ask: { q: 'What would YOU bring to the Story Stump Supper?', o: [['🍰', 'A big cake', 'Cake! Bramble would be your friend for life.'], ['😂', 'A really good joke', 'A joke is the lightest thing to carry. And the funniest.'], ['🎵', 'A song', 'Willow would love that. Songs are welcome at the stump!']] } },
        { ch: 'Chapter 3: The stories', e: ['🦡', '🕯️'], t: '"Now," said Bramble, in his deep, slow voice, "it is time for the stories. That is how we always did it. Who would like to go first?"\nRusty bounced up onto the stump straight away. He told a funny story about a squirrel who buried a nut so well that he dug up a whole {{tree|bus|castle|elephant}}. Everyone laughed until their sides hurt.' },
        { e: ['🐦', '🎵'], t: 'Willow went next. She did not tell a story. She sang one, loud and clear, about a little bird who got lost in the fog and found her way home with the help of her friends. Her voice rose up into the dark like a silver bell. Nobody told her to be quiet.' },
        { e: ['🦡', '🦊', '🌙'], t: 'Bramble told them an old, slow tale about a badger and the moon. Fern, very shyly, told them about a young fox who watched a wood from far away and wished she could join in. When she finished, everybody clapped, and she went red from the tip of her nose to the end of her tail.' },
        { e: ['🦔', '🌟'], t: 'Then it was Pip\'s turn. She climbed up onto the stump and took a deep breath.\n"This one," she said, "is my favourite. It begins like this."\n*"Pip the hedgehog lived in Hollybrook Wood. Pip was small. Pip was very tired…"*' },
        { e: ['🦔', '🌰', '🍂'], t: 'And she told them all about the cosy bed made of leaves, and the acorn that went *plop*, and the new friend who lived in the tree.' },
        { ch: 'Chapter 4: The last page', e: ['🕯️', '🐦', '🐿️'], t: 'When the stories were over, the night was quiet and the lantern was glowing softly. Willow had tucked her head under her wing. Rusty was curled up in a ball with his tail over his nose. Fern was leaning against Bramble\'s big, warm side, and she was smiling.' },
        { e: ['⭐', '🌙'], t: '"Same time next week?" whispered Bramble.\n"Yes, please," yawned Pip.\nThe stars twinkled above Hollybrook Wood. Everyone was safe, and everyone was full, and everyone belonged. And that is the end of this story, but it is never the end of the stories.' },
        { your: true, e: ['🦔', '🐿️', '🦡', '🐦', '🦊'], t: 'Now it is your turn!\nPip, Rusty, Willow, Bramble and Fern all told a story at the stump. What story would YOU tell? It could be about the wood, a new animal friend, or something else entirely.' }
      ],
      talk: ['Why do you think Bramble missed the stories at the stump?', 'Which story at the supper was your favourite? Why?', 'Which animal in the series is most like you? Why?', 'Which part of the series did you enjoy most?']
    }
  ];
  root.WA_STORIES = { all: S, byId: function (id) { for (var i = 0; i < S.length; i++) if (S[i].id === id) return S[i]; return null; } };
})(typeof window !== 'undefined' ? window : globalThis);
