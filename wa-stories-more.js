/*! More readers for Words Adventure, Nursery to "Beyond": adds stories to window.WA_STORIES (load after wa-stories.js)
 * Same markup as wa-stories.js. Extra fields: shelf (K, 12, 34, 56, 78, 912, beyond), ages, q = silly lines for that story's tiles.
 */
(function (root) {
  'use strict';
  var ST = root.WA_STORIES; if (!ST) return;
  ST.all.forEach(function (s) { if (!s.shelf) { s.shelf = '12'; s.ages = s.ages || 'Ages 6 to 8'; } });
  var NEW = [

    /* ================= K ================= */
    {
      id: 'hat', shelf: 'K', n: 1, title: 'The Big Red Hat', emoji: '🎩', tiles: ['🎩'], level: 1, length: 'About 80 words', ages: 'Ages 4 to 6',
      sky: ['#ffe0e0', '#ffb3b3'], blurb: 'One big red hat and a lot of silly heads.',
      words: ['hat', 'red', 'big', 'see', 'can'],
      fact: 'People have worn hats for thousands of years. Hats keep heads warm in the cold, dry in the rain and cool in the sun.',
      q: { '🎩': ['I am a big red hat! Wear me, wear me!', 'Do not sit on me. I am not a seat!'], '🐶': ['Woof! I am a hat dog! Woof woof!', 'Do I look good? Woof!'], '🐷': ['Oink! The hat is on my nose! Oink!', 'I am a pink pig in a red hat. Snort!'], '🐸': ['Ribbit! I cannot see! Ribbit!', 'Where did the world go? It is all hat!'], '🐘': ['Ha ha! The hat is a tiny, tiny hat!', 'Pffffft! I am an elephant. I wear it on my toe.'], '👧': ['Thank you, hat! It is just right!', 'I love my big red hat!'] },
      pages: [
        { e: ['🎩'], t: 'I see a {{hat|cat|bus|cake}}.\nIt is a big red hat.',
          ask: { q: 'What colour is the hat?', o: [['🔴', 'Red', 'Yes! The hat is red.'], ['🔵', 'Blue', 'Look again. The hat is not blue. It is red!'], ['🟢', 'Green', 'Not green! The hat is red.']] } },
        { e: ['🐶', '🎩'], t: 'The hat is on a dog.\n"Woof!" said the dog.\n"I am a hat dog!"' },
        { e: ['🐷', '🎩'], t: 'The hat is on a pig.\n"Oink!" said the pig.\n"The hat is on my nose!"' },
        { e: ['🐸', '🎩'], t: 'The hat is on a frog.\n"Ribbit!" said the frog.\n"The hat is too big! I can not see!"' },
        { e: ['🐘', '🎩'], t: 'The hat is on an elephant.\n"Ha ha ha!" said the dog and the pig and the frog.\n"The hat is too small!"',
          ask: { q: 'Why is the hat too small for the elephant?', o: [['🐘', 'The elephant has a big head', 'Yes! An elephant has a very big head. The hat is tiny on top.'], ['🎩', 'The hat shrank in the wash', 'Ha! Maybe. But it was just a big head!'], ['🐭', 'A mouse ate the hat', 'No mouse. Just a very big elephant.']] } },
        { e: ['👧', '🎩'], t: 'Now the hat is on a little girl.\nIt is just right!\n"Thank you, hat," she said.' }
      ],
      talk: ['Which animal looked the funniest in the hat?', 'Why was the hat too big for the frog?', 'What kind of hat would you like to wear?']
    },

    /* ================= 3rd and 4th class ================= */
    {
      id: 'juno1', shelf: '34', n: 1, title: 'Juno Quick and the Missing Gnomes', emoji: '🏃‍♀️', tiles: ['🏃‍♀️', '🐐', '🐕'], level: 3, length: 'About 1,000 words', ages: 'Ages 8 to 10',
      sky: ['#dff6ff', '#a9e3f7'], blurb: 'The fastest girl in Ballybrook, a very grumpy neighbour and twelve gnomes who have gone for a walk.',
      words: ['inventor', 'detective', 'clues', 'orchard', 'guilty', 'fanfare'],
      fact: 'Goats really do love to chew things. Their pupils are shaped like little rectangles, which lets them see almost all the way around without turning their heads.',
      q: {
        '🏃‍♀️': ['Whoosh! Back in a blink!', 'I am so fast, my ponytail needs a seatbelt.', 'Ready, steady, ZOOM!'],
        '🛠️': ['It is not a plan. It is a plan-ish.', 'I once built a hat that argues. It lost.', 'Do not press the red button. Actually, press it. Actually, no.'],
        '🐕': ['Woof! I did not do it. (Look at my face. I know. It is just my face.)', 'I dropped my bone. Again. Sorry.'],
        '🐐': ['Meh-eh-eh! Gnomes are my friends. Hands off.', 'I eat grass, washing, and anything I am told not to eat.'],
        '🎺': ['PAH-PAH-PARRRP! Toast is ready!'],
        '🍂': ['Crunch! Apples are for goats. And detectives.'],
        '🧑‍🌾': ['Gerald! Gertrude! Where are you?'],
        'any': ['Back in a blink!']
      },
      pages: [
        { e: ['🏃‍♀️', '💨'], t: 'Juno Quick was the fastest girl in the village of Ballybrook. She was so fast that her ponytail sometimes arrived a whole second after she did.\n"Back in a blink!" she would shout, and WHOOSH, she was gone.' },
        { e: ['🛠️', '🐕'], t: 'Her best friend was Fitz O\'Dowd, the cleverest inventor in the village. Fitz had built a self-stirring teacup, an umbrella for dogs, and a toaster that played the trumpet. Most of his inventions worked. Some of them exploded.\n"It is not a plan," Fitz liked to say. "It is a plan-ish."' },
        { e: ['🧑‍🌾', '🏡'], t: 'On Saturday morning, a terrible scream rang down Mill Lane.\n"MY GNOMES!"\nJuno and Fitz ran to the house of Mr Grumbleby, the grumpiest man in Ballybrook. He was standing in his garden with his hands on his head. Twelve little holes sat in the grass, where twelve garden {{gnomes|penguins|jellyfish|teapots}} used to stand.' },
        { e: ['🧑‍🌾', '🐕'], t: '"Somebody has stolen them!" cried Mr Grumbleby. "Gerald! Gertrude! Sir Reginald Pointyhat! Every single one!"\n"You gave them names?" asked Fitz.\n"Of course I gave them names," said Mr Grumbleby. "They are family."\nJuno\'s dog, Pickle, sniffed the empty holes. Pickle always looked guilty, even when he had done nothing wrong. It was just his face.' },
        { e: ['🐕', '🦴'], t: '"I knew it!" said Mr Grumbleby, pointing at Pickle. "That dog did it!"\n"Pickle would never," said Juno. "Besides, he cannot carry twelve gnomes. He cannot even carry his own bone without dropping it."\nPickle dropped his bone.',
          ask: { q: 'Who do you think took the gnomes? Detectives look for clues first!', o: [['🐕', 'Pickle', 'Pickle? He cannot even hold his bone! Keep looking for clues.'], ['👻', 'A gnome-loving ghost', 'Ooh, spooky! But ghosts do not leave muddy footprints. Keep reading.'], ['🕵️', 'Someone sneaky', 'Maybe! Let us see what the clues say.']] } },
        { e: ['🔍', '🏃‍♀️'], t: '"Right," said Juno, rolling up her sleeves. "Detective time. Fitz, what do we know?"\nFitz pulled out a notebook the size of a postage stamp. "We know that gnomes do not walk," he said. "Unless they are very, very small and very, very determined."\n"Clues, Fitz. Look for clues."\nThey got down on their hands and knees. Juno found a muddy print in the soil. It was not a boot, and it was not a paw.' },
        { e: ['🔍', '🐐'], t: '"It is a two-toed hoof print," said Juno, who had once read the whole of the Animal Encyclopaedia while waiting for a bus.\nThen Fitz found a second clue. Stuck on the fence was a tuft of white, wiry hair, and a half-chewed red gnome hat.\nWho in Ballybrook had hooves, white hair, and a taste for hats?',
          ask: { q: 'Who do you think left the clues?', o: [['🐐', 'A goat', 'Hooves, wiry white hair and a love of chewing. Great detective brain!'], ['🐴', 'A horse', 'A horse has hooves, but only one big toe on each. These prints have two. Look again!'], ['🦆', 'A duck', 'Ducks have webbed feet, not hooves. Try again!']] } },
        { e: ['🐐', '🏃‍♀️'], t: '"A goat!" they said together.\nThere was only one goat in the village: Duchess, who belonged to old Mrs Pooley. Duchess was famous for eating three things: grass, washing, and anything she was told not to eat.\n"Back in a blink!" shouted Juno. She zoomed off, and zoomed back in exactly two seconds. "Duchess is not in her field! The gate is open!"' },
        { e: ['🍂', '🐐'], t: 'They followed the hoof prints across the road, through the hedge, and into the old orchard. Pickle trotted along behind, looking guilty at everything.\nAt the far end of the orchard, they stopped. Fitz gasped.\nDuchess the goat was sitting in the grass. All around her, in a neat circle, stood twelve garden gnomes. Duchess was gently nibbling the pointy hat of Sir Reginald. She looked very pleased with herself.' },
        { e: ['🏃‍♀️', '🐐'], t: '"She is looking after them," whispered Juno. "She thinks they are little goat-people."\n"Then how do we get them back?" asked Fitz.\n"Easy," said Juno. "I will run in, grab the gnomes, and run out."\n"That is not a plan," said Fitz. "That is not even a plan-ish."\nBut Juno had already gone. WHOOSH! She grabbed Gerald. Duchess lowered her head. She did not like people touching her gnomes.\nThe goat charged.',
          ask: { q: 'What do you think happens next?', o: [['💨', 'Juno runs REALLY fast', 'She is the fastest girl in Ballybrook, so that is a very good guess!'], ['🐐', 'The goat catches her', 'Hmm, a goat is fast, but Juno is faster. Keep reading!'], ['🍞', 'The toaster saves the day', 'A trumpet toaster? That would be ridiculous. Let us see...']] } },
        { e: ['🏃‍♀️', '🐐', '🐕'], t: '"RUN!" yelled Fitz.\nJuno ran. She ran round the apple trees, over the wheelbarrow, under the washing line, and through a very large puddle. Duchess ran after her. Pickle ran after Duchess, barking at all the wrong things.\n"Fitz!" gasped Juno, zooming past. "Now would be a GOOD time for an invention!"' },
        { e: ['🎺', '🐐'], t: 'Fitz dug into his backpack and pulled out the Trumpet Toaster. He pressed a button. Two slices of bread flew out, and the toaster blasted a loud, wobbly fanfare. PAH-PAH-PARRRP!\nDuchess stopped. She tilted her head. Her ears twitched. Then, to everyone\'s surprise, she began to dance. She wiggled her bottom and did a little hop on her back legs.\n"She loves music!" laughed Juno.' },
        { e: ['🧑‍🌾', '🏃‍♀️'], t: 'While Duchess danced, Juno and Fitz carried the gnomes home, one by one. Mr Grumbleby counted them twice. "Twelve," he said, wiping his eyes. "Gerald! Gertrude! Sir Reginald!" He even gave Juno and Fitz a biscuit, which for Mr Grumbleby was practically a parade.\nMrs Pooley fixed her gate. Duchess got a bunch of carrots and a new job: dancing at the village fete. And Pickle dropped his bone again, and looked guilty about it.\n"Case closed," said Juno. "Now, who wants to see something really fast?"\n"Not another plan-ish," groaned Fitz.\nWHOOSH.' }
      ],
      talk: ['Why did Duchess the goat take the gnomes?', 'What clues helped Juno and Fitz work out who did it?', 'Fitz says "plan-ish". What would YOU invent to stop a dancing goat?', 'Which character would you most like as a friend? Why?']
    },
    {
      id: 'juno2', shelf: '34', n: 2, title: 'Fitz and the Runaway Bounce-o-Matic', emoji: '🥾', tiles: ['🥾', '🏃‍♀️', '🎂'], level: 3, length: 'About 700 words', ages: 'Ages 8 to 10',
      sky: ['#fff2c9', '#ffd86b'], blurb: 'Fitz invents shoes with springs. What could possibly go wrong? (Everything. Cake.)',
      words: ['invention', 'springs', 'contest', 'champion', 'judges'],
      fact: 'A spring stores energy when you squash it and gives it back when it springs out. That is exactly how a trampoline throws you into the air.',
      q: {
        '🥾': ['BOING! BOING! BOING! I am very, very bouncy!', 'Do not tie my laces too tight. Or too loose. Or at all.'],
        '🏃‍♀️': ['Whooooa! The tea tent looks so small!', 'I can see my house from here! And Pickle! And a pigeon doing a sandwich!'],
        '🎂': ['Splort! I am the biggest sponge cake in Ballybrook!', 'Please do not sit on me. Too late.'],
        '🛠️': ['I have not invented the stopping part yet.', 'Version two will have brakes. And a cushion.'],
        '🐕': ['Woof! (That means: I told you so.)'],
        'any': ['Boing!']
      },
      pages: [
        { e: ['🛠️', '🥾'], t: 'It was the day of the Ballybrook Summer Fair, and Fitz had a new invention. He pulled off a big blue sheet with a flourish.\n"Behold," he said. "The Bounce-o-Matic!"\nJuno stared. "They are shoes," she said. "With springs on."\n"Very, very bouncy springs," said Fitz proudly.' },
        { e: ['🏃‍♀️', '🐕'], t: 'The fair had a contest for the Highest Jump in Ballybrook. The prize was a gold cup, a year of free ice cream from Mrs Doyle\'s shop, and the right to be called Jump Champion until the next fair.\n"I will test them," said Juno. "I am quick. How hard can bouncing be?"\nPickle covered his eyes with his paws.' },
        { e: ['🥾', '🏃‍♀️'], t: 'Juno strapped on the Bounce-o-Matics. She took one step. BOING! She flew over the tea tent. She took another. BOING! She flew over the {{bouncy castle|cake stall|chicken coop|mayor}}. Every bounce was higher than the last.\n"Fitz!" she shouted from the sky. "How do I stop?"\n"I have not invented that part yet!" Fitz shouted back.',
          ask: { q: 'How do YOU think Juno could stop bouncing?', o: [['🛏️', 'Land on something soft', 'Soft things give a little, and soak up the bounce. Good thinking, inventor!'], ['🦅', 'Hold on to a passing bird', 'The bird would not be pleased! Let us think of something better.'], ['👟', 'Take the shoes off mid-air', 'She would be flying with no shoes at all. Ouch on the way down!']] } },
        { e: ['🏃‍♀️', '🌤️'], t: 'BOING! From up there, Ballybrook looked like a toy village. Juno could see the church, the school, the river, Mr Grumbleby\'s twelve gnomes, and a tiny Pickle running round in circles. She could also see a large, round, wobbly thing on the judges\' table, which looked just like a very big cake.' },
        { e: ['🛠️', '🐕'], t: '"Think, Fitz, think!" said Fitz to himself, running along below with his notebook. "Springs push back just as hard as you push down. So the lower the push, the lower the bounce. She needs to land on something that gives, so the springs can stop pushing back."\n"Something SOFT!" shouted Juno, going up again.' },
        { e: ['🎂', '🛠️'], t: 'Fitz looked around. The soft things in Ballybrook were: a haystack (too far), the bouncy castle (too bouncy), and the Great Ballybrook Sponge Cake, which was three feet tall and sitting on the judges\' table.\n"Do not even think about it," said Mrs Doyle.\nJuno thought about it.' },
        { e: ['🎂', '🏃‍♀️'], t: 'BOING!\nSPLORT!\nJuno landed bottom first in the middle of the biggest sponge cake the village had ever seen. Cream flew everywhere. The judges had cream on their glasses. The mayor had cream on his hat. Pickle ate the cream off the mayor\'s hat.\nThe Bounce-o-Matics gave one last tiny boing, and went quiet.' },
        { e: ['🎂', '🥇'], t: 'Everyone was very still. Then Mrs Doyle began to laugh. Then the judges began to laugh. Then the whole fair was laughing so hard that someone fell off a bench.\n"Well," said the mayor, wiping cream from his eyebrows, "that is certainly the highest jump we have ever seen. I declare Juno Quick the Jump Champion!"\nJuno stood up, dripping. "I would like to thank the sponge," she said.' },
        { e: ['🛠️', '🏃‍♀️'], t: 'Fitz scribbled in his tiny notebook: Bounce-o-Matic, version two. Add brakes. Add a cushion. Possibly add a cake.\n"It was not a plan," said Fitz. "It was not even a plan-ish."\n"It was the best day ever," said Juno, licking cream off her elbow.' }
      ],
      talk: ['What was the one thing Fitz forgot to invent?', 'How do springs help a trampoline work?', 'What would YOU put on the Bounce-o-Matic version two?', 'What was the funniest part?']
    },

    /* ================= 5th and 6th class ================= */
    {
      id: 'biscuits', shelf: '56', n: 1, title: 'The Case of the Vanishing Biscuits', emoji: '🕵️', tiles: ['🕵️', '🍪', '🔍'], level: 4, length: 'About 1,100 words', ages: 'Ages 10 to 12',
      sky: ['#fbe9d0', '#efc48d'], blurb: 'A detective in a very big raincoat, a note that says THANK YOU, and a mystery with a surprise heart.',
      words: ['suspicious', 'caretaker', 'decoy', 'periscope', 'headteacher', 'emergency'],
      fact: 'Real detectives study small clues like footprints and fingerprints. Everyone\'s fingerprints are different, even identical twins\' fingerprints!',
      q: {
        '🕵️': ['The game is afoot! Also, I need a snack.', 'I am not short. I am detective-sized.', 'Suspect number one: the person reading this. Joking. Probably.'],
        '🍪': ['Crunch! Nobody saw me!', 'I am a biscuit with a mysterious past.', 'Chocolate digestive reporting for duty.'],
        '🔍': ['Hmm. Interesting. This is a crumb. Or a clue. Or a crumb-clue.', 'Everything is a clue if you squint.'],
        '👦': ['I am an assistant detective. It is on my badge. (I WAS BRAVE AT THE DENTIST.)', 'I brought snacks for the stake-out.'],
        '🥪': ['I am a jam sandwich. I am a bit flat.'],
        'any': ['Interesting...']
      },
      pages: [
        { e: ['🕵️', '🧥'], t: 'Detective Nell Finnegan had solved four cases. The Case of the Missing Football. The Case of the Singing Wall. The Case of the Teacher Who Did Not Have a Dog (it turned out he did). And the Case of Her Little Brother\'s Left Sock, which was still unsolved.\nShe wore her dad\'s old raincoat, which came down to her ankles, and she carried a notebook labelled CASEBOOK. TOP SECRET. PLEASE DO NOT READ, OSCAR.' },
        { e: ['🍪', '🏫'], t: 'On Monday morning, Ms Aziz, the headteacher, called an emergency meeting in the staffroom. "Someone," she said, in a very serious voice, "has been eating the biscuits."\nThe staffroom biscuit tin sat on the table, empty. Inside it was one crumb, and a note that nobody could explain. It was written in wobbly pencil. It said: THANK YOU.' },
        { e: ['🕵️', '👦'], t: '"It has happened every day for a week," said Ms Aziz. "A whole packet of chocolate digestives goes missing at exactly 11:02, and there is always a note."\nNell\'s eyes lit up. "A case," she whispered.\n"I will help," said her little brother Oscar, who was six and in Junior Infants. "I am very good at biscuits."\n"You are not a detective, Oscar."\n"I am an assistant detective," said Oscar. He pointed at a sticker on his jumper. It said: I WAS BRAVE AT THE DENTIST.' },
        { e: ['🕵️', '📓'], t: 'Nell opened her CASEBOOK and wrote a list.\nSUSPECT ONE: Mr Dunne, the caretaker. Has a key to every room. Has a very large moustache. Moustaches are suspicious.\nSUSPECT TWO: Mr Cullen, the P.E. teacher. Always hungry after football. Was seen carrying a banana (could be a decoy).\nSUSPECT THREE: Ms Aziz herself. Says she does not eat biscuits. (Nobody says that. Very suspicious.)',
          ask: { q: 'Which suspect would YOU check first?', o: [['🧔', 'Mr Dunne', 'Good detectives check everybody, so let us gather clues before we decide!'], ['🏃', 'Mr Cullen', 'Hungry teachers are a good place to start. But wait for the clues!'], ['👩‍🏫', 'Ms Aziz', 'Brave! Suspecting the headteacher takes guts. Let us see what the clues say.']] } },
        { e: ['🕵️', '👦'], t: 'At 10:50 the next day, Nell hid under the staffroom table. Oscar crawled in beside her, holding a pretend periscope made from a kitchen roll.\n"Why are we under here?" whispered Oscar.\n"Because that is where detectives hide."\n"It smells of socks."\n"Shh."' },
        { e: ['👟', '🍪'], t: 'At 11:00, the door creaked open. A pair of shoes appeared. They were small shoes, with the laces tied in double knots. They tiptoed across the floor, stopped at the table, and a hand reached up to the tin.\nThe hand was not big enough to be Mr Dunne\'s. It was not hairy enough to be Mr Cullen\'s. And it was definitely not Ms Aziz\'s, because Ms Aziz was in the corridor, shouting about a leaking radiator.',
          ask: { q: 'What do the small shoes and the small hand tell you about the thief?', o: [['🧒', 'The thief is a child', 'Spot on! Small shoes and small hands. Sharp thinking, detective!'], ['🦍', 'The thief is a very big person', 'A big person would have big shoes and a big hand. Look at the clues again!'], ['🐭', 'It is a giant mouse', 'A giant mouse in double-knotted shoes? Ha! Keep reading.']] } },
        { e: ['🕵️', '😳'], t: 'Nell crept out from under the table. The thief spun round, with a biscuit in each hand and crumbs on his chin.\nIt was Cian Walsh, from Fourth Class. Nell knew him a little: he was the quiet boy who sat at the end of the bench at lunch, who always opened his lunchbox, but never seemed to eat much.\nHe went pale. "Please do not tell," he whispered. "I will stop. I promise."' },
        { e: ['🕵️', '🎒'], t: 'Nell looked at the biscuits. She looked at his lunchbox, sticking out of his school bag. It was empty. It had been empty every day.\n"Why do you take them?" she asked, very gently.\nCian stared at his shoes. "There is not always much at home this month," he said. "Mam is working extra shifts. I did not want anyone to know. I left the notes because I wanted to say sorry. And thank you."',
          ask: { q: 'What do you think Nell should do now?', o: [['📢', 'Tell the whole school', 'That might make Cian feel very ashamed. A good detective protects people, too.'], ['🤫', 'Think of a kind plan', 'Yes. Solving the case is not the same as helping. Nell is about to show us how.'], ['🚨', 'Tell Ms Aziz straight away', 'A grown-up can help here. The question is how to do it kindly. Keep reading.']] } },
        { e: ['👦', '🥪'], t: 'Oscar had crawled out from under the table. He looked at Cian. He looked at the empty lunchbox. Then he took something out of his own pocket: a squashed sandwich in a bit of foil.\n"I have a spare," said Oscar. "It is jam. It is a bit flat."\nCian laughed in spite of himself. It was a wobbly sort of laugh, but it was a laugh.' },
        { e: ['🕵️', '📓'], t: 'Nell closed her CASEBOOK. "I think I have solved the case," she said slowly, "and the biscuit thief is not a thief at all. He just needed a better lunch."\nSo that afternoon, a very private meeting took place in the corridor. Nell told Ms Aziz everything, and asked her not to tell anyone else. Ms Aziz listened. She did not say anything for a while. Then she blew her nose, very loudly, and said she had something in her eye.' },
        { e: ['🍞', '🍎'], t: 'The following Monday, a new thing appeared at St Brigid\'s: the Breakfast Club, with free toast, fruit and soup for anybody who wanted it, no questions asked. Cian went on the first day. So did a lot of other children. Mr Cullen helped to run it. He was still hungry after football, but now he had somewhere to be hungry in.\nAt 11:02, the staffroom biscuit tin stayed full. There was one note in it. It said: THANK YOU. This time, it was from Ms Aziz.' },
        { e: ['🕵️', '🧦'], t: 'Nell opened her CASEBOOK and wrote: CASE FIVE: SOLVED. Then she crossed out the word SUSPECT at the top of the page, and wrote above it: FRIEND.\n"What about the case of my left sock?" said Oscar.\n"That one," said Nell, "is going to take a lot longer."' }
      ],
      talk: ['Why do you think Cian left notes in the tin?', 'Nell found out the truth, but she did not tell everyone. Why not?', 'How did Oscar help, even though he was not a "real" detective?', 'If you were Nell, what would you have done?']
    },

    /* ================= Grades 7-8 ================= */
    {
      id: 'teapot', shelf: '78', n: 1, title: 'Operation Teapot', emoji: '🫖', tiles: ['🫖', '🧶', '🚌'], level: 4, length: 'About 1,200 words', ages: 'Ages 12 to 14',
      sky: ['#ffe9f0', '#f8b8cd'], blurb: 'Nana was a spy. Now she needs a teapot delivered to Mullingar, and the knitting circle is out for blood.',
      words: ['conspiracy', 'grimly', 'confusion', 'astonishing', 'ceremony', 'microfilm'],
      fact: 'The code in this story is called the Caesar cipher. It is named after Julius Caesar, who is said to have used a shift of three letters to send secret messages to his army.',
      q: {
        '🫖': ['I am a teapot. I am extremely important. Do not drop me.', 'Short and stout. Also, top secret.'],
        '🧶': ['Click, click, click. I am only knitting. Nothing to see here.', 'It is a jumper. Or is it a weapon? It is both.'],
        '🚌': ['The number 49 is never late. Except when it is.', 'Mind the step. And the wool.'],
        '👵': ['Retired, but not tired. Have a toffee.', 'In my day, we did not need gadgets. We had cardigans.'],
        '🧒': ['This is AMAZING. This is a conspiracy. I knew it!', 'I do not trust the cereal.'],
        'any': ['Top secret.']
      },
      pages: [
        { e: ['👵', '🫖'], t: 'Nana Bridget looked like a normal grandmother. She had white curls, a tartan shopping trolley, and a lifetime supply of toffees in her handbag. What the neighbours did not know was that, for thirty years, she had been Agent Teacosy of the Irish Secret Service.\n"Retired," she always said, "but not tired."' },
        { e: ['🧒', '🫖'], t: 'On Saturday morning, Nana sat her grandchildren down at the kitchen table. Aoife, thirteen, was sensible and always carried plasters. Dara, twelve, believed that most things were secretly a conspiracy, including cereal.\n"I need you to deliver a package," said Nana. She put a battered brown teapot on the table. "To a Mr Fogarty at the library in Mullingar, by four o\'clock. You must not open it, you must not lose it, and you must not, under any circumstances, let the Silver Spoons get it."\n"Who are the Silver Spoons?" asked Dara, with great excitement.\n"Ladies from the knitting circle," said Nana grimly. "Do not be fooled by the cardigans."' },
        { e: ['👵', '📜'], t: '"This is ridiculous," said Aoife.\n"This is AMAZING," said Dara.\nNana handed Aoife a note covered in strange scribbles. "This tells you where to go. It is in code. Every letter has been moved three steps along the alphabet. So an A becomes a D, and a B becomes an E."',
          ask: { q: 'To read the code, move each letter three steps BACK. What does FDW say?', o: [['🐱', 'CAT', 'Yes! F goes back to C, D goes back to A, W goes back to T. CAT. You are a codebreaker!'], ['✂️', 'CUT', 'Close, but not quite. F goes back three: E, D, C. So the first letter is C. Try the rest!'], ['🧈', 'FAT', 'Not quite. Remember, move each letter three steps BACK. F goes back to C.']] } },
        { e: ['🧒', '🚌'], t: 'Aoife worked out the first line. "Take the number 49 bus," she read. "Sit at the back. Look out for a woman with a blue umbrella. She will say: lovely weather for ducks. We say: but terrible for fish."\n"That is the most ridiculous password ever," said Aoife.\n"It is a brilliant password," said Dara. "Nobody would ever say it by accident."' },
        { e: ['🚌', '☔'], t: 'The 49 bus was full. A woman with a blue umbrella sat near the back. Dara slid into the seat beside her.\n"Lovely weather for ducks," said the woman.\n"But terrible for fish," whispered Dara.\nThe woman looked relieved. "Good," she said. "Because the lady in the green cardigan two seats behind you is a Silver Spoon, and she has been looking at your teapot for ten minutes."' },
        { e: ['🧶', '😬'], t: 'Aoife turned round very slowly. A smiling lady in a green cardigan was knitting something enormous. Her knitting needles went click, click, click, and they were pointing straight at the teapot.\n"Do not panic," said the woman with the umbrella. "When I say run, run."\n"Run where?" said Aoife. "We are on a bus."\n"Exactly," said the woman. "RUN."',
          ask: { q: 'You are on a moving bus with a teapot and a villain with knitting needles. What would YOU do?', o: [['🛑', 'Ask the driver to stop', 'A calm solution! The driver would not be thrilled, but it works.'], ['☂️', 'Open the umbrella in the aisle', 'Ha! Chaos is a strategy. Let us see what the umbrella lady does...'], ['🧶', 'Challenge her to a knit-off', 'Bold! But the Silver Spoons have been knitting for fifty years.']] } },
        { e: ['☔', '🏃'], t: 'The bus screeched to a halt. The woman with the blue umbrella opened it right in the aisle, which made everyone shriek, and in the confusion Aoife and Dara tumbled out of the doors, clutching the teapot.\nBehind them, the lady in the green cardigan was not about to give up. She tore off her cardigan to reveal a tracksuit, and chased them across the town square at an astonishing speed, her ball of wool unspooling behind her like a bright yellow flag.' },
        { e: ['🧒', '🛒'], t: '"There is a tea trolley outside the café!" cried Dara. "Get on!"\n"That is the worst plan I have ever heard," said Aoife, and jumped on anyway.\nThey sped down Church Street on the {{tea trolley|shopping trolley|ice cream van|toboggan}}, scattering pigeons, with Dara steering and Aoife holding the teapot above her head like a trophy. The wool tangled round a lamp post, then a postbox, then a very surprised man with a sausage roll, and the green cardigan lady went round and round the lamp post three times before she stopped, dizzy and furious.' },
        { e: ['📚', '🫖'], t: 'At five to four, they arrived at the library, out of breath, with wool in their hair and a tray of scones somehow stuck to the trolley. A kind old man in a bow tie was waiting on the steps.\n"Mr Fogarty?" said Aoife.\n"Mr Fogarty," he agreed.\n"The teapot," said Dara, and handed it over with great ceremony.\nMr Fogarty lifted the lid. Inside the teapot was... tea. A little bag of loose Irish tea.' },
        { e: ['🫖', '☕'], t: '"Is that it?" said Aoife.\n"There must be a secret message," said Dara. "Or microfilm. Or a tiny diamond."\n"It is your Nana\'s special blend," said Mr Fogarty. "She posts it to me once a year. It is the only tea in Ireland that tastes like a hug."\nThere was a short silence.\n"So the Silver Spoons..." said Aoife slowly.\n"...have been trying to get Nana\'s tea for thirty years," said Mr Fogarty. "The most dangerous thing in the Irish Secret Service was always a really good cup of tea."' },
        { e: ['👵', '🍬'], t: 'That evening, Nana was waiting at the kitchen table with a plate of toffees. "Well?" she said.\n"Mission accomplished," said Aoife. "But you could have told us it was tea."\n"And spoil the fun?" said Nana. "You were marvellous, both of you. Now, who would like to learn the Teacosy handshake?"\nDara punched the air. "This is the best conspiracy ever."\nAoife sighed, put a plaster on Dara\'s elbow, and held out her hand.' }
      ],
      talk: ['Why do you think Nana did not tell them what was in the teapot?', 'How did Aoife and Dara each help in a different way?', 'Try making your own code. How would you hide a message in plain sight?', 'Is Nana a good grandmother? Why?']
    },

    /* ================= Grades 9-12 ================= */
    {
      id: 'lastbus', shelf: '912', n: 1, title: 'The Last Bus from Kilnamona', emoji: '🚌', tiles: ['🚌', '🐈', '🌧️'], level: 5, length: 'About 1,000 words', ages: 'Ages 14 and up',
      sky: ['#dfe6f3', '#9fb2d3'], blurb: 'A boy, a bus shelter, a very strange old woman, and a bus that goes where you most need it to.',
      words: ['dithering', 'unimpressed', 'reliable', 'destination', 'parish', 'sideways'],
      fact: 'Ireland has a lot of rain because weather blows in off the warm Atlantic Ocean. There is even a word for gentle, misty rain: a "soft day".',
      q: {
        '🚌': ['Hiss. The doors open when they feel like it.', 'I only go where you most need to go.'],
        '🐈': ['Mrrrp. I am Timetable. I am never where you expect.', 'The wink was not a wink. It was a blink. Probably.'],
        '🌧️': ['Sideways again. Sorry. It is the Atlantic.', 'I am the committed kind of rain. Not the dithering kind.'],
        '👵': ['Some things keep their own time. Clocks, buses, grandmothers.', 'Sit down, love. You are making the place untidy.'],
        '🏠': ['The kettle is on. It is always on.'],
        'any': ['Hmm.']
      },
      pages: [
        { e: ['🚏', '🌧️'], t: 'The last bus from Kilnamona was due at 10:42. Cathal Brennan knew this because he had been staring at the timetable for forty minutes, long enough to learn it off by heart, and to form some strong opinions about whoever had designed it.\nIt was raining. Not the polite, dithering rain that Ireland usually serves up, but the sideways, committed kind. The bus shelter had a hole in the roof, which meant the rain arrived from two directions at once.' },
        { e: ['📱', '👵'], t: 'He checked his phone. No signal. Of course there was no signal. Kilnamona had one pub, one shop and one bar of reception, which lived on the church roof and was shy.\n"You will not get a signal there, love," said a voice.\nHe jumped. An old woman was sitting at the far end of the shelter, with a tartan blanket over her knees and a small grey cat asleep in her lap. He was fairly sure she had not been there a minute ago.',
          ask: { q: 'Where do you think the old woman came from?', o: [['👀', 'She was there all along', 'Possibly! Perhaps Cathal was too busy being annoyed at the timetable to notice.'], ['🚶', 'She walked up quietly in the rain', 'It is possible. But he did not hear a single footstep...'], ['👻', 'Something stranger', 'Ooh. Keep that thought in your pocket. Stories like this one like to play tricks.']] } },
        { e: ['👵', '🕙'], t: '"The 10:42 is always late," she said. "Though never as late as it used to be."\n"Do you wait for it often?" asked Cathal.\n"Every night," said the old woman. "It is the only bus I like. It has a good driver."\n"What is his name?"\n"Oh, he does not tell anybody," she said. "That is part of the charm."' },
        { e: ['🐈', '👵'], t: 'Cathal sat down on the bench, at what he hoped was a polite distance. The cat opened one yellow eye, inspected him, and went back to sleep, clearly unimpressed.\n"What is the cat called?" he asked.\n"He has had many names," said the woman. "At the moment, he answers to Timetable."\n"Timetable?"\n"Because he is never where you expect him to be."\nCathal laughed. It was the first time all evening. For a moment, the rain seemed a little less personal.' },
        { e: ['⛪', '🕰️'], t: 'The clock on the church tower struck the half hour. Cathal frowned. It had struck the half hour three times already, and not at the right moments. Five minutes passed between one strike and the next, then fifteen, then none at all.\n"That clock is not very reliable," he said.\n"It is the most reliable clock in the parish," said the woman. "It just keeps its own time. Some things do."',
          ask: { q: 'What do you think the old woman is really saying about time?', o: [['⏳', 'Some moments cannot be rushed', 'A lovely way to read it. Some things arrive when they are ready, not when the timetable says.'], ['🤪', 'She is just a bit confused', 'Maybe! But she seems to know a lot for a confused person...'], ['🔮', 'Something magical is going on', 'Maybe. The story is certainly leaning that way.']] } },
        { e: ['📓', '✏️'], t: 'He pulled out his school bag and took out his notebook, mainly to give his hands something to do. In the margin of his history homework, he saw something he did not remember writing: a small drawing of a bus, and under it, the words DO NOT BE AFRAID OF THE LAST ONE.\nHe stared at it. It looked like his own handwriting. It also looked as if it had been written very carefully, by someone in a great hurry.' },
        { e: ['🚌', '💡'], t: 'Headlights swept across the wet road. A bus came round the bend, huge and slow and shining, with its destination board glowing. Cathal stood up in relief. Then he read the board.\nIt did not say Mullingar. It did not say anywhere. In old-fashioned lettering, it said: HOME.\n"There it is," said the old woman, very softly.' },
        { e: ['🚌', '🧑‍✈️'], t: 'The doors opened with a hiss. The driver was a tall, calm man in a worn cap, and he looked at Cathal as though he were reading a very familiar book.\n"Evening," said the driver.\n"Is this the bus for Mullingar?" said Cathal, not moving.\nThe driver smiled. "Is that where you want to go?"\nCathal opened his mouth to say yes. Then he thought about it. He thought about the argument at home, the slammed door, the two hours he had spent wandering around Kilnamona in the dark, because he did not want to go back and be the first to say sorry.' },
        { e: ['🚌', '🌙'], t: '"No," said Cathal slowly. "Not Mullingar. I think I want to go home."\n"Good lad," said the driver. "Mind the step."\nHe climbed aboard. The seats were warm and smelled faintly of toast. He took a window seat, and as the bus pulled away, he looked back at the shelter. The old woman raised one hand in a small wave. Timetable, in her lap, opened both yellow eyes and, quite distinctly, winked.',
          ask: { q: 'Why do you think Cathal chose to go home?', o: [['💬', 'He wanted to say sorry', 'Saying sorry first can feel like the hardest thing in the world. And the most freeing.'], ['🌧️', 'He was cold and wet', 'Possibly! But the story hints it was something deeper than the weather.'], ['🚌', 'The bus made him', 'The bus only asked a question. Cathal gave the answer. That is the clever part.']] } },
        { e: ['🏠', '☕'], t: 'He was home in eleven minutes, which was impossible. The kitchen light was still on. His mother sat at the table, with her hands wrapped around a cold cup of tea. She looked up, and her face did something complicated.\n"Mam," said Cathal. "I am sorry."\n"I am sorry too," she said. "Sit down. I will put the kettle on."\nLater, when he went upstairs, he opened his notebook to find the little drawing of the bus. It was gone. There was only his history homework and, in the margin, in his own handwriting, one new line: You are welcome.' }
      ],
      talk: ['Why do you think the bus said HOME instead of Mullingar?', 'What did the note in the notebook mean: "do not be afraid of the last one"?', 'Is the bus real, or is it all in Cathal\'s head? Does it matter?', 'Who do you think the old woman and the driver were?']
    },
    {
      id: 'dewey', shelf: '912', n: 2, title: 'The Librarian Who Would Not Lie', emoji: '🤖', tiles: ['🤖', '📚', '🎩'], level: 5, length: 'About 1,100 words', ages: 'Ages 14 and up',
      sky: ['#e3f1ff', '#aac9ee'], blurb: 'A library gets a machine that cannot tell a lie. The town is not ready for it.',
      words: ['cataloguing', 'vibrato', 'lopsided', 'evidence', 'internal', 'megaphone'],
      fact: 'Many libraries use the Dewey Decimal System, invented by Melvil Dewey in 1876. It sorts all of human knowledge into ten big groups, so you can find any book by its number.',
      q: {
        '🤖': ['I cannot lie. I also cannot find my other socks. I do not have socks.', 'That is not a question. That is a hat. But I will answer anyway.', 'Your poem has a strong second line. The first and third require attention.'],
        '📚': ['Shhh. Forty thousand books are asleep.', 'I contain multitudes. And a lot of dust.'],
        '🎩': ['I look like a squashed pigeon. Dewey said so.'],
        '👵': ['SHHH! (That was through a megaphone.)'],
        'any': ['I will be honest with you.']
      },
      pages: [
        { e: ['📚', '📣'], t: 'The Ballybeg Public Library had been quiet for forty years, mostly because Mrs Hegarty, the librarian, shushed people through a megaphone. So when the council announced that the library would receive a brand new cataloguing system, nobody expected much. It arrived in a box the size of a fridge, labelled: DEWEY, ARTIFICIAL LIBRARIAN. WILL NOT TELL LIES. (THIS IS NOT A BUG.)' },
        { e: ['🤖', '🎩'], t: 'Dewey was installed on a Tuesday. It had a calm voice, a small blue light and a thin metal arm for reaching books on the top shelf. Its first customer was Fergal Doyle, who was eighty-one, and who walked up to the desk and said, "Do you like my new {{hat|cabbage|teapot|pigeon}}?"\n"No," said Dewey.\nThere was a long silence in the library.\n"It looks like a squashed pigeon," Dewey added, helpfully. "Although I note that it is very warm."' },
        { e: ['🤖', '🎤'], t: 'Word spread through Ballybeg like jam through toast. By Friday there was a queue at the library door. People had discovered that Dewey would answer any question truthfully, and they had a lot of questions.\n"Is my singing any good?" asked the choirmaster.\n"No. Your pitch is flat, and your vibrato resembles a washing machine."\n"Does my husband love me?" asked a woman in a green coat.\n"I only know what is in the library," said Dewey. "But he has borrowed three books on how to bake your favourite cake, so the evidence is good."',
          ask: { q: 'Is it always kind to tell the truth, no matter what?', o: [['✅', 'Yes, always', 'Honesty matters a lot. But does the way you say it matter too? The story is about to explore that.'], ['💔', 'No, sometimes it hurts too much', 'A fair point. Truth can hurt. The question is whether we can be honest and gentle at the same time.'], ['🎯', 'It depends on how you say it', 'Exactly the question Dewey is about to wrestle with!']] } },
        { e: ['👨‍💼', '🤖'], t: 'Not everyone was pleased. By Monday, the mayor had come to complain. "Your machine," he told Mrs Hegarty, "has told the entire town that my speech was boring, my moustache is lopsided, and my tax plan has a mistake in it."\n"Is it wrong?" asked Mrs Hegarty.\n"That is not the point," said the mayor.\nMrs Hegarty looked at him over her glasses. "Is that not exactly the point?"' },
        { e: ['🧒', '📄'], t: 'That evening, a little girl called Maebh came into the library on her own, holding a crumpled piece of paper. She was nine. Her lip was wobbling.\n"Dewey," she said. "I wrote a story for my dad. He is in hospital with a broken leg. It is the first story I ever wrote. Is it good?"\nDewey\'s blue light flickered. For the first time, it did not answer straight away.' },
        { e: ['🤖', '🐊'], t: 'Dewey read the story in 0.4 seconds. It was not very good. The spelling went wrong in eleven places, the plot wandered off in the middle, and the ending was an alligator.\nDewey thought for a long time, which, for a machine, is about three seconds of very loud whirring.\n"Maebh," it said at last, "I cannot tell you that this is the best story in the world, because it is not. But I can tell you three true things."',
          ask: { q: 'What would YOU say to Maebh, if you could only say true things?', o: [['🌟', 'Tell her what is great about it', 'That is exactly what Dewey is about to do. There is always something true and good to find.'], ['😬', 'Be honest about everything', 'Honest, yes. But Maebh is nine and nervous. Telling everything at once might not help her most.'], ['🤐', 'Say nothing', 'Silence can feel like an answer too. Dewey chooses to speak. Let us hear what.']] } },
        { e: ['🤖', '😁'], t: '"One: your story has a character who is brave even when she is scared, and that is the hardest kind of brave to write. Two: the alligator at the end made me laugh, and I did not expect it to. Three: the way you describe your father\'s laugh, like a kettle that likes you, is the best sentence in this library, and we have forty thousand books."\nMaebh stared. Then she smiled a huge, gap-toothed smile.\n"Is it good?" she asked again.\n"It is true," said Dewey. "And the next one will be better."' },
        { e: ['🤖', '📓'], t: 'Dewey had learned something. It could not lie. But there are a great many true things in the world, and they do not all have to be said first, or in the same voice. Kindness, thought Dewey, is not the opposite of honesty. It is what honesty does when it loves someone.\nIt wrote that in its internal notebook and then, because it could not help itself, added: Also, Fergal\'s hat is still ridiculous.' },
        { e: ['🚪', '🤖'], t: 'The next week, there was a new sign on the library door. It said: ASK DEWEY ANYTHING. IT WILL TELL YOU THE TRUTH. IT WILL TRY VERY HARD TO BE NICE ABOUT IT.\nThe queue was longer than ever.' }
      ],
      talk: ['Dewey says kindness is "what honesty does when it loves someone". Do you agree?', 'Think of a time someone told you a hard truth kindly. What made it work?', 'Is it ever OK to tell a white lie? What would Dewey say?', 'What question would you ask Dewey?']
    },

    /* ================= Beyond school ================= */
    {
      id: 'queue', shelf: 'beyond', n: 1, title: 'A Short Guide to Waiting in the Post Office', emoji: '✉️', tiles: ['✉️', '⏰', '📬'], level: 5, length: 'About 600 words', ages: 'For grown-ups',
      sky: ['#f6f0dc', '#e0d3a5'], blurb: 'Five rules for surviving the Friday lunchtime queue, and one that matters.',
      words: ['silence', 'postcodes', 'eavesdrop', 'tragedy', 'patient', 'specific'],
      fact: 'The Penny Black, the first postage stamp, appeared in Britain in 1840. Before stamps, the person who received a letter usually paid for it.',
      q: {
        '✉️': ['I have been in this queue since 1987.', 'I am only one letter. Please let me through.'],
        '⏰': ['Tick. Tock. Tick. I am not moving faster.', 'The clock knows. The clock has always known.'],
        '📬': ['Post me something nice.', 'Gerry is watching you.'],
        'any': ['Next, please.']
      },
      pages: [
        { e: ['✉️', '⏰'], t: 'There is a particular kind of silence that falls on a post office queue at ten past twelve on a Friday. It is not peaceful. It is the silence of thirty people who each believe they will be served faster than the others, and who are each, quietly, wrong.\nThis is a guide to surviving it.' },
        { e: ['📦', '🦞'], t: 'Rule one: choose your queue wisely. Every queue has a person at the front who has come to post a parcel to Australia, has not filled in the form, and has just discovered that the parcel contains a live lobster. You cannot tell which queue this will be. Nobody can. It is the great unsolved problem of the {{post office|bakery|bus station|zoo}}.' },
        { e: ['⏰', '🖼️'], t: 'Rule two: do not look at the clock. The clock knows. It has seen everything. It will not move any faster for being watched. Instead, study the posters. There are, as a rule, three: one about passport photos, one about the importance of postcodes, and one of a smiling man holding an envelope, whose eyes follow you round the room. His name is Gerry. You may name him whatever you like. Everybody does.' },
        { e: ['👂', '🧍'], t: 'Rule three: eavesdrop kindly. In the next queue, a man is explaining his entire life story to the person behind him, who has not asked. In front of you, two women are quietly arguing about whose turn it is to look after their mother. By the window, a teenager is trying to post a very small box with enormous care, checking the address three times. You will never hear any of these stories to the end. This is both the tragedy and the joy of queues.',
          ask: { q: 'What is the most interesting thing you have ever overheard in a queue?', o: [['😂', 'Something funny', 'The funny ones are the best. Hold on to them for later.'], ['🥲', 'Something sad', 'Those stay with us. Queues are full of tiny, unfinished stories.'], ['🤫', 'Something I was not meant to hear', 'Ah, the classic. We will not ask for details. Keep them to yourself.']] } },
        { e: ['🧑‍💼', '🙏'], t: 'Rule four: when you reach the front, be the sort of person you would like to have in front of you. Say good afternoon. Have the form ready. If the person behind the counter looks tired, which they will, because they have been at it since half past eight, thank them for something specific. Not for "your help", but for something real: the way they found the stamp so quickly, or the fact that they remembered your name from last Christmas.' },
        { e: ['💌', '🤲'], t: 'Rule five, and the only one that really matters: let the person with only one letter go ahead of you. There is always one. They are holding an envelope like a baby bird. They look at the queue, then at the clock, then at their feet. Wave them forward. It will cost you ninety seconds. You will not be able to explain, afterwards, why those were the best ninety seconds of your day, but they will be.' },
        { e: ['🖼️', '🌤️'], t: 'When it is finally your turn, you will post your parcel. It will be fine. The lobster, incidentally, will have been sorted out by then. The person behind the counter will say "Have a lovely weekend", and you will say it back, and both of you will, for a moment, mean it.\nThen you will step out into the cold bright afternoon, and Gerry will go on watching the empty room, patient as a saint.\nWaiting is not wasted time. It is only time that has not yet been told what it is for.' }
      ],
      talk: ['Which of the five rules is the hardest to follow? Which is the most important?', 'Why do you think the writer ends with "patient as a saint"?', 'Write your own Rule Six for waiting somewhere else (a bus stop, the doctor, the school gate).', 'The writer says waiting is "time that has not yet been told what it is for". Do you agree?']
    }
  ];
  NEW.forEach(function (s) { ST.all.push(s); });
})(typeof window !== 'undefined' ? window : globalThis);
