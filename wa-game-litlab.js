/*! Words Adventure game: Lit Lab (literary devices, tone, irony, rhetoric) - needs wa-games.js + wa-game-kit.js
 * All example text is original. Data tables below: concept -> list of examples ([text, highlighted phrase?] or text).
 */
(function (root) {
  'use strict';
  var WAG = root.WAGames, K = WAG && WAG.kit;
  if (!K) throw new Error('Load wa-games.js and wa-game-kit.js before wa-game-litlab.js');

  /* ---------- explanations (one short teaching line per concept) ---------- */
  var EXP = {
    'Simile': "'like' or 'as' compares two things: a simile.",
    'Metaphor': "It says one thing IS another, with no 'like' or 'as': a metaphor.",
    'Alliteration': 'The same starting sound repeats in nearby words: alliteration.',
    'Onomatopoeia': 'The word sounds like the noise it names: onomatopoeia.',
    'Personification': 'A non-living thing acts like a person: personification.',
    'Hyperbole': 'A huge exaggeration for effect: hyperbole.',
    'Idiom': 'A set phrase whose meaning is not its literal words: an idiom.',
    'Oxymoron': 'Two opposite words side by side: an oxymoron.',
    'Imagery': 'Words that paint a picture for the senses: imagery.',
    'Understatement': 'It makes something big sound small: understatement.',
    'First person': "'I' and 'my' show the narrator is in the story: first person.",
    'Third person limited': 'It tells one character’s thoughts only: third person limited.',
    'Third person omniscient': 'The narrator knows many minds, even the future: third person omniscient.',
    'Person vs. person': 'Two characters struggle against each other: person vs. person.',
    'Person vs. self': 'The struggle is inside the character’s own mind: person vs. self.',
    'Person vs. nature': 'The character struggles with weather or wild places: person vs. nature.',
    'Person vs. society': 'The character struggles against a rule or the crowd: person vs. society.',
    'Sarcastic': 'Saying the opposite to mock or tease is a sarcastic tone.',
    'Nostalgic': 'Longing for happy times in the past is a nostalgic tone.',
    'Hopeful': 'Expecting things to turn out well is a hopeful tone.',
    'Anxious': 'Worry and nerves make an anxious tone.',
    'Humorous': 'Playful, funny details make a humorous tone.',
    'Bitter': 'Lasting resentment over unfair treatment is a bitter tone.',
    'Calm': 'Gentle, steady words make a calm tone.',
    'Urgent': 'Short commands and a ticking clock make an urgent tone.',
    'Peaceful': 'Quiet, soft details make a peaceful mood.',
    'Tense': 'Waiting and danger make a tense mood.',
    'Joyful': 'Cheering, laughing and music make a joyful mood.',
    'Gloomy': 'Grey, cold, empty details make a gloomy mood.',
    'Mysterious': 'Unexplained happenings make a mysterious mood.',
    'Lonely': 'Being left out and alone makes a lonely mood.',
    'theme': 'A theme is a lesson or message; the others are a topic, plot or one detail.',
    'Verbal irony': 'The speaker says the opposite of what is true: verbal irony.',
    'Situational irony': 'What happens is the opposite of what was expected: situational irony.',
    'Dramatic irony': 'The reader knows something the character does not: dramatic irony.',
    'Ethos (credibility)': 'It leans on who is speaking and why to trust them: ethos.',
    'Pathos (emotion)': 'It aims at the heart and feelings: pathos.',
    'Logos (logic and evidence)': 'It uses numbers, facts and reasoning: logos.',
    'Ad hominem': 'It attacks the person, not the argument: ad hominem.',
    'Straw man': 'It twists the other side into something easier to knock down: straw man.',
    'False dilemma': 'It offers only two options when more exist: false dilemma.',
    'Slippery slope': 'It claims one small step must lead to a disaster: slippery slope.',
    'Bandwagon': 'It says it is right because everyone does it: bandwagon.',
    'Hasty generalization': 'It judges a whole group from one or two cases: hasty generalization.',
    'Appeal to authority': 'It trusts a famous voice that is not an expert on this: appeal to authority.',
    'Circular reasoning': 'The conclusion is used as its own proof: circular reasoning.',
    'Red herring': 'It changes the subject to dodge the question: red herring.',
    'Anaphora': 'The same opening words repeat at the start of lines: anaphora.',
    'Antithesis': 'Opposite ideas are set side by side: antithesis.',
    'Rhetorical question': 'A question asked for effect, not for an answer: a rhetorical question.',
    'Parallelism': 'Matching grammar in a list gives rhythm: parallelism.',
    'Euphemism': 'A gentler word replaces a harsh one: euphemism.',
    'Allusion': 'A quick nod to a well-known story or figure: allusion.'
  };

  /* ---------- data: figures of speech ---------- */
  var SIM = [
    ['The snow was as soft as a feather pillow.', 'as soft as a feather pillow'],
    ['Her laughter bubbled like a fizzy drink.', 'like a fizzy drink'],
    ['The old truck rattled down the lane like a sleepy bear.', 'like a sleepy bear'],
    ['He was as quiet as a mouse during the test.', 'as quiet as a mouse'],
    ['The stars glittered like tiny lanterns in the dark sky.', 'like tiny lanterns'],
    ['The baby curled up like a warm kitten.', 'like a warm kitten'],
    ['Her hands were as cold as ice.', 'as cold as ice'],
    ['The runner moved like a gazelle across the field.', 'like a gazelle'],
    ['The cat lay on the rug like a furry scarf.', 'like a furry scarf'],
    ['Her smile was as bright as a new coin.', 'as bright as a new coin'],
    ['The traffic crawled like a line of ants.', 'like a line of ants'],
    ['The cake was as light as a cloud.', 'as light as a cloud'],
    ['Fog hung over the lake like a grey blanket.', 'like a grey blanket'],
    ['The dancers spun like petals in a breeze.', 'like petals in a breeze']
  ];
  var MET = [
    ['The classroom was a beehive of constant chatter.', 'a beehive of constant chatter'],
    ['My little brother is a tornado in the kitchen.', 'a tornado in the kitchen'],
    ['Her singing is honey on a quiet night.', 'honey on a quiet night'],
    ['The library is a treasure chest of stories.', 'a treasure chest of stories'],
    ['Memory is an attic crowded with dusty boxes.', 'an attic crowded with dusty boxes'],
    ['The moon was a silver coin in the dark pocket of night.', 'a silver coin'],
    ['Dad’s old car is a snail on every hill.', 'a snail on every hill'],
    ['The playground at noon is an ocean of shouting.', 'an ocean of shouting'],
    ['The test was a mountain I had to climb.', 'a mountain I had to climb'],
    ['Our teacher is a walking dictionary.', 'a walking dictionary'],
    ['Grandma’s soup is liquid gold.', 'liquid gold'],
    ['His heart is a locked door.', 'a locked door'],
    ['The city at night is a field of glowing jewels.', 'a field of glowing jewels'],
    ['Homework is a stone in my backpack.', 'a stone in my backpack'],
    ['The sea at dawn is a sheet of hammered silver.', 'a sheet of hammered silver']
  ];
  var ALL = [
    ['Brave baby bears bounced behind the barn.', 'Brave baby bears bounced'],
    ['The dizzy dragonfly dipped down daringly.', 'dizzy dragonfly dipped down'],
    ['Pat’s puppy pounced on a purple puddle.', 'puppy pounced'],
    ['Fifty fluffy ferrets frolicked in the fog.', 'Fifty fluffy ferrets frolicked'],
    ['Marvin made magnificent muffins on Monday.', 'made magnificent muffins'],
    ['Tiny turtles trundled toward the tide.', 'Tiny turtles trundled']
  ];
  var ONO = [
    ['The bacon sizzled in the pan.', 'sizzled'],
    ['Splash! A frog leapt into the pond.', 'Splash!'],
    ['The old gate creaked and clanged shut.', 'creaked and clanged'],
    ['Thunder boomed over the hills.', 'boomed'],
    ['The kettle hissed on the stove.', 'hissed'],
    ['Crash! The tray of dishes hit the floor.', 'Crash!']
  ];
  var PERS = [
    ['The old clock grumbled as it struck noon.', 'grumbled as it struck noon'],
    ['The sun peeked over the hill and grinned at the farm.', 'peeked over the hill and grinned at the farm'],
    ['The wind sang a lullaby over the quiet village.', 'sang a lullaby'],
    ['The flowers nodded their heads politely as I walked by.', 'nodded their heads politely'],
    ['My alarm clock screams at me every morning.', 'screams at me'],
    ['The waves reached out and grabbed the sandcastle.', 'reached out and grabbed'],
    ['The old house sighed under the weight of the snow.', 'sighed'],
    ['Winter crept in and tucked the garden into bed.', 'tucked the garden into bed']
  ];
  var HYP = [
    ['My backpack weighs a million kilos.', 'a million kilos'],
    ['I waited a hundred years for the bus.', 'a hundred years'],
    ['The queue for lunch stretched all the way to the moon.', 'all the way to the moon'],
    ['Grandpa’s jokes are older than the mountains.', 'older than the mountains'],
    ['Bella has read every book in the world.', 'every book in the world'],
    ['I’m so tired I could sleep for a year.', 'sleep for a year']
  ];
  var IDM = [
    ['Don’t spill the beans about the surprise party.', 'spill the beans'],
    ['I’m feeling under the weather today.', 'under the weather'],
    ['The new students played a game to break the ice.', 'break the ice'],
    ['The spelling test was a piece of cake.', 'a piece of cake'],
    ['We only go to the beach once in a blue moon.', 'once in a blue moon'],
    ['Please don’t let the cat out of the bag.', 'let the cat out of the bag'],
    ['It’s late, so I’m going to hit the hay.', 'hit the hay']
  ];
  var OXY = [
    ['The room fell into a deafening silence.', 'deafening silence'],
    ['Everyone knew about the surprise; it was an open secret.', 'open secret'],
    ['The costume was pretty ugly, but we loved it.', 'pretty ugly'],
    ['The shop sells jumbo shrimp.', 'jumbo shrimp'],
    ['It was a bittersweet moment as we left the old house.', 'bittersweet'],
    ['The comedian had a seriously funny act.', 'seriously funny']
  ];
  var IMG = [
    'The kitchen smelled of warm cinnamon, and the toast was golden and crisp at the edges.',
    'Pink light washed over the frosty meadows, and the sky turned from grey to gold.',
    'Hot grains of sand burned our feet, and the tangy sea air tasted of salt.',
    'The market was full of orange pumpkins, deep red plums and the sharp smell of fresh herbs.',
    'A thick wool quilt lay on the bed, heavy and warm against my cold arms.',
    'From the barn came the earthy smell of hay and the low, sweet murmur of cows.',
    'The lemon was sharp and bitter, and my face scrunched up with each bite.'
  ];
  var UND = [
    'After hiking through the storm all day, Raj said he was slightly tired.',
    'Standing in a flooded kitchen, Mum remarked that the floor was a little damp.',
    'The team lost by fifty points, but the coach said it was not our best game.',
    'After winning the national prize, Lena said it was quite a nice day.',
    'Stuck at the airport for two days, we found the trip slightly inconvenient.',
    'When the toddler painted the whole wall purple, Dad said it was a bit of a mess.'
  ];

  /* ---------- data: story elements ---------- */
  var POV = {
    'First person': [
      'I tiptoed down the hall, my heart thumping. I was sure Mum had heard every step I took.',
      'My brother and I built the raft by ourselves. I still remember how proud I felt when it floated.',
      'I never told anyone about the key. It stayed in my pocket all summer.',
      'When we reached the top of the hill, I could see our whole village below me.',
      'I didn’t know the answer, so I stared at my shoes and hoped the teacher would pick someone else.',
      'My dog Biscuit waited by the gate every day, and every day I felt a little guilty about leaving.'
    ],
    'Third person limited': [
      'Maya opened the box slowly. She wondered if her grandmother had really hidden something in it, and she hoped it wasn’t empty.',
      'Tomas stared at the empty field. He felt sure the others had forgotten him, and the thought made his stomach sink.',
      'Nora watched the clouds gather. She worried the picnic would be ruined and wished she had checked the forecast.',
      'Leo carried the tray carefully across the room. He could not tell whether the guests were smiling at him or at the cake.',
      'The new girl looked around the cafeteria. She wondered whether anyone would invite her to sit down.',
      'Mr. Okafor locked the shop and sighed. He felt the day had gone well, and he hoped tomorrow would too.'
    ],
    'Third person omniscient': [
      'Ana thought the surprise was perfect, and she smiled. Across the room, her brother was already planning to tell her he had known all along.',
      'The coach believed the team was ready. The players, however, were quietly nervous, and the crowd could not wait for the first whistle.',
      'Jin hoped the teacher would not call on him. Meanwhile, the teacher was wondering which student needed encouragement, and decided on Jin.',
      'Gran thought the soup tasted wonderful. Pip, trying to be polite, thought it tasted like boiled socks, and the cat thought only of the fish on the counter.',
      'The farmer worried about the clouds, the sheep worried about nothing at all, and the sleeping village had no idea a storm was coming.',
      'Sofia felt certain the exam had gone badly. Her teacher, reading it later, would think it the best in the class, though neither of them knew that yet.'
    ]
  };
  var CON = {
    'Person vs. person': [
      'Two brothers argue over who gets the last piece of the shared drawing set, and neither will give way.',
      'Priya and her rival both want the lead role in the school play, and each tries to outdo the other at rehearsal.',
      'A shopkeeper and her neighbour keep quarrelling about whose fence stands on whose land.',
      'Two chess champions face each other in the final match, each determined to win.',
      'Sam’s cousin keeps copying his ideas for the science fair, so Sam confronts him.',
      'Two captains argue over where their teams should camp for the night.'
    ],
    'Person vs. self': [
      'Ellie knows she should apologise to her friend, but her pride keeps her from picking up the phone.',
      'Before the big recital, Omar fights his own fear and wonders whether he is good enough to walk on stage.',
      'Kai wants to eat the whole cake but tells himself to save some for his sisters; he argues with himself all evening.',
      'Mira is torn inside between telling the truth about the broken vase and staying quiet.',
      'Tom’s own doubts tell him he will never finish the race, and he struggles to keep going.',
      'Hana cannot decide in her own mind whether to try painting or stay with the safe job she already has.'
    ],
    'Person vs. nature': [
      'A hiker struggles to cross a swollen river before dark.',
      'The crew of a small fishing boat battles huge waves in a sudden storm.',
      'A farmer fights to save her crops during a long, dry summer.',
      'Lost in a blizzard, two campers search for the way back to their cabin.',
      'A little bird tries to fly home against a fierce headwind.',
      'Climbers push upward as the mountain weather turns icy and wild.'
    ],
    'Person vs. society': [
      'A girl challenges an old town rule that says only boys may join the chess club.',
      'Wren and her friends speak out against a law that would close the village library.',
      'A young inventor is laughed at by the whole town for a flying machine everyone says is impossible, but he keeps building it.',
      'In a kingdom where nobody is allowed to read, a boy secretly teaches himself.',
      'A student protests a school rule that bans everyone from speaking in the corridors, and collects signatures to change it.',
      'A girl refuses to follow the village custom that says no one may leave the valley, and sets out to see the sea.'
    ]
  };

  var TONE = {
    'Sarcastic': ['Oh, wonderful. Another rainy Saturday, just what every kid dreams of.', 'Sure, waking me at six on my day off was a brilliant plan. I’m absolutely thrilled.', 'Oh, great, the bus is late again. What a delightful surprise.'],
    'Nostalgic': ['Whenever I smell fresh bread, I’m back in Grandpa’s kitchen, ten years old again, wishing those mornings could return.', 'The old swing set is rusty now, but I can still hear us laughing on it all those summers ago.', 'He turned the pages of the faded album and smiled, missing the long, golden days of his childhood.'],
    'Hopeful': ['The seeds were tiny, but Lina pressed them into the soil and smiled; surely by spring the garden would bloom.', 'The test had been hard, yet Jo felt sure that next time, with practice, she would do better.', 'The team had lost every game, but Ravi believed that this season, at last, their luck would turn.'],
    'Anxious': ['Zane checked the clock again. What if the bus never came? What if he missed the whole interview?', 'Her hands trembled as she waited, every small sound making her jump.', 'Ida kept rereading the message, worried she had said the wrong thing and that her friend was upset.'],
    'Humorous': ['Our dog tried to hide under the rug, which was impressive, since he is the size of a sofa.', 'Dad announced he had “fixed” the toaster, and now it only makes toast on Tuesdays.', 'The goldfish has refused to eat since Monday, so we think he is on a very strict diet.'],
    'Bitter': ['She had shared every idea with him, and he took the prize without so much as a thank you. She would never forget it.', 'After all those years of loyal work, they gave the promotion to someone new, and he swallowed the insult in silence.', 'Mara said congratulations through clenched teeth; the medal should have been hers, and everybody knew it.'],
    'Calm': ['The lake lay still beneath the evening sky, and the only sound was the gentle lapping of the water.', 'Pip sat by the window with a warm cup of tea and watched the snow drift slowly down.', 'The boat rocked softly, and the whole afternoon stretched out, slow and easy.'],
    'Urgent': ['Hurry! The tide is coming in fast, and we must reach the boat now!', 'Quick, grab your coats! The last train leaves in two minutes!', 'Come on, run! The gates close at five, and there is no time to lose!']
  };
  var TONE_CLASH = { 'Sarcastic': ['Bitter', 'Humorous'], 'Bitter': ['Sarcastic'], 'Humorous': ['Sarcastic'], 'Anxious': ['Urgent'], 'Urgent': ['Anxious'] };
  var MOOD = {
    'Peaceful': ['Sunlight lay across the quiet meadow. Bees drifted lazily from flower to flower, and nothing needed doing at all.', 'The village slept under soft snow, and the world felt hushed and safe.', 'Waves rolled gently up the sand, and a warm breeze carried the smell of salt.'],
    'Tense': ['The final seconds ticked away. Both teams stood frozen, and the ball hung over the rim.', 'The bridge swayed under their feet. One careless step, and the whole thing could give way.', 'Maya held her breath as the judge opened the envelope. Nobody in the hall moved.'],
    'Joyful': ['Confetti filled the air as the whole crowd cheered and hugged, and the band struck up a dancing tune.', 'Bells rang across the town, and children ran through the streets laughing, because summer had finally begun.', 'Her face lit up as the puppy bounded into the room, and the whole family laughed together.'],
    'Gloomy': ['Grey rain streaked the window, and the empty house felt cold and heavy with silence.', 'Fog sat low over the dull, bare fields, and no birds sang.', 'The party was over, the lights were dimmed, and the last guests drifted away without a word.'],
    'Mysterious': ['A strange blue light flickered in the old well, and no one could say where it came from.', 'The map had one line of writing on it, in a language none of them had ever seen.', 'Every night at nine, someone left a small wrapped gift on the doorstep, and nobody knew who.'],
    'Lonely': ['Rina ate lunch at the end of the long table, listening to laughter that was never meant for her.', 'The lighthouse keeper’s only company was the sea, and he talked to the gulls just to hear a voice.', 'The new boy watched the other kids race off together, and the playground suddenly felt enormous and empty.']
  };
  var MOOD_CLASH = { 'Tense': ['Mysterious'], 'Mysterious': ['Tense'], 'Gloomy': ['Lonely'], 'Lonely': ['Gloomy'] };
  // theme items: passage, the true theme, then three decoys (topic, plot summary, too narrow)
  var THEME = [
    ['Every day Bo practised the piano, even when his fingers ached. At the recital the first notes were shaky, but by the end the room was clapping.', 'Hard work pays off.', 'Piano music', 'Bo plays at a recital.', 'Bo’s fingers ached.'],
    ['Pia found a wallet full of money. She could have kept it, but she imagined the owner’s worry and handed it in. She went home feeling lighter than she had in days.', 'Honesty brings peace of mind.', 'Lost wallets', 'Pia returns a wallet.', 'Shop owners are friendly.'],
    ['Everyone laughed at the odd-looking stray dog. Only Ruth gave him a bowl of water. By autumn he was guarding the whole farm, and none of the laughers had a better friend.', 'Kindness matters more than looks.', 'Stray dogs', 'Ruth gives a dog water.', 'Farms need guard dogs.'],
    ['The ants could not move the crumb alone. Then one called to another, and soon the whole line was heaving together. By sunset the crumb sat safely in the nest.', 'Together we can do more.', 'Ants and crumbs', 'Ants carry a crumb home.', 'Ants are very strong.'],
    ['Ivy’s paper planes crashed again and again. Each time she changed the folds a little. On the twentieth try the plane sailed over the whole yard.', 'Keep trying and you will improve.', 'Paper planes', 'Ivy’s plane flies on try twenty.', 'Planes crash a lot.'],
    ['The king wanted more gold each year, until his treasury was full and his people were hungry. He sat alone among the coins and found he could not eat any of them.', 'Greed can cost you what matters.', 'Kings and gold', 'A king’s gold piles up.', 'Gold is shiny.'],
    ['Kit hurried through her homework and made mistake after mistake. Her brother took his time, checked each line, and handed in a perfect page.', 'Careful work beats rushing.', 'Homework', 'Kit rushes; her brother checks.', 'Brothers are different.'],
    ['Everyone said the old bridge was too frightening to cross. Dev’s knees shook, but he took one step, then another. On the far side he found the best blackberries in the valley.', 'Facing fear can bring rewards.', 'Old bridges', 'Dev crosses a bridge.', 'Blackberries are tasty.']
  ];

  var IRONY = {
    'Verbal irony': [
      'When the rain soaked the whole picnic, Gran smiled and said, “What perfect weather for it.”',
      'Looking at his little sister’s room buried under toys, Dad said, “My, how tidy.”',
      'After the goalkeeper let in the tenth goal, his teammate said, “Great save, champ.”',
      'Stuck in a traffic jam for an hour, Mum sighed, “I do love a relaxing drive.”',
      'As the snow piled up past the door, Ana said, “Just a light dusting, then.”',
      'After the cat knocked over her third plant, Aunt Rae said, “Thank you, Whiskers, for helping with the gardening.”'
    ],
    'Situational irony': [
      'The pest-control company’s office was overrun with ants.',
      'The champion runner trained for a year, then tripped over his own shoelace at the start of the race.',
      'Zoe spent an hour searching the house for her glasses, only to find them on top of her head.',
      'The school’s “Be On Time” award ceremony started thirty minutes late.',
      'Tim hid his sister’s present so well that he could never find it again, and had to give her a card instead.',
      'The weather forecaster forgot her umbrella and was soaked on her way to announce a sunny day.'
    ],
    'Dramatic irony': [
      'Mia hides behind the sofa to surprise her brother. We, the readers, know he has already spotted her feet, but Mia has no idea.',
      'In the story, Pip proudly feeds a wild fox his lunch, thinking it is a stray dog. The reader knows it is a fox, but Pip does not.',
      'Kara tells her friends to meet her at the park at noon. The reader has been told the park is closed all day for repairs, but Kara does not know.',
      'The prince searches the whole castle for his missing ring. We, the readers, know it is in his own pocket, but he does not.',
      'Dad proudly stirs salt into the cake mixture, thinking it is sugar. The reader saw the labels get switched, but Dad does not know.',
      'Leo plans to give his teacher the polished apple from his bag. The reader has seen the cheeky cat steal it, but Leo does not know.'
    ]
  };

  var APPEAL = {
    'Ethos (credibility)': [
      'As a children’s nurse for twenty years, I can tell you that this bike helmet is the safest choice for your child.',
      'I have coached swimming for thirty years and trained three national champions, so trust me when I say this routine works.',
      'Our family-run bakery has served this town honestly for fifty years; you can count on us.',
      'Speaking as a qualified teacher and a mother of four, I recommend this reading programme.',
      'You can believe me about the hike: I’m a mountain guide who has led this trail more than two hundred times.',
      'I’m a retired engineer who built bridges for forty years, and I assure you this plan is sound.',
      'This charity has been rated trustworthy by independent auditors for ten years running.',
      'Dr. Silva, a respected scientist who has studied bees her whole career, urges us to plant more flowers.'
    ],
    'Pathos (emotion)': [
      'Picture a shivering puppy alone in the cold with no one to hold it; please adopt from the shelter tonight.',
      'Imagine her tearful little face when she sees the empty swing set where the park used to be.',
      'Think of the grandparents who wait by the phone every night, hoping for a call from you.',
      'Every winter, children in our town go to bed hungry and frightened; open your heart and give today.',
      'Hear the joy of children laughing in the new playground, and you will want every child to have one.',
      'How can you look into those sad, hopeful eyes and walk away?',
      'Remember how proud you felt on your first day of school; now help another child feel that way.',
      'Imagine the heartbreak of losing your home to a flood, and then give whatever you can.'
    ],
    'Logos (logic and evidence)': [
      'In our school trial, students who slept eight hours scored ten percent higher on tests than those who slept six.',
      'If each of our 200 students recycles two sheets a day, we recycle 400 sheets daily, or 2,000 every school week.',
      'The electric bus costs less to run per mile and makes no exhaust, so it is the smarter choice for our town.',
      'Last year the reading club raised average scores in every class that joined, so we should expand it.',
      'Walking to school takes twelve minutes and the bus takes twenty, so walking saves time as well as money.',
      'Three out of four test plants grew taller under the new lamp, so the lamp helps.',
      'Accidents at the crossing fell by half after lights were fitted, which shows the lights work.',
      'If membership costs 20 a month and single visits cost 5 each, joining beats paying per visit once you go more than four times.'
    ]
  };

  var FALL = {
    'Ad hominem': ['Don’t listen to Jess’s idea for the school garden; she can’t even keep her own locker tidy.', 'We shouldn’t trust the mayor’s plan for the new road, because he has a silly haircut.', 'Why believe Omar’s argument for shorter homework? He’s only in year seven and doesn’t know anything.'],
    'Straw man': ['Mia said we should have a little less screen time. So you want us to throw away every device and live in caves?', 'When Ben suggested adding a second recess, the principal replied, “So you think students shouldn’t ever learn anything?”', 'Lena said the park should have more benches. Oh, so you want to cover the whole park in concrete?'],
    'False dilemma': ['Either we cancel the school trip, or we let everyone get soaked in the rain; there is no other option.', 'You’re either with our team or against it, so which is it?', 'Either we spend all weekend studying or we fail the course; there is nothing in between.'],
    'Slippery slope': ['If we let students wear hats in class today, tomorrow they’ll wear pyjamas, and soon nobody will learn anything at all.', 'If you skip one piano practice, you’ll skip them all, quit lessons, and never play music again.', 'If we let the dog on the sofa once, he’ll want the beds, then the table, and soon he’ll be running the house.'],
    'Bandwagon': ['Everybody in our class is buying this new game, so it must be the best one.', 'Everyone is wearing these boots, so you should get a pair too.', 'All my friends are joining the chess club, so it must be great, and you should join too.'],
    'Hasty generalization': ['My cousin got a rude reply from one waiter in that cafe, so every cafe worker in town must be rude.', 'I met two boys from that school and they were both loud, so all the students there are loud.', 'The first apple I tasted from this orchard was sour, so every apple there must be sour.'],
    'Appeal to authority': ['A famous actor says this vitamin water cures colds, so it must work.', 'A well-known footballer says this phone is the best, so it must be.', 'A famous singer says this cough syrup is the best in the world, so it must be.'],
    'Circular reasoning': ['This book is the best ever written because it is the greatest book in history.', 'You can trust me because I always tell the truth, and I know that because I never lie.', 'Our team is the best because no team is better than ours.'],
    'Red herring': ['You ask why I didn’t finish my homework? Well, did you see how amazing that sunset was last night?', 'When asked why the report was late, Sam started talking about how much he loves his new bicycle.', 'Asked about the broken window, Kit replied, “Why is everyone ignoring that the grass needs cutting?”']
  };
  var DEVICE = {
    'Anaphora': ['Every morning I hoped. Every afternoon I waited. Every evening I wondered.', 'On this team we help each other. On this team we share the ball. On this team we cheer for all.', 'Look at the stars, look at the sea, look at what we can do together.'],
    'Antithesis': ['We win together, or we lose together.', 'Easy to begin, hard to finish.', 'The ant is tiny, but its work is huge.'],
    'Rhetorical question': ['Who doesn’t love a day off from school?', 'Is it too much to ask for a clean park?', 'What could be better than a warm bowl of soup on a snowy day?'],
    'Parallelism': ['She likes reading books, writing stories, and drawing maps.', 'The recipe says to mix the flour, to crack the eggs, and to heat the oven.', 'The robot can lift heavy boxes, climb steep stairs and open stiff doors.'],
    'Euphemism': ['Our hamster passed away last night.', 'The shop “let go” ten workers after the busy season ended.', 'The used cars on the lot are called “pre-owned vehicles.”'],
    'Allusion': ['Her lunchbox is a real Pandora’s box; nobody dares to open it.', 'Tom’s weak ankle is his Achilles’ heel on the football pitch.', 'After a year of hard work, Lena’s rise from the scullery to the stage was a real Cinderella story.'],
    'Understatement': ['After hiking through the storm for six hours, Raj said he was slightly tired.', 'The kitchen was flooded to the knees, but Dad called it a minor inconvenience.', 'When the toddler painted the entire wall purple, Mum remarked that it was a bit of a mess.'],
    'Hyperbole': ['I’ve told you a billion times to close the gate!', 'This homework will take forever, and my brain is melting.', 'I’m so tired I could sleep for a hundred years.']
  };
  var DEV_CLASH = { 'Anaphora': ['Parallelism'], 'Antithesis': ['Parallelism'], 'Parallelism': ['Anaphora', 'Antithesis'], 'Understatement': ['Euphemism'], 'Euphemism': ['Understatement'] };

  /* ---------- helpers ---------- */
  function keys(o) { return Object.keys(o); }
  function text(it) { return typeof it === 'string' ? it : it[0]; }
  function mark(it) { return typeof it === 'string' ? null : it[1]; }
  // answer + (n-1) other labels from `set`, skipping labels that clash with the answer
  function choicesFor(rng, ans, set, n, clash) {
    var bad = (clash && clash[ans]) || [];
    var others = rng.shuffle(set.filter(function (c) { return c !== ans && bad.indexOf(c) < 0; })).slice(0, n - 1);
    return rng.shuffle(others.concat([ans]));
  }
  // one round from a table { concept: [examples] }; `set` lists the concepts that may appear
  function fromTable(rng, table, set, n, clash, q, qMark, fixed) {
    var ans = rng.pick(set), it = rng.pick(table[ans]), m = mark(it);
    return {
      question: m ? qMark : q, visual: K.sentHtml(text(it), m, true),
      choices: fixed ? fixed.slice() : choicesFor(rng, ans, set, n, clash),
      answer: ans, explain: EXP[ans], cols: n === 2 ? 2 : (n === 3 ? 1 : 2)
    };
  }
  // concept tables for the figure-of-speech levels
  var FIG = { 'Simile': SIM, 'Metaphor': MET, 'Alliteration': ALL, 'Onomatopoeia': ONO, 'Personification': PERS, 'Hyperbole': HYP, 'Idiom': IDM, 'Oxymoron': OXY, 'Imagery': IMG, 'Understatement': UND };
  var SET2 = ['Alliteration', 'Onomatopoeia', 'Personification', 'Hyperbole', 'Simile', 'Metaphor'];
  var SET3 = ['Idiom', 'Oxymoron', 'Imagery', 'Understatement', 'Hyperbole', 'Personification', 'Alliteration', 'Metaphor'];
  var SET_IRONY = ['Verbal irony', 'Situational irony', 'Dramatic irony'];
  var SET_APPEAL = keys(APPEAL);
  var SET_FALL = keys(FALL), SET_DEV = keys(DEVICE);

  K.choiceGame({
    id: 'litlab', name: 'Lit Lab', emoji: '🔬', blurb: 'Spot the device, the tone and the trick',
    grades: 'Ages 10 to 18', prompt: 'Tap the answer!', rounds: 10,
    levels: [null,
      { label: 'Simile or metaphor', ms: 14000 },
      { label: 'Sound and feeling devices', ms: 16000 },
      { label: 'More figures of speech', ms: 18000 },
      { label: 'Point of view and conflict', ms: 21000 },
      { label: 'Theme, tone and mood', ms: 23000 },
      { label: 'Types of irony', ms: 21000 },
      { label: 'Ethos, pathos, logos', ms: 20000 },
      { label: 'Logical fallacies and rhetorical devices', ms: 24000 }
    ],
    makeSpec: function (rng, cfg, level) {
      var sp, kind, it;
      if (level === 1) {
        return fromTable(rng, FIG, ['Simile', 'Metaphor'], 2, null, 'Is this a simile or a metaphor?', 'Is the highlighted part a simile or a metaphor?', ['Simile', 'Metaphor']);
      }
      if (level === 2) return fromTable(rng, FIG, SET2, 4, null, 'Which device does this use?', 'Which device is the highlighted part?');
      if (level === 3) return fromTable(rng, FIG, SET3, 4, null, 'Which device does this use?', 'Which device is the highlighted part?');
      if (level === 4) {
        if (rng.pick(['pov', 'conflict']) === 'pov') {
          return fromTable(rng, POV, keys(POV), 3, null, 'Whose point of view is this?', 'Whose point of view is this?');
        }
        return fromTable(rng, CON, keys(CON), 4, null, 'What kind of conflict is this?', 'What kind of conflict is this?');
      }
      if (level === 5) {
        kind = rng.pick(['tone', 'tone', 'mood', 'mood', 'theme']);
        if (kind === 'tone') return fromTable(rng, TONE, keys(TONE), 4, TONE_CLASH, 'What is the tone of this passage?', 'What is the tone of this passage?');
        if (kind === 'mood') return fromTable(rng, MOOD, keys(MOOD), 4, MOOD_CLASH, 'What mood does this passage create?', 'What mood does this passage create?');
        it = rng.pick(THEME);
        sp = { question: 'Which is the best statement of the THEME?', visual: K.sentHtml(it[0], null, true), choices: rng.shuffle(it.slice(1)), answer: it[1], explain: it[1] + ' ' + EXP.theme, cols: 1 };
        return sp;
      }
      if (level === 6) return fromTable(rng, IRONY, SET_IRONY, 3, null, 'What type of irony is this?', 'What type of irony is this?');
      if (level === 7) return fromTable(rng, APPEAL, SET_APPEAL, 3, null, 'Which appeal is strongest here?', 'Which appeal is strongest here?');
      // level 8
      if (rng.pick(['fallacy', 'device']) === 'fallacy') {
        return fromTable(rng, FALL, SET_FALL, 4, null, 'Which logical fallacy is this?', 'Which logical fallacy is this?');
      }
      return fromTable(rng, DEVICE, SET_DEV, 4, DEV_CLASH, 'Which rhetorical device is this?', 'Which rhetorical device is this?');
    }
  });
})(typeof window !== 'undefined' ? window : globalThis);
