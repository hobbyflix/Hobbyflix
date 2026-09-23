/* HobbyFlix — mock data (hobbies, boxes, experiences, quiz) */
/* ==================================================================
   DATA
   Axes (0-100): ca creative→analytical | so solo→social
                 pi physical→intellectual | cr competitive→relaxed
                 ss structured→spontaneous | nm novelty→mastery
================================================================== */
const HOBBIES = [
 {id:"photography",name:"Photography",icon:"i-camera",g:["#5A1E3E","#1C1630"],tags:["Creative","Solo","Outdoor","Free to start"],diff:2,time:"15–30 min/day",cost:"₹0–₹2,000",
  axes:{ca:26,so:32,pi:44,cr:62,ss:66,nm:52},
  why:"You like noticing things other people walk past, and you'd rather explore alone than be taught in a room.",
  related:["filmmaking","graphic-design","stargazing","sketching"],
  days:["Find five interesting compositions","Shoot using only natural light","Take a portrait of someone","Tell a story with three photos","Try a perspective you've never used","Edit your favourite shot","Create your final frame"]},

 {id:"pottery",name:"Pottery",icon:"i-pottery",g:["#5B2A18","#201525"],tags:["Creative","Hands-on","Indoor","Relaxing"],diff:3,time:"45 min/session",cost:"₹800–₹2,500",
  axes:{ca:16,so:44,pi:26,cr:80,ss:48,nm:58},
  why:"Slow, messy and physical. Nothing about it can be rushed, which is the point.",
  related:["bonsai","painting","baking","terrarium"],
  days:["Wedge clay and feel it move","Pinch one small bowl","Learn to centre on the wheel","Pull your first wall","Make a matching pair","Trim and add a foot","Glaze the one you'd keep"]},

 {id:"chess",name:"Chess",icon:"i-chess",g:["#1B2440","#141222"],tags:["Analytical","Competitive","Indoor","15-minute","Free to start"],diff:2,time:"15 min/day",cost:"₹0",
  axes:{ca:88,so:48,pi:92,cr:12,ss:20,nm:82},
  why:"You like problems with a right answer and an opponent who's trying to stop you finding it.",
  related:["coding","journaling","lockpicking","origami"],
  days:["Learn one opening, four moves deep","Solve five mate-in-one puzzles","Play three ten-minute games","Study one game you lost","Learn the knight fork pattern","Play a longer 15-minute game","Beat the bot you lost to on day 3"]},

 {id:"guitar",name:"Guitar",icon:"i-guitar",g:["#4E2A12","#1B1524"],tags:["Creative","Music","Solo","Indoor","Performing"],diff:3,time:"20 min/day",cost:"₹0–₹4,000 (rentable)",
  axes:{ca:24,so:44,pi:38,cr:66,ss:34,nm:72},
  why:"Your hands want a job while your head is busy. Progress is audible within a week.",
  related:["piano","singing","djing","drumming"],
  days:["Hold one clean E-minor chord","Switch between two chords","Play along to a slow rhythm track","Learn the four-chord loop","Play a full verse without stopping","Record fifteen seconds","Play it once for one person"]},

 {id:"cooking",name:"Cooking",icon:"i-cooking",g:["#57301A","#1C1420"],tags:["Creative","Social","Indoor","Hands-on"],diff:2,time:"30–45 min",cost:"₹300+",
  axes:{ca:42,so:70,pi:40,cr:62,ss:62,nm:60},
  why:"Immediate feedback, shareable output, and you have to eat anyway.",
  related:["baking","mixology","pottery","photography"],
  days:["Cook one dish without a recipe app open","Learn to actually use salt and acid","Master one knife cut","Cook the same dish better","Feed one other person","Improvise from what's in the fridge","Cook the meal you'd serve a guest"]},

 {id:"skateboarding",name:"Skateboarding",icon:"i-skate",g:["#1F3A33","#141A24"],tags:["Physical","Outdoor","Social","Competitive"],diff:4,time:"45 min",cost:"₹2,500+ (rentable)",
  axes:{ca:40,so:62,pi:8,cr:36,ss:74,nm:56},
  why:"High failure rate, very high payoff per small win. You'll fall, then you won't.",
  related:["dance","boxing","running","filmmaking"],
  days:["Stand and roll ten metres","Find your pushing foot","Learn to stop on purpose","Turn both directions","Drop off one curb","Ride a full loop of the park","Land one ollie, even badly"]},

 {id:"djing",name:"DJing",icon:"i-dj",g:["#3C1A52","#15142B"],tags:["Creative","Music","Social","Indoor","Performing"],diff:3,time:"30 min/day",cost:"₹0 (software)",
  axes:{ca:34,so:76,pi:46,cr:52,ss:58,nm:64},
  why:"You already curate playlists for other people. This is that, with timing and consequences.",
  related:["drumming","guitar","piano","dance"],
  days:["Beatmatch two tracks by ear","Learn the EQ swap","Mix two songs you love","Plan a four-track arc","Record a ten-minute set","Mix live for one friend","Play a twenty-minute set start to finish"]},

 {id:"painting",name:"Painting",icon:"i-paint",g:["#4A1C2A","#1A1428"],tags:["Creative","Solo","Indoor","Relaxing"],diff:2,time:"30 min/day",cost:"₹600–₹1,500",
  axes:{ca:12,so:30,pi:36,cr:78,ss:56,nm:56},
  why:"Cheap to start, impossible to do badly enough to waste the evening.",
  related:["sketching","pottery","calligraphy","photography"],
  days:["Mix five greys from three colours","Paint one object badly","Copy a painting you like","Paint the same object again","Work in one colour only","Paint from a photo you took","Paint something nobody asked for"]},

 {id:"hiking",name:"Hiking",icon:"i-hike",g:["#1E3A24","#131A1E"],tags:["Physical","Outdoor","Relaxing","Weekend","Free to start"],diff:2,time:"2–4 hrs weekends",cost:"₹0",
  axes:{ca:52,so:50,pi:26,cr:84,ss:72,nm:40},
  why:"Zero skill barrier, immediate change of scenery, and it makes every other hobby portable.",
  related:["photography","birdwatching","running","journaling"],
  days:["Walk 3 km somewhere new","Find a trail within 20 km","Learn to read one trail map","Do a 6 km route","Pack properly for weather","Walk at sunrise","Do the route you thought was too long"]},

 {id:"filmmaking",name:"Film making",icon:"i-film",g:["#2A1B4A","#151328"],tags:["Creative","Social","Storytelling"],diff:4,time:"1 hr/day",cost:"₹0 (phone)",
  axes:{ca:30,so:66,pi:48,cr:58,ss:50,nm:66},
  why:"You think in scenes already. A phone is genuinely enough for the first year.",
  related:["photography","stop-motion","writing","podcasting"],
  days:["Shoot one 10-second shot you like","Learn the 180-degree rule","Film a conversation with two angles","Cut 30 seconds together","Add sound that isn't music","Shoot a one-minute story","Show it to someone and shut up"]},

 {id:"boxing",name:"Boxing",icon:"i-boxing",g:["#4C1520","#17131F"],tags:["Physical","Competitive","Indoor"],diff:3,time:"40 min",cost:"₹1,200+",
  axes:{ca:58,so:48,pi:6,cr:18,ss:28,nm:70},
  why:"Technical enough to keep your head busy, tiring enough to shut it up.",
  related:["running","skateboarding","dance","chess"],
  days:["Learn stance and guard","Throw 100 clean jabs","Add the cross","Learn to move, not stand","Three rounds on the bag","Learn one slip and counter","Spar light or do five clean rounds"]},

 {id:"coding",name:"Coding",icon:"i-code",g:["#16303F","#111624"],tags:["Analytical","Solo","Indoor","Free to start"],diff:3,time:"45 min/day",cost:"₹0",
  axes:{ca:94,so:36,pi:94,cr:44,ss:30,nm:80},
  why:"You like building systems more than objects, and you'd rather debug than decorate.",
  related:["chess","lockpicking","journaling","filmmaking"],
  days:["Make one page say hello","Change something and break it","Fix what you broke","Build a button that counts","Store something that survives refresh","Make it look deliberate","Put it online for one person to use"]},

 {id:"dance",name:"Dance",icon:"i-dance",g:["#4A1840","#17142C"],tags:["Physical","Social","Performing"],diff:3,time:"30 min/day",cost:"₹0–₹800",
  axes:{ca:30,so:80,pi:14,cr:58,ss:66,nm:54},
  why:"The fastest way to feel less self-conscious in a room full of people.",
  related:["boxing","djing","skateboarding","guitar"],
  days:["Learn one eight-count","Find your count in a song","Add arms without panicking","Learn a second eight","Join the two together","Film yourself once","Dance it through three times clean"]},

 {id:"calligraphy",name:"Calligraphy",icon:"i-calli",g:["#2B2340","#141426"],tags:["Creative","Solo","Indoor","15-minute","Relaxing"],diff:2,time:"15 min/day",cost:"₹400",
  axes:{ca:34,so:22,pi:50,cr:82,ss:24,nm:76},
  why:"Small, quiet, repeatable. The kind of thing that fits in the ten minutes before bed.",
  related:["sketching","journaling","origami","painting"],
  days:["Learn the thick-thin pressure stroke","Fill one page of ovals","Write the lowercase alphabet","Write your own name","Learn spacing between letters","Write one full quote","Write a card and give it away"]},

 {id:"origami",name:"Origami",icon:"i-origami",g:["#1C3348","#121726"],tags:["Creative","Solo","Hands-on","15-minute","Free to start"],diff:1,time:"15 min/day",cost:"₹0",
  axes:{ca:56,so:26,pi:64,cr:76,ss:22,nm:68},
  why:"Pure sequence and precision, with a small object at the end of every session.",
  related:["calligraphy","sketching","bonsai","chess"],
  days:["Fold a crane from instructions","Fold it again without looking","Learn the preliminary base","Fold a modular unit","Build a six-unit cube","Fold something from memory","Design one fold of your own"]},

 {id:"bonsai",name:"Bonsai",icon:"i-bonsai",g:["#22381F","#14191F"],tags:["Hands-on","Solo","Relaxing","Indoor"],diff:4,time:"10 min/day",cost:"₹900+",
  axes:{ca:44,so:18,pi:52,cr:88,ss:26,nm:94},
  why:"A hobby measured in years that only asks ten minutes a day. Patience is the whole skill.",
  related:["terrarium","pottery","birdwatching","origami"],
  days:["Choose a species that survives you","Learn what its leaves say about water","Make the first structural cut","Wire one branch","Repot without killing it","Decide the front of the tree","Write your five-year plan for it"]},

 {id:"mixology",name:"Mixology",icon:"i-mixology",g:["#4C2A12","#1A1422"],tags:["Creative","Social","Indoor"],diff:2,time:"20 min",cost:"₹1,000+",
  axes:{ca:46,so:78,pi:42,cr:62,ss:54,nm:58},
  why:"Ratios, ice and garnish — a science experiment your friends applaud.",
  related:["cooking","baking","photography","djing"],
  days:["Learn the sour ratio by heart","Make one drink three ways","Learn to shake properly","Build a drink over ice","Make a syrup from scratch","Design one drink of your own","Serve three people a round"]},

 {id:"birdwatching",name:"Birdwatching",icon:"i-bird",g:["#1D3A3A","#131A22"],tags:["Outdoor","Solo","Relaxing","Free to start"],diff:1,time:"20 min",cost:"₹0–₹3,000",
  axes:{ca:62,so:30,pi:66,cr:92,ss:60,nm:74},
  why:"It turns every walk, balcony and bus stop into somewhere with something happening.",
  related:["hiking","photography","journaling","bonsai"],
  days:["Identify three birds near your home","Learn one call by ear","Keep a list for a week","Go out at first light","Visit water — a lake or drain","Sketch one bird badly","Find a species you've never seen"]},

 {id:"journaling",name:"Journaling",icon:"i-journal",g:["#33244A","#151327"],tags:["Solo","Indoor","15-minute","Relaxing","Free to start"],diff:1,time:"10 min/day",cost:"₹150",
  axes:{ca:50,so:10,pi:72,cr:86,ss:44,nm:70},
  why:"The cheapest hobby there is, and the one that makes you better at choosing the others.",
  related:["sketching","calligraphy","photography","birdwatching"],
  days:["Write three lines, badly","Write about today, not yourself","Try a morning page","Write one page about one object","List things you noticed","Reread day one without cringing","Write the entry you'd want to find in a year"]},

 {id:"sketching",name:"Sketching",icon:"i-pencil",g:["#2C2C44","#141425"],tags:["Creative","Solo","15-minute","Free to start"],diff:2,time:"15 min/day",cost:"₹200",
  axes:{ca:26,so:24,pi:46,cr:74,ss:52,nm:60},
  why:"Drawing is looking. Fifteen minutes a day changes what you see in a month.",
  related:["painting","calligraphy","journaling","photography"],
  days:["Draw your own hand","Draw one object in 60 seconds","Draw the same object in 10 minutes","Draw something moving","Draw a face, badly, anyway","Fill one page with small things","Draw the view from your window"]},

 {id:"running",name:"Running",icon:"i-run",g:["#183542","#121A24"],tags:["Physical","Outdoor","Free to start","Competitive"],diff:2,time:"30 min",cost:"₹0",
  axes:{ca:66,so:42,pi:10,cr:44,ss:36,nm:76},
  why:"Zero setup, measurable progress, and it makes every physical hobby easier.",
  related:["hiking","boxing","skateboarding","dance"],
  days:["Run one kilometre slowly","Walk-run for twenty minutes","Find a route you like","Run the same route faster","Run somewhere new","Take a full rest day on purpose","Run three kilometres without stopping"]},

 {id:"baking",name:"Sourdough baking",icon:"i-bake",g:["#4A3416","#1A1520"],tags:["Hands-on","Indoor","Relaxing","Weekend"],diff:3,time:"Weekend project",cost:"₹400",
  axes:{ca:38,so:58,pi:44,cr:70,ss:18,nm:72},
  why:"A living thing on your counter that punishes impatience and rewards a schedule.",
  related:["cooking","pottery","mixology","terrarium"],
  days:["Start a starter from flour and water","Feed it and watch for bubbles","Learn the float test","Mix your first dough","Learn one stretch and fold","Bake loaf one, accept loaf one","Bake loaf two and share it"]},

 {id:"terrarium",name:"Terrarium building",icon:"i-plant",g:["#1F3A2C","#13191F"],tags:["Hands-on","Indoor","Weekend","Relaxing"],diff:1,time:"Weekend project",cost:"₹700",
  axes:{ca:42,so:40,pi:46,cr:88,ss:44,nm:50},
  why:"One afternoon, one sealed jar, and a tiny ecosystem you're now responsible for.",
  related:["bonsai","pottery","birdwatching","painting"],
  days:["Choose a vessel and plants","Build the drainage layer","Plant the main specimen","Add moss and hardscape","Seal it and watch condensation","Adjust light and water once","Build a second one for someone"]},

 {id:"lockpicking",name:"Lockpicking",icon:"i-lock",g:["#2E2A1C","#16141F"],tags:["Analytical","Solo","Indoor","15-minute"],diff:3,time:"15 min/day",cost:"₹900",
  axes:{ca:86,so:20,pi:78,cr:40,ss:32,nm:78},
  why:"A physical puzzle with feedback you feel through your fingertips. Practice locks only.",
  related:["chess","coding","origami","journaling"],
  days:["Learn how a pin tumbler works","Single-pin pick a two-pin lock","Feel the set of a binding pin","Open a four-pin practice lock","Learn tension control","Try a security pin","Open the same lock three times in a row"]},

 /* ---------------- added: 26 more hobbies ---------------- */
 {id:"knitting",name:"Knitting",icon:"i-yarn",g:["#4A2438","#181428"],tags:["Creative","Hands-on","Solo","Relaxing","Indoor"],diff:2,time:"20 min/day",cost:"₹400",isNew:true,
  axes:{ca:28,so:34,pi:40,cr:88,ss:26,nm:70},
  why:"Something for your hands while your brain winds down — and a scarf at the end of it.",
  related:["upcycling","calligraphy","candle-making","journaling"],
  days:["Cast on twenty stitches","Knit one full row without dropping any","Knit ten rows of garter stitch","Learn the purl stitch","Knit a small square swatch","Fix a mistake instead of starting over","Bind off your first coaster"]},

 {id:"yoga",name:"Yoga",icon:"i-yoga",g:["#223A3A","#131A22"],tags:["Physical","Solo","Relaxing","Indoor","15-minute","Free to start"],diff:1,time:"15 min/day",cost:"₹0–₹800",isNew:true,
  axes:{ca:48,so:30,pi:22,cr:92,ss:30,nm:66},
  why:"Fifteen minutes that undo eight hours of sitting. You'll feel the difference by day three.",
  related:["running","swimming","dance","journaling"],
  days:["Hold downward dog for 30 seconds","Learn the sun salutation sequence","Flow three rounds without pausing","Balance in tree pose on both sides","Add a slow twist sequence","Do a full 15-minute session","Design your own morning flow"]},

 {id:"bouldering",name:"Bouldering",icon:"i-climb",g:["#3A2A1A","#15141E"],tags:["Physical","Social","Competitive","Indoor"],diff:3,time:"1 hr/session",cost:"₹600/session",isNew:true,
  axes:{ca:62,so:62,pi:16,cr:34,ss:44,nm:62},
  why:"Every wall is a puzzle you solve with your body, and the regulars will happily tell you the moves.",
  related:["skateboarding","boxing","yoga","hiking"],
  days:["Climb five of the easiest routes","Learn to fall safely","Read one route before touching it","Climb pushing with your legs, not arms","Finish your first V1","Try one route three times in a row","Top the problem you failed on day 1"]},

 {id:"swimming",name:"Swimming",icon:"i-wave",g:["#153A4A","#111824"],tags:["Physical","Solo","Relaxing","Outdoor"],diff:2,time:"30 min",cost:"₹1,000/month",isNew:true,
  axes:{ca:60,so:36,pi:12,cr:72,ss:38,nm:70},
  why:"Full-body, zero impact, and the one place your phone can't follow you.",
  related:["running","yoga","cycling","hiking"],
  days:["Float on your back for a minute","Kick one length with a board","Learn rhythmic side breathing","Swim one length of freestyle","Swim four lengths with rests","Try a length of backstroke","Swim 200 metres in total"]},

 {id:"cycling",name:"Cycling",icon:"i-bike",g:["#1F3A2A","#131A20"],tags:["Physical","Outdoor","Social","Free to start"],diff:2,time:"45 min",cost:"₹0 (rental)",isNew:true,
  axes:{ca:58,so:52,pi:10,cr:58,ss:62,nm:52},
  why:"You'll see more of your city in an hour than in a year of commuting through it.",
  related:["running","hiking","photography","swimming"],
  days:["Ride 5 km on a quiet road","Learn to shift gears smoothly","Ride somewhere you'd usually take a cab","Ride at sunrise","Climb one real hill","Join a group ride","Ride 20 km in one go"]},

 {id:"gardening",name:"Gardening",icon:"i-sprout",g:["#24401F","#131A1C"],tags:["Hands-on","Solo","Relaxing","Outdoor"],diff:2,time:"15 min/day",cost:"₹300",isNew:true,
  axes:{ca:44,so:34,pi:40,cr:90,ss:40,nm:72},
  why:"Slow, living progress. Nothing beats eating something you grew on a balcony.",
  related:["bonsai","terrarium","cooking","birdwatching"],
  days:["Pot three herb seedlings","Learn what your soil needs","Water on a schedule, not a whim","Repot one plant properly","Start seeds from scratch","Set up a simple compost bin","Cook with something you grew"]},

 {id:"woodworking",name:"Woodworking",icon:"i-hammer",g:["#4A3018","#18141E"],tags:["Hands-on","Creative","Solo","Weekend"],diff:4,time:"Weekend project",cost:"₹1,500+",isNew:true,
  axes:{ca:46,so:30,pi:28,cr:66,ss:30,nm:80},
  why:"Measure twice, cut once, and end the weekend with something that will outlive you.",
  related:["pottery","electronics","upcycling","terrarium"],
  days:["Measure and mark accurately","Make ten straight saw cuts","Sand a board properly","Join two pieces with glue and screws","Build a small box","Finish it with oil","Build a phone stand for someone"]},

 {id:"electronics",name:"Electronics tinkering",icon:"i-chip",g:["#16303A","#111624"],tags:["Analytical","Hands-on","Solo","Indoor"],diff:3,time:"45 min/day",cost:"₹900",isNew:true,
  axes:{ca:90,so:32,pi:70,cr:50,ss:40,nm:74},
  why:"Make a light blink, then make it blink when you clap. Code that touches the real world.",
  related:["coding","woodworking","lockpicking","game-design"],
  days:["Light one LED on a breadboard","Read a resistor's colour code","Blink the LED with a microcontroller","Add a button that controls it","Read a temperature sensor","Make it beep past a threshold","Build a gadget that does one useful thing"]},

 {id:"podcasting",name:"Podcasting",icon:"i-mic",g:["#3A1A3A","#15132A"],tags:["Creative","Social","Performing","Indoor","Free to start"],diff:2,time:"1 hr/week",cost:"₹0 (phone)",isNew:true,
  axes:{ca:40,so:74,pi:66,cr:62,ss:56,nm:52},
  why:"You already have opinions and friends who argue with them. This just adds a record button.",
  related:["improv","filmmaking","writing","language"],
  days:["Record five minutes on one topic","Listen back without cringing","Find a quiet room and re-record","Interview a friend for ten minutes","Cut it down to the best five","Add an intro and an outro","Publish episode zero"]},

 {id:"singing",name:"Singing",icon:"i-mic",g:["#4A1A2E","#171429"],tags:["Creative","Music","Performing","Free to start"],diff:2,time:"15 min/day",cost:"₹0",isNew:true,
  axes:{ca:22,so:62,pi:40,cr:62,ss:52,nm:66},
  why:"The instrument you already own. Almost everyone can learn to sing in tune — really.",
  related:["guitar","piano","improv","dance"],
  days:["Warm up for five minutes","Match five notes from a piano app","Breathe from the diaphragm","Sing one verse in tune","Record it and listen honestly","Learn one harmony line","Sing the full song for one person"]},

 {id:"piano",name:"Piano",icon:"i-keys",g:["#23233A","#121424"],tags:["Creative","Music","Solo","Indoor"],diff:3,time:"20 min/day",cost:"₹0 (app) – ₹6,000",isNew:true,
  axes:{ca:40,so:36,pi:52,cr:66,ss:24,nm:84},
  why:"Every piece of music makes more sense once you can see it laid out on a keyboard.",
  related:["guitar","singing","drumming","djing"],
  days:["Find middle C and name every white key","Play a C major scale, right hand","Play it with the left hand","Learn three chords: C, F and G","Play chords under a simple melody","Learn the first line of a song you love","Play it hands together, slowly"]},

 {id:"drumming",name:"Drumming",icon:"i-drum",g:["#3A2018","#161421"],tags:["Music","Physical","Performing","Competitive"],diff:3,time:"20 min/day",cost:"₹0 (practice pad)",isNew:true,
  axes:{ca:50,so:56,pi:22,cr:40,ss:40,nm:72},
  why:"Rhythm is maths you can feel. Also the best legal way to hit things.",
  related:["djing","boxing","guitar","dance"],
  days:["Keep steady quarter notes to a click","Play a basic rock beat","Add eighth notes on the hi-hat","Hold the beat for two minutes straight","Learn one fill","Play along to a slow song","Speed the click up by 10 bpm"]},

 {id:"improv",name:"Improv comedy",icon:"i-mask",g:["#4A1830","#16132A"],tags:["Social","Performing","Creative"],diff:3,time:"2 hrs/week",cost:"₹500/class",isNew:true,
  axes:{ca:30,so:92,pi:62,cr:60,ss:92,nm:40},
  why:"Say yes, make your scene partner look good, and stop over-planning everything else too.",
  related:["podcasting","dance","singing","writing"],
  days:["Use 'yes, and' in one real conversation","Tell a story one word at a time with a friend","Do a two-line scene","Commit to one character for a minute","Watch an improv set and steal one move","Do a three-minute scene","Perform at a beginner jam"]},

 {id:"writing",name:"Creative writing",icon:"i-feather",g:["#2E2440","#151427"],tags:["Creative","Solo","15-minute","Free to start"],diff:2,time:"20 min/day",cost:"₹0",isNew:true,
  axes:{ca:24,so:16,pi:74,cr:80,ss:56,nm:62},
  why:"You already narrate your life in your head. Put it somewhere other people can read it.",
  related:["journaling","podcasting","calligraphy","filmmaking"],
  days:["Write 200 words about a stranger","Write a scene using only dialogue","Describe a room with all five senses","Write a 100-word story","Rewrite yesterday's piece shorter","Write a full first page","Share one piece with a reader"]},

 {id:"stargazing",name:"Stargazing",icon:"i-telescope",g:["#141C40","#0E111E"],tags:["Outdoor","Solo","Relaxing","Free to start"],diff:1,time:"30 min/night",cost:"₹0",isNew:true,
  axes:{ca:70,so:30,pi:76,cr:92,ss:62,nm:66},
  why:"Look up for ten minutes and your problems become appropriately small.",
  related:["birdwatching","photography","hiking","journaling"],
  days:["Find the brightest planet tonight","Learn one constellation","Let your eyes adjust to the dark for 20 minutes","Spot the edge of light on the Moon","Find Orion's belt","Track the Moon for three nights","Photograph the night sky on your phone"]},

 {id:"badminton",name:"Badminton",icon:"i-shuttle",g:["#2A3A18","#131A1E"],tags:["Physical","Social","Competitive"],diff:2,time:"1 hr",cost:"₹1,200",isNew:true,
  axes:{ca:60,so:74,pi:12,cr:22,ss:50,nm:62},
  why:"Fast, social, and there's a court within a couple of kilometres of almost everyone.",
  related:["bouldering","running","boxing","chess"],
  days:["Learn the correct grip","Rally 20 shots without missing","Learn the high serve","Clear to the back line","Learn the drop shot","Play one full game to 21","Play doubles with strangers"]},

 {id:"speedcubing",name:"Speedcubing",icon:"i-cube",g:["#3A2A14","#141420"],tags:["Analytical","Solo","Competitive","15-minute"],diff:2,time:"15 min/day",cost:"₹300",isNew:true,
  axes:{ca:86,so:28,pi:70,cr:26,ss:24,nm:86},
  why:"A puzzle with a stopwatch. Your first solve without notes is genuinely thrilling.",
  related:["chess","lockpicking","card-magic","coding"],
  days:["Solve the white cross","Finish the first layer","Solve the middle layer","Make the yellow cross","Solve the whole cube with notes","Solve it without notes","Get under three minutes"]},

 {id:"graphic-design",name:"Graphic design",icon:"i-layers",g:["#401A3A","#161428"],tags:["Creative","Analytical","Solo","Free to start"],diff:3,time:"30 min/day",cost:"₹0 (free tools)",isNew:true,
  axes:{ca:48,so:34,pi:66,cr:62,ss:40,nm:70},
  why:"Taste plus rules. You'll never look at a badly made poster the same way again.",
  related:["digital-illustration","photography","coding","filmmaking"],
  days:["Recreate a poster you like","Pair two fonts that work together","Build a three-colour palette","Design a poster with type only","Make a logo for a fake brand","Redesign a menu or flyer","Design something someone will actually use"]},

 {id:"game-design",name:"Game design",icon:"i-gamepad",g:["#1F2A48","#121424"],tags:["Creative","Analytical","Social"],diff:3,time:"45 min/day",cost:"₹0",isNew:true,
  axes:{ca:62,so:58,pi:72,cr:44,ss:42,nm:66},
  why:"You've played thousands of hours of games. Designing one teaches you why they worked.",
  related:["coding","chess","graphic-design","writing"],
  days:["Change one rule of a game you know","Design a game that uses only a coin","Playtest it with a friend","Write down what felt unfair","Prototype a card game on paper","Playtest with three people","Fix the most boring moment"]},

 {id:"language",name:"Learning a language",icon:"i-globe",g:["#183A34","#121A22"],tags:["Analytical","Social","15-minute","Free to start"],diff:2,time:"15 min/day",cost:"₹0",isNew:true,
  axes:{ca:70,so:62,pi:84,cr:60,ss:30,nm:78},
  why:"Fifteen minutes a day, and within a month you'll order dinner in someone else's language.",
  related:["podcasting","writing","journaling","cooking"],
  days:["Learn ten words you'd actually use","Introduce yourself out loud","Count to twenty","Catch five words in one song","Swap two minutes of voice notes","Role-play ordering food","Hold a five-minute conversation"]},

 {id:"upcycling",name:"Upcycling & sewing",icon:"i-needle",g:["#3A1A2A","#161428"],tags:["Creative","Hands-on","Solo","Weekend"],diff:2,time:"Weekend project",cost:"₹500",isNew:true,
  axes:{ca:22,so:40,pi:36,cr:74,ss:58,nm:56},
  why:"Old clothes are free material. Thrift, cut, stitch, and wear something nobody else has.",
  related:["knitting","woodworking","painting","graphic-design"],
  days:["Sew on a button properly","Learn running and back stitch","Hem a pair of trousers","Patch a hole visibly and proudly","Tailor one thrift find","Turn an old tee into a tote","Wear your best piece out"]},

 {id:"coffee",name:"Coffee brewing",icon:"i-cup",g:["#3A2414","#16131C"],tags:["Hands-on","Analytical","15-minute","Indoor"],diff:2,time:"15 min/day",cost:"₹1,200",isNew:true,
  axes:{ca:66,so:50,pi:58,cr:78,ss:36,nm:76},
  why:"Change one variable at a time until the cup is exactly right. Science you can drink.",
  related:["mixology","cooking","baking","journaling"],
  days:["Brew a pour-over and taste it black","Weigh your coffee and water","Change only the grind size","Change only the water temperature","Taste two origins side by side","Write down your perfect ratio","Brew a cup for someone who loves coffee"]},

 {id:"stop-motion",name:"Stop-motion animation",icon:"i-frames",g:["#402418","#16142A"],tags:["Creative","Hands-on","Solo","Indoor"],diff:3,time:"45 min/day",cost:"₹0 (phone)",isNew:true,
  axes:{ca:30,so:30,pi:52,cr:70,ss:34,nm:70},
  why:"Twelve photos make one second. It's slow and absurd, and pure magic when it plays back.",
  related:["filmmaking","photography","pottery","digital-illustration"],
  days:["Animate a coin sliding across a table","Keep the camera perfectly still","Shoot at 12 frames per second","Animate a clay ball bouncing","Add ease-in and ease-out","Add one sound effect","Make a ten-second scene"]},

 {id:"digital-illustration",name:"Digital illustration",icon:"i-tablet",g:["#3A1A48","#15132A"],tags:["Creative","Solo","Indoor"],diff:3,time:"30 min/day",cost:"₹0 (phone app)",isNew:true,
  axes:{ca:18,so:28,pi:52,cr:70,ss:54,nm:66},
  why:"Infinite undo, infinite paper. The fastest way to find out whether you like drawing.",
  related:["sketching","graphic-design","painting","stop-motion"],
  days:["Draw using only three brushes","Learn to use layers properly","Ink over a rough sketch","Colour with a limited palette","Add simple lighting","Draw one character in three poses","Finish a piece you'd post"]},

 {id:"candle-making",name:"Candle making",icon:"i-flame",g:["#4C2A12","#1A1422"],tags:["Creative","Hands-on","Indoor","Weekend","Relaxing"],diff:1,time:"Weekend project",cost:"₹999",isNew:true,
  axes:{ca:30,so:44,pi:40,cr:86,ss:48,nm:52},
  why:"Melt, pour, wait. You get a gift, a scent you chose, and a very calm afternoon.",
  related:["terrarium","pottery","baking","knitting"],
  days:["Melt wax safely in a double boiler","Centre a wick properly","Pour your first container candle","Add fragrance at the right temperature","Test two scents side by side","Colour a batch","Make one for someone"]},

 {id:"card-magic",name:"Card magic",icon:"i-cards",g:["#2A1A40","#141228"],tags:["Performing","Social","Hands-on","15-minute"],diff:3,time:"15 min/day",cost:"₹150",isNew:true,
  axes:{ca:56,so:70,pi:56,cr:52,ss:34,nm:82},
  why:"Practise alone, perform for anyone. One good trick makes you the most interesting person at dinner.",
  related:["speedcubing","improv","lockpicking","origami"],
  days:["Learn a clean overhand shuffle","Force a card on a friend","Perform one self-working trick","Learn the double lift","Practise in front of a mirror","Perform for one friend","Build a three-trick routine"]}

];

const CATEGORIES = [
 {t:"Trending this week", ids:["bouldering","djing","pottery","badminton","speedcubing","running","coffee","chess","podcasting","cooking"]},
 {t:"New on HobbyFlix", rule:h=>h.isNew},
 {t:"15-minute hobbies", tag:"15-minute"},
 {t:"Weekend projects", tag:"Weekend"},
 {t:"Make some noise", tag:"Music"},
 {t:"Get off the couch", tag:"Physical"},
 {t:"For the problem solvers", tag:"Analytical"},
 {t:"Hidden gems", ids:["lockpicking","card-magic","stargazing","bonsai","stop-motion","origami","mixology","birdwatching","calligraphy","candle-making"]}
];

const FILTERS = ["All","Creative","Analytical","Physical","Music","Social","Solo","Hands-on","Performing","Outdoor","Indoor","15-minute","Weekend","Free to start","Relaxing","Competitive"];

const BOXES = [
 {id:"bx-photo",name:"Beginner photography box",price:"₹1,499",icon:"i-camera",g:["#5A1E3E","#1C1630"],diff:"Beginner",setup:"10 min",
  incl:["Clip-on 0.45x wide lens","Reflector card + diffuser","52-card composition deck","7-day printed trial sheet"]},
 {id:"bx-pot",name:"Pottery starter box",price:"₹1,299",icon:"i-pottery",g:["#5B2A18","#201525"],diff:"Beginner",setup:"20 min",
  incl:["1.5 kg air-dry clay","Wire, rib and loop tools","Canvas work mat","Glaze sampler, three colours"]},
 {id:"bx-paint",name:"Painting starter box",price:"₹899",icon:"i-paint",g:["#4A1C2A","#1A1428"],diff:"Beginner",setup:"5 min",
  incl:["Six acrylic tubes","Three brushes, one palette knife","Four canvas boards","Mixing guide card"]},
 {id:"bx-candle",name:"Candle making box",price:"₹999",icon:"i-flame",g:["#4C2A12","#1A1422"],diff:"Beginner",setup:"15 min",
  incl:["500 g soy wax flakes","Cotton wicks and holders","Two fragrance oils","Three reusable tins"]},
 {id:"bx-chess",name:"Chess starter box",price:"₹799",icon:"i-chess",g:["#1B2440","#141222"],diff:"Beginner",setup:"2 min",
  incl:["Roll-up tournament board","Weighted plastic set","Opening pattern cards","Puzzle booklet, 60 positions"]}
];

const EXPERIENCES = [
 {id:"ex1",name:"Pottery wheel workshop",hobby:"pottery",host:"Terra Studio",km:2.4,price:"₹799",rating:4.8,date:"Sat 26 Sep · 10:00",icon:"i-pottery",g:["#5B2A18","#201525"]},
 {id:"ex2",name:"Beginner photography walk",hobby:"photography",host:"Frame Collective",km:4.1,price:"₹499",rating:4.9,date:"Sun 27 Sep · 06:30",icon:"i-camera",g:["#5A1E3E","#1C1630"]},
 {id:"ex3",name:"DJ fundamentals, part one",hobby:"djing",host:"Basement Audio",km:6.8,price:"₹1,299",rating:4.7,date:"Fri 2 Oct · 19:00",icon:"i-dj",g:["#3C1A52","#15142B"]},
 {id:"ex4",name:"Beginner salsa class",hobby:"dance",host:"Sur Dance Co.",km:3.2,price:"₹699",rating:4.6,date:"Wed 30 Sep · 20:00",icon:"i-dance",g:["#4A1840","#17142C"]},
 {id:"ex5",name:"Sunrise birding, wetlands",hobby:"birdwatching",host:"City Naturalists",km:11.5,price:"₹350",rating:4.9,date:"Sun 27 Sep · 05:45",icon:"i-bird",g:["#1D3A3A","#131A22"]},
 {id:"ex7",name:"Intro to bouldering",hobby:"bouldering",host:"Crux Climbing Gym",km:3.9,price:"₹650",rating:4.8,date:"Thu 1 Oct · 18:30",icon:"i-climb",g:["#3A2A1A","#15141E"]},
 {id:"ex8",name:"Badminton social night",hobby:"badminton",host:"Shuttle Club",km:1.6,price:"₹300",rating:4.7,date:"Tue 29 Sep · 19:30",icon:"i-shuttle",g:["#2A3A18","#131A1E"]},
 {id:"ex9",name:"Open mic for first-timers",hobby:"singing",host:"The Back Room",km:5.7,price:"₹200",rating:4.6,date:"Fri 2 Oct · 20:00",icon:"i-mic",g:["#4A1A2E","#171429"]},
 {id:"ex6",name:"Sourdough from scratch",hobby:"baking",host:"Flour & Time",km:5.3,price:"₹1,100",rating:4.8,date:"Sat 3 Oct · 09:00",icon:"i-bake",g:["#4A3416","#1A1520"]}
];

const FRIENDS = [
 {n:"Rahul",h:"photography",lvl:3,streak:12},
 {n:"Aarav",h:"chess",lvl:5,streak:27},
 {n:"Maya",h:"pottery",lvl:2,streak:8},
 {n:"Ishita",h:"djing",lvl:4,streak:15},
 {n:"Kabir",h:"boxing",lvl:2,streak:5}
];

const FEED = [
 ["Maya","finished the 7-day pottery trial and rated it","hooked"],
 ["Aarav","dropped calligraphy on day 4 —","no hard feelings"],
 ["Ishita","beat her own record:","a 20-minute live set"],
 ["Rahul","booked the sunrise photography walk for","Sunday"]
];

const QUESTIONS = [
 {q:"How do you want to spend a free Saturday?", hint:"Pick the one you'd actually do, not the one that sounds good.",
  o:[{t:"Making something",d:{ca:-20,pi:-8}},{t:"Going somewhere",d:{ss:16,pi:-14,nm:-12}},{t:"Learning something",d:{ca:12,pi:16,nm:14}},
     {t:"Competing",d:{cr:-24,pi:-6}},{t:"Chilling alone",d:{so:-20,cr:16}},{t:"With people",d:{so:22,cr:8}}]},
 {q:"Pick your ideal challenge", hint:"The version of hard that feels worth it.",
  o:[{t:"Master a skill",d:{nm:22,ss:-12}},{t:"Create something beautiful",d:{ca:-22}},{t:"Get physically better",d:{pi:-24}},
     {t:"Solve difficult problems",d:{ca:24,pi:14}},{t:"Meet new people",d:{so:24}}]},
 {q:"How much time can you realistically give it?", hint:"Be honest — this changes what we recommend, not how much we like you.",
  o:[{t:"15 minutes a day",d:{ss:10,nm:-12}},{t:"30 minutes a day",d:{}},{t:"An hour a day",d:{nm:12,ss:-8}},{t:"Weekends only",d:{ss:14}}]},
 {q:"What sounds more satisfying?", hint:"One of these should feel slightly obvious.",
  o:[{t:"Creating",d:{ca:-18}},{t:"Winning",d:{cr:-22}},{t:"Learning",d:{nm:14,pi:10}},{t:"Performing",d:{so:18}},{t:"Exploring",d:{ss:18,nm:-14}}]},
 {q:"Where do you feel most like yourself?", hint:"Setting matters more than subject.",
  o:[{t:"Somewhere quiet indoors",d:{so:-14,pi:8,cr:12}},{t:"Outdoors and moving",d:{pi:-20,ss:12}},
     {t:"A room full of people",d:{so:22}},{t:"Anywhere, headphones on",d:{so:-12,cr:10}}]},
 {q:"Your last attempt at a hobby ended because…", hint:"No judgement. This is the useful question.",
  o:[{t:"It got expensive",d:{ss:6,nm:-6}},{t:"It got boring",d:{nm:-18,ss:10}},{t:"Life got busy",d:{ss:8}},
     {t:"I got decent and moved on",d:{nm:-10,cr:-8}},{t:"It didn't — I'm still doing it",d:{nm:16}}]},
 {q:"What would count as a first win?", hint:"Day seven, what's in your hands?",
  o:[{t:"Something I can hold",d:{ca:-20,pi:-10}},{t:"A score that went up",d:{cr:-20,nm:10}},
     {t:"Something I finally understood",d:{ca:20,pi:18}},{t:"Something worth posting",d:{so:14,ca:-12}}]}
];

const AXES_META = [
 {k:"ca",l:"Creative",r:"Analytical"},
 {k:"so",l:"Solo",r:"Social"},
 {k:"pi",l:"Physical",r:"Intellectual"},
 {k:"cr",l:"Competitive",r:"Relaxed"},
 {k:"ss",l:"Structured",r:"Spontaneous"},
 {k:"nm",l:"Novelty",r:"Mastery"}
];

const BADGES = [
 {id:"explorer",n:"Explorer",req:"5 hobbies explored",icon:"i-compass",test:s=>s.explored.length>=5,prog:s=>s.explored.length/5},
 {id:"adventurer",n:"Adventurer",req:"10 hobbies explored",icon:"i-map",test:s=>s.explored.length>=10,prog:s=>s.explored.length/10},
 {id:"finisher",n:"Finisher",req:"3 trials completed",icon:"i-trophy",test:s=>s.completed.length>=3,prog:s=>s.completed.length/3},
 {id:"obsessed",n:"Obsessed",req:"30-day streak",icon:"i-flame",test:s=>s.streak>=30,prog:s=>s.streak/30}
];

const PLANS = [
 {id:"free",n:"Free",d:"See what fits before you pay",amt:"₹0",per:"forever",hot:false,cta:"Start exploring",
  f:["Hobby recommendations","Basic discovery feed","Hobby passport","One 7-day sprint a month"]},
 {id:"digital",n:"Digital",d:"The full discovery engine",amt:"₹199",per:"/mo",hot:false,cta:"Go Digital",
  f:["Unlimited 7-day sprints","Taste profile diagnostic","Global digital cohorts"]},
 {id:"starter",n:"Starter Pack",d:"Discovery, plus something to hold",amt:"₹499",per:"/mo",hot:true,cta:"Get Starter Pack",
  f:["All digital features included","1 curated catalyst kit monthly","Zero wasteful starter clutter"]},
 {id:"explorer",n:"Explorer Pass",d:"Take it off the screen",amt:"₹999",per:"/mo",hot:false,cta:"Get Explorer Pass",
  f:["Digital platform and kit","1 local studio workshop entry","VIP neighborhood circles"]}
];

const FLY = [
 {s:"Users",t:"More users",d:"Curious people arrive for one recommendation"},
 {s:"Signals",t:"More hobby data",d:"Every trial logs what they kept and dropped"},
 {s:"Matching",t:"Better recommendations",d:"The engine learns which traits predict sticking"},
 {s:"Wins",t:"More successful discoveries",d:"People find hobbies that actually fit"},
 {s:"Retention",t:"Higher retention",d:"A hobby that fits keeps the app open for months"},
 {s:"Partners",t:"More partners",d:"Studios follow the beginners we send them"},
 {s:"Offline",t:"More experiences",d:"Real-world options make discovery worth more"}
];
