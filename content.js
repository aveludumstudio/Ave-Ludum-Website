// Edit this file to change the text, projects and links on the site.
// Filters under "Work" are built automatically from each project's category.
window.siteContent={
// Each project has a case study page at project.html?p=<slug>.
// caseStudy fields only hold what we can show or have confirmed. Leave a field out
// rather than guess; the page skips any section that has nothing in it.
//   challenge / approach: one or two sentences each
//   features: list of what users can do in it
//   statusNote: a line about where the project is now
//   contribution: what Ave Ludum did on it
//   feedback: {quote, source}, only real client feedback for this project
// gallery items are pictures, or short clips when they have "video" ("image" is the clip's poster).
work:[
{slug:"avels-heavy-vehicle-simulator",title:"AVELS Heavy Vehicle Simulator",type:"Multiplayer training simulator",category:"Simulation",kind:"Internal prototype",status:"Ready for testing",image:"assets/avels/avels-snowy-yard.webp",
 description:"A multiplayer PC simulator for heavy equipment. Trainees drive dump trucks, wheel loaders and backhoes around a work yard, guided by spotters on foot using hand signals and voice chat.",
 role:"Simulation design, vehicle systems, multiplayer",stack:["Unity 6","C#","Netcode for GameObjects","Vivox voice chat","PC"],
 caseStudy:{
  challenge:"Several people have to work the same yard at once: drivers in different machines, and spotters on foot guiding them. The simulator needs all of them in one shared session, talking and signalling to each other.",
  approach:"A networked Unity session built on Netcode for GameObjects that players join with a code. Each machine has its own controls and a cab view, spotters walk the yard on foot, and everyone can talk with push-to-talk voice or send hand signals from a gesture wheel. The yard is shown in snow and in rain.",
  features:["Drive a dump truck, a wheel loader and a backhoe","First-person cab view","Load rocks with the loader and tip them from the dump truck","Join a shared session with a join code, up to 4 players so far","Push-to-talk voice chat between players","Spotters send hand signals from a gesture wheel","Snow and rain, with mud building up on the vehicles"],
  statusNote:"In progress and ready for testing. The PC build runs multiplayer sessions with up to 4 concurrent players so far.",
  contribution:"Built in-house by Ave Ludum as a prototype. It can be adapted into the simulator a client needs: different vehicles, equipment, sites or training procedures."
 },
 gallery:[
  {video:"assets/avels/avels-loading.mp4",image:"assets/avels/avels-loading.webp",alt:"A wheel loader raises its bucket over a dump truck",caption:"Loading the dump truck with a wheel loader."},
  {video:"assets/avels/avels-tipping.mp4",image:"assets/avels/avels-tipping.webp",alt:"A dump truck tips its bed and drops a load of rocks",caption:"Tipping the load at the drop-off point."},
  {video:"assets/avels/avels-spotter.mp4",image:"assets/avels/avels-spotter.webp",alt:"A worker in a hi-vis vest waves a dump truck forward",caption:"A spotter on foot guides the driver in with hand signals."},
  {video:"assets/avels/avels-gestures.mp4",image:"assets/avels/avels-gestures.webp",alt:"A worker picks a hand signal from a radial menu",caption:"Spotters pick hand signals from a quick gesture wheel."},
  {video:"assets/avels/avels-cab-view.mp4",image:"assets/avels/avels-cab-view.webp",alt:"Cab view of a loader lifting rocks toward a row of skips",caption:"Operating the loader from the cab."},
  {image:"assets/avels/avels-snowy-yard.webp",alt:"Trucks, a trailer and wheel loaders parked in a snowy yard between brick warehouses",caption:"The yard under snow."},
  {image:"assets/avels/avels-loaders.webp",alt:"A backhoe and a wheel loader covered in snow beside a dump truck",caption:"Backhoe, wheel loader and dump truck."},
  {image:"assets/avels/avels-rain-truck.webp",alt:"A mud-covered dump truck in the rain outside a brick warehouse",caption:"Rain, and a mud-caked dump truck."}
 ]},
{slug:"the-legend-of-toakala",title:"The Legend of Toakala",type:"Mobile folklore adventure",category:"Games",kind:"Original IP",status:"In development",image:"assets/toakala/tk-explore.webp",
 description:"Our original mobile game: a 3D adventure that retells the Toa Kala folktale from Maros, South Sulawesi, as something you can walk through and play.",
 role:"Game development, level design, narrative, 3D",stack:["Unity 6","C#","Mobile (Android)"],
 caseStudy:{
  challenge:"Turn a folktale from Maros into a game people can play on their phones, while staying true to the region's landscapes, stories and culture.",
  approach:"Story first: the story is written with storywriter Rizka Aulia Sabila and discussed with Dinas Kebudayaan dan Kepariwisataan Sulawesi Selatan. Each level is planned on paper as a route, explored in mood paintings, then built in Unity for mobile. The painted concept style carries into the game's story cutscenes, and local heritage is woven into the quests.",
  features:["Explore forests, rivers, karst cliffs and a royal village","Touch controls with an on-screen joystick, jump and sprint","Quests with on-screen objectives and distance markers","Dialogue with character portraits","Painted story cutscenes with narration","A Lipa' Sabbe weaving puzzle: match a traditional pattern thread by thread","Notes on local heritage, like the Bugis silk sarong","A cave puzzle built around the handprints of Leang-Leang","Catching Bantimurung butterflies"],
  statusNote:"In development for mobile, with a new art style. Pitched to Dinas Kebudayaan dan Kepariwisataan Sulawesi Selatan on 31 October 2026.",
  contribution:"Our own game: concept, game and level design, art and development by Ave Ludum, with the story written together with Rizka Aulia Sabila."
 },
 gallery:[
  {video:"assets/toakala/tk-explore.mp4",image:"assets/toakala/tk-explore.webp",alt:"Toakala, a white monkey warrior, runs along a stone path with touch controls on screen",caption:"Exploring with touch controls."},
  {video:"assets/toakala/tk-cutscene.mp4",image:"assets/toakala/tk-cutscene.webp",alt:"A greyscale painted scene of a jungle kingdom gate with narration text",caption:"A painted story cutscene."},
  {video:"assets/toakala/tk-weaving.mp4",image:"assets/toakala/tk-weaving.webp",alt:"A weaving puzzle matching a red, yellow and purple sarong pattern",caption:"The Lipa' Sabbe weaving puzzle, then a note on the Bugis silk sarong."},
  {video:"assets/toakala/tk-dialogue.mp4",image:"assets/toakala/tk-dialogue.webp",alt:"Toakala meets Putri I Bissu Daeng, with character portraits in the dialogue box",caption:"Meeting Putri I Bissu Daeng."},
  {video:"assets/toakala/tk-handprints.mp4",image:"assets/toakala/tk-handprints.webp",alt:"Toakala runs through a rocky cave area touching red handprints on the walls",caption:"The Leang-Leang handprint puzzle."},
  {video:"assets/toakala/tk-village.mp4",image:"assets/toakala/tk-village.webp",alt:"A village street with thatched houses and tall tiered roofs in the distance",caption:"The royal village."},
  {image:"assets/toakala/tk-lagoon-huts.webp",alt:"A turquoise lagoon with lily pads and thatched huts on the far bank",caption:"The lagoon."},
  {image:"assets/toakala/tk-forest-lagoon.webp",alt:"A woman in green stands by a lagoon in the forest",caption:"Forest lagoon."},
  {image:"assets/toakala/tk-bridge.webp",alt:"A wooden bridge leading into a misty forest",caption:"A bridge into the mist."},
  {image:"assets/toakala/tk-river-hut.webp",alt:"A shallow river running past a thatched hut in the forest",caption:"River crossing."},
  {image:"assets/toakala/tk-title.webp",alt:"The Legend of Toa Kala title screen with Play, About and Quit",caption:"Title screen."},
  {image:"assets/concept-toakala-lakeside.webp",alt:"Greyscale painting of a long-haired figure standing by a lake, with butterflies and karst hills behind",caption:"Concept painting: lakeside."},
  {image:"assets/concept-toakala-village-gate.webp",alt:"Greyscale painting of a torch-lit stone archway leading into a jungle village",caption:"Concept painting: village gate."}
 ]},
{slug:"supermarket-vr",title:"Supermarket VR",type:"VR training simulator",category:"VR / XR",kind:"Client project",status:"Delivered",image:"assets/project-supermarket-vr.jpg",
 description:"A VR recreation of a client's supermarket, built so staff can practise checkout and customer service before they ever stand at a real till.",
 role:"Simulation design, 3D environment, interaction",stack:["Unity","C#","VR"],
 caseStudy:{
  challenge:"Give staff somewhere to practise checkout and customer service before they work at a real till.",
  approach:"Recreate the client's own supermarket in VR, so practice happens in a space that matches the store staff will work in. We tested it with the client on a standalone VR headset.",
  features:["A VR recreation of the client's store","Practise checkout","Practise customer service"],
  statusNote:"Delivered. The client was satisfied and has since asked us for a new project, which is under NDA.",
  feedback:{quote:"Good quality project, as initially agreed.",source:"The client"},
  contribution:"Simulation design, the 3D environment and the VR interactions."
 },
 gallery:[
  {image:"assets/project-supermarket-vr.jpg",alt:"Supermarket VR project image",caption:"Supermarket VR."},
  {video:"assets/supermarket-vr/vr-playtest.mp4",image:"assets/supermarket-vr/vr-playtest.webp",alt:"A tester wearing a VR headset uses the controllers while the VR view shows on a laptop",caption:"Testing with the client in a VR headset."},
  {image:"assets/supermarket-vr/vr-playtest-photo-1.webp",alt:"A tester in a VR headset at a table with a laptop showing the VR view, watched by a colleague",caption:"Client playtest."},
  {image:"assets/supermarket-vr/vr-playtest-photo-2.webp",alt:"A tester in a VR headset holding a controller beside a laptop",caption:"The VR view mirrored on a laptop during testing."}
 ]},
{slug:"pilah-bumi",title:"Pilah Bumi",type:"Environmental mobile game",category:"Simulation",status:"Base game complete",image:"assets/project-pilah-bumi.png",
 description:"A free-roam waste sorting game for mobile. You pick up litter scattered around an open 3D map and sort it into the right bins.",
 role:"Game design, systems, 3D",stack:["Unity 6","C#","Mobile"],
 caseStudy:{
  challenge:"Teach waste sorting by doing it: players have to find the litter themselves and decide which bin each piece belongs in.",
  approach:"A first-person, free-roam neighbourhood with litter scattered around it. Players grab or pick up items, carry them in an inventory, and drop each one into the matching bin until the area is clean.",
  features:["Free-roam 3D neighbourhood","Grab or pick up litter","Carry items in a storage inventory and hotbar","Sort each item into the right bin","An objective counter that tracks the clean-up","Day and night"],
  statusNote:"The base game is complete. An expansion with a new island map has been proposed to a client and is in progress.",
  contribution:"Game design, the gameplay systems and the 3D world."
 },
 gallery:[
  {video:"assets/pilah-bumi/pilah-sorting.mp4",image:"assets/pilah-bumi/pilah-sorting.webp",alt:"Dropping a banana peel into a green bin",caption:"Sorting litter into the right bin."},
  {video:"assets/pilah-bumi/pilah-pickup.mp4",image:"assets/pilah-bumi/pilah-pickup.webp",alt:"A plastic bottle on the road with grab and pick-up prompts",caption:"Finding and picking up litter."},
  {video:"assets/pilah-bumi/pilah-storage.mp4",image:"assets/pilah-bumi/pilah-storage.webp",alt:"A storage grid holding oranges and bananas",caption:"The storage inventory."},
  {video:"assets/pilah-bumi/pilah-complete.mp4",image:"assets/pilah-bumi/pilah-complete.webp",alt:"A Complete banner after the last item is sorted",caption:"Clearing the area completes the task."},
  {image:"assets/project-pilah-bumi.png",alt:"Pilah Bumi title screen with Play and Quit buttons beside two bins",caption:"Title screen."},
  {image:"assets/pilah-bumi/pilah-night.webp",alt:"The neighbourhood at night under street lights",caption:"The neighbourhood at night."}
 ]},
{slug:"mini-dungeon",title:"Mini Dungeon",type:"Mobile roguelite",category:"Games",kind:"In-house",image:"assets/project-mini-dungeon.png",
 description:"A top-down, survivors-style roguelite with procedurally generated maps. Our in-house mobile project.",
 role:"Gameplay systems, procedural generation",stack:["Unity","C#","Mobile"],
 caseStudy:{
  challenge:"Make a mobile roguelite where each run plays out differently.",
  approach:"Procedurally generated maps in a top-down, survivors-style format.",
  features:["Top-down, survivors-style play","Procedurally generated maps","Built for mobile"],
  contribution:"An in-house project: gameplay systems and procedural generation by Ave Ludum."
 }},
{slug:"mager-ar",title:"MAGER AR",type:"Augmented reality",category:"AR",kind:"Community project",status:"Completed",image:"assets/project-mager-ar.png",
 description:"Stickers and keychains for the Makassar Game Developer community that come to life when you point a phone at them.",
 role:"AR app, 3D models",stack:["Unity","AR"],
 caseStudy:{
  challenge:"Bring the community's stickers and keychains to life on a phone.",
  approach:"An AR app that shows 3D models when a phone is pointed at the stickers and keychains.",
  features:["Point a phone at a sticker or keychain","A 3D model appears on it"],
  statusNote:"Completed. We can build a custom version for your own stickers, merchandise or characters.",
  contribution:"The AR app and its 3D models."
 }},
{slug:"booth-renders",title:"Booth renders",type:"Event visualisation",category:"3D",kind:"Client project",status:"Delivered",image:"assets/project-booth-renders.png",
 description:"Real-time 3D renders of exhibition booths and stands, so clients can see the layout and foot traffic before anything gets built.",
 role:"3D modelling, real-time rendering",stack:["Real-time 3D"],
 caseStudy:{
  challenge:"Show clients what a booth will look like, and how people will move around it, before anything is built.",
  approach:"Model the booths and stands in 3D and render them in real time.",
  features:["Real-time 3D booth and stand layouts","A preview of layout and foot traffic"],
  statusNote:"Delivered to the client.",
  feedback:{quote:"Perfect for visualising projects — better than expected.",source:"The client"},
  contribution:"3D modelling and real-time rendering."
 }},
{slug:"key-art",title:"Key art",type:"Visual development",category:"3D",status:"Completed",image:"assets/project-key-art.jpg",
 description:"A painted key art piece from our visual development work.",
 role:"Illustration, visual development",stack:["Digital painting","3D"],
 caseStudy:{
  statusNote:"Completed. We also take commissions for custom key art.",
  contribution:"Illustration and visual development."
 }}
],
// "Level design" section: the Unity top-down layout with clickable stops.
// x/y are the marker's position on the layout image, in percent.
// Stops without a "shot" show a close-up of the layout instead.
levelDesign:{
 image:"assets/toakala-level-layout.webp",width:1551,height:862,
 stops:[
  {name:"Start",x:23.9,y:37.2,note:"The player starts on the forest edge to the west. The cliffs and the cave mouth are the first thing in view."},
  {name:"Cave entrance",x:29.5,y:36.1,shot:"assets/toakala-cliff-path.webp",note:"The route narrows into a stone path between cliff walls, pulling the player toward the light at the far end."},
  {name:"Encounter",x:27.1,y:42.3,shot:"assets/toakala-combat.webp",note:"The first fight sits close to the start, so combat is introduced before the level opens up."},
  {name:"Bridge",x:39.5,y:31.2,note:"A crossing over the river that winds through the middle of the map, linking the cliffs on either side."},
  {name:"Valley",x:46.2,y:54.1,shot:"assets/toakala-lagoon.webp",note:"An open stretch of forest and water: a slower, quieter beat after the tight cliff passages."},
  {name:"Village entrance",x:67.2,y:30.4,shot:"assets/toakala-shrine.webp",note:"The exit to the east, toward Toakala's village and the next part of the story."}
 ]
},
// "Concept art" section. kind:"painting" or "sketch" controls the layout.
conceptArt:[
 {kind:"painting",image:"assets/concept-toakala-lakeside.webp",width:1920,height:1080,title:"Lakeside",
  note:"A greyscale mood painting for light and atmosphere: a quiet shore under the karst hills.",
  alt:"Greyscale painting of a long-haired figure standing by a lake, with butterflies and karst hills behind"},
 {kind:"painting",image:"assets/concept-toakala-village-gate.webp",width:1920,height:1080,title:"Village gate",
  note:"A stone gateway into a jungle village, lit by torches and framed by hanging roots.",
  alt:"Greyscale painting of a torch-lit stone archway at the top of steps, leading into a jungle village"},
 {kind:"sketch",image:"assets/concept-toakala-level2-plan.webp",width:1239,height:2000,title:"Level 2 route",
  note:"The route on paper: a fallen-tree start (A), a karst cliff path (B), the bridge (C), a welcome gate (D) and the village with Balla Lompoa (E).",
  alt:"Notebook page planning level 2 as a route from A to E, with sketches of each area"},
 {kind:"sketch",image:"assets/concept-toakala-story-sketch.webp",width:1156,height:2000,title:"Story and characters",
  note:"Story beats for a level, a forest scene, and studies of the pengawal, the royal guard.",
  alt:"Notebook page with a forest sketch, story notes and drawings of an ape-like guard holding a sword"}
],
// "The team" chapter. Names, roles and job descriptions come from the studio
// portfolio deck. Each photo slot is assets/team/<name>.jpg;
// overwrite the file with a square headshot to replace it. No photo = initial.
// portfolio (optional): link, preview image and kind ("Website" or "PDF").
// socials (optional): [label, url] pairs shown as small links on the card.
team:{
 management:{
  intro:"The studio management are leaders and members of a local game development community in Makassar, working to keep the city's game industry growing.",
  people:[
   {name:"Fri",photo:"assets/team/fri.jpg",fullName:"Ir. Farhan Ramadhani Irsyad Samad Suhaeb, S.Tr.Kom.",role:"Director / Founder",job:"Creative Direction & Production Studio Lead",
    portfolio:{url:"https://thelegokid4455.github.io/FRI-Portfolio-Website/#work",preview:"assets/team/portfolio/fri.jpg",kind:"Website"},
    socials:[["Instagram","https://www.instagram.com/fri.devmode/"],["LinkedIn","https://www.linkedin.com/in/thelegokid4455/"],["X","https://x.com/thelegokid4455"],["YouTube","https://www.youtube.com/channel/UCwUxdnYoyPZ1x41hwLohwRg"],["Facebook","https://facebook.com/thelegokid4455"],["GitHub","https://github.com/thelegokid4455"],["itch.io","https://thelegokid4455.itch.io/"],["Sketchfab","https://sketchfab.com/thelegokid4455"],["Linktree","https://linktr.ee/thelegokid4455"]]},
   {name:"Zaki",photo:"assets/team/zaki.jpg",fullName:"Andi Muhammad Zaki Robbani, S. Kom.",role:"General Manager",job:"Project Management, Team and Client Coordinator"},
   {name:"Muja",photo:"assets/team/muja.jpg",fullName:"Siti Mujadilah, S. Kom.",role:"Administration",job:"Scheduling, Archiving, and Logistical Management"}
  ]
 },
 crew:{
  intro:"The studio team are professional game developers.",
  people:[
   {name:"Dharma",photo:"assets/team/dharma.jpg",fullName:"Muhammad Ikhsan, S. Kom.",role:"Programmer",job:"Gameplay & VR Interaction Developer",
    portfolio:{url:"https://drive.google.com/file/d/16Fv5tDY68ly6WLiTsXpNhMNoMgci5RGN/view",preview:"assets/team/portfolio/dharma.jpg",kind:"PDF"}},
   {name:"Zara",photo:"assets/team/zara.jpg",fullName:"Zara Trimurti Sayojanagandi, S.ST.",role:"2D Generalist",job:"2D Character, Environment and UI Artist",
    portfolio:{url:"https://ztrimurti.portfoliobox.net/",preview:"assets/team/portfolio/zara.jpg",kind:"Website"}},
   {name:"Anes",photo:"assets/team/anes.jpg",fullName:"Annisa Anggrayoga",role:"Marketing",job:"Promotional Strategist, Branding and Public Communication"},
   {name:"Fari",photo:"assets/team/fari.jpg",fullName:"Dzar Ghifari Firjatullah",role:"UI/UX",job:"UI/UX, Branding and Public Communication"},
   {name:"Wildan",photo:"assets/team/wildan.jpg",fullName:"Wildan Dhiya'ul Haq Umar, S.Tr.Kom",role:"2D Artist",job:"2D Character Artist & Generalist",isNew:true},
   {name:"Dara",photo:"assets/team/dara.jpg",fullName:"Dara Aulia Faradiba, S. Kom.",role:"3D Artist",job:"3D Prop Artist & Generalist",isNew:true,
    portfolio:{url:"https://drive.google.com/file/d/1MbJ_L2gnuZMeG0tsCr4je49As-vpdIHg/view",preview:"assets/team/portfolio/dara.jpg",kind:"PDF"}}
  ]
 }
},
// "Behind the scenes" reel: short portrait clips. tag is "Pitch" or "Studio";
// "image" is the poster frame shown before a clip plays.
reel:[
 {tag:"Pitch",video:"assets/studio-life/pitch-title.mp4",image:"assets/studio-life/pitch-title.webp",caption:"Opening the Legend of Toakala pitch."},
 {tag:"Pitch",video:"assets/studio-life/pitch-slides.mp4",image:"assets/studio-life/pitch-slides.webp",caption:"Walking through the game, slide by slide."},
 {tag:"Pitch",video:"assets/studio-life/pitch-concept.mp4",image:"assets/studio-life/pitch-concept.webp",caption:"The game concept, in front of the room."},
 {tag:"Pitch",video:"assets/studio-life/pitch-cutscenes.mp4",image:"assets/studio-life/pitch-cutscenes.webp",caption:"Showing how the cutscenes will look."},
 {tag:"Pitch",video:"assets/studio-life/pitch-feedback.mp4",image:"assets/studio-life/pitch-feedback.webp",caption:"Questions and feedback from the table."},
 {tag:"Studio",video:"assets/studio-life/studio-team.mp4",image:"assets/studio-life/studio-team.webp",caption:"An ordinary afternoon at the studio."},
 {tag:"Studio",video:"assets/studio-life/studio-notebook.mp4",image:"assets/studio-life/studio-notebook.webp",caption:"Scene notes and level layouts, sketched by hand."},
 {tag:"Studio",video:"assets/studio-life/studio-terrain.mp4",image:"assets/studio-life/studio-terrain.webp",caption:"Painting terrain in Unity."},
 {tag:"Studio",video:"assets/studio-life/studio-edit.mp4",image:"assets/studio-life/studio-edit.webp",caption:"Cutting a Legend of Toakala video."},
 {tag:"Studio",video:"assets/studio-life/studio-blockout.mp4",image:"assets/studio-life/studio-blockout.webp",caption:"Blocking out a village in Blender."}
],
studioCopy:[
"Ave Ludum Studio is an independent game development and interactive technology studio dedicated to transforming ideas into engaging digital experiences.",
"We combine creativity, technology, and problem-solving to develop games, interactive applications, immersive environments, and simulation-based experiences.",
"Whether developing a playable prototype, creating an educational experience, or exploring an original game concept, we believe technology becomes meaningful when people can interact with it."
],
// The studio's three divisions, shown in "About"
divisions:[
 {name:"Interactive Solutions",text:"Client-funded development: custom interactive applications, game prototypes, 3D demonstrations and simulations.",link:"services.html",linkText:"Services"},
 {name:"Digital Products",text:"Reusable development tools, Unity assets, game systems, templates and interactive learning products.",link:"#products",linkText:"Coming soon"},
 {name:"Originals",text:"Original games and experimental experiences of our own, starting with The Legend of Toakala.",link:"#originals",linkText:"Ave Ludum Originals"}
],
// "What we do" on the home page. id matches the section on services.html;
// type preselects the project type in the inquiry form. pitch, bestFor and example
// (a project title from "work") are the home page card; text and details are services.html.
whatWeDo:[
 {id:"game-development",title:"Game Development",pitch:"Get a playable game or game feature built in Unity, from a first prototype you can test with players to a finished build.",bestFor:"startups, game teams and brands with a game idea",example:"The Legend of Toakala",text:"Custom games, gameplay systems, mechanics and Unity prototypes, from first playable to finished build.",image:"assets/toakala/tk-explore.webp",alt:"Exploring the forest in The Legend of Toakala, our mobile game",type:"Game Development",
  details:["Custom games and game features","Gameplay systems and mechanics","Unity prototypes and first playables","Interactive entertainment and co-development"],work:["The Legend of Toakala","Mini Dungeon"]},
 {id:"interactive-applications",title:"Interactive Applications",pitch:"Turn a lesson, campaign or process into something people use with their own hands, so it sticks better than slides or a video.",bestFor:"schools, universities, training providers and campaigns",example:"Pilah Bumi",text:"Interactive learning apps, digital experiences, product demonstrations and custom applications.",image:"assets/project-pilah-bumi.png",alt:"Pilah Bumi, a waste sorting simulation",type:"Educational Application",
  details:["Interactive learning applications","Educational games","Digital experiences for events and campaigns","Custom interactive applications"],work:["Pilah Bumi","MAGER AR"]},
 {id:"interactive-3d",title:"Interactive 3D & Visualization",pitch:"Let clients explore a product, booth or space in real-time 3D before anything is built or bought, and decide faster.",bestFor:"manufacturers, exhibitors and property developers",example:"Booth renders",text:"3D environments, interactive product visualization, virtual showrooms and 3D demonstrations.",image:"assets/project-booth-renders.png",alt:"Real-time 3D render of an exhibition booth",type:"Interactive 3D Application",
  details:["3D environments","Interactive product visualization","Virtual showrooms and exhibition previews","3D demonstrations"],work:["Booth renders"]},
 {id:"vr-simulation",title:"VR & Simulation",pitch:"Let people practise risky or expensive tasks safely, in VR or on screen, as often as they need before doing it for real.",bestFor:"industrial, retail and corporate training teams",example:"AVELS Heavy Vehicle Simulator",text:"Virtual reality experiences, training scenarios, educational simulations and interactive demonstrations.",image:"assets/avels/avels-loading.webp",alt:"A wheel loader loading a dump truck in the AVELS simulator",type:"VR / Simulation",
  details:["Virtual reality experiences","Training scenarios and equipment familiarization","Educational simulations","Interactive demonstrations"],work:["AVELS Heavy Vehicle Simulator","Supermarket VR"]}
],
// "Who we work with". work lists related projects on this site (titles must match "work").
segments:[
 {title:"Education & Research",text:"Interactive learning media, educational games, virtual laboratories and training simulations that let students practise instead of just read.",work:["Pilah Bumi"]},
 {title:"Businesses & Industry",text:"Product demonstrations, interactive 3D visualization, equipment familiarization and simulations that show how something works before it's built or bought.",work:["AVELS Heavy Vehicle Simulator","Supermarket VR","Booth renders"]},
 {title:"Tourism & Cultural Institutions",text:"Interactive storytelling, digital heritage experiences and virtual environments that bring local places and stories to new audiences.",work:["The Legend of Toakala"]},
 {title:"Game Developers & Startups",text:"Prototyping, Unity development, technical assistance and co-development for teams that need extra hands or a playable proof of concept.",work:["MAGER AR"]}
],
fieldPhotos:[
{image:"assets/toakala-discussion.jpg",width:2000,height:1125,focus:"center 78%",caption:"Discussing The Legend of Toakala with Achmad Yusran Arief of Dinas Kebudayaan dan Kepariwisataan Sulawesi Selatan and storywriter Rizka Aulia Sabila."},
{image:"assets/team-photo.jpg",width:1800,height:1012,focus:"center 82%",caption:"The team on a field trip in Maros."},
{image:"assets/client-review-field-01.jpg",width:1600,height:1067,caption:"Talking through a project on site."},
{image:"assets/client-review-field-02.jpg",width:1600,height:1067,caption:"Review session during field work."}
],
testimonials:[
{quote:"Good quality project, as initially agreed.",source:"VR simulator client"},
{quote:"Perfect for visualising projects — better than expected.",source:"Booth render client"}
],
process:[
["Discover","Understand your objectives, audience, requirements and project constraints."],
["Design","Develop concepts, user flows, technical specifications and the project scope."],
["Develop","Build, test, refine and optimize the interactive experience, with working builds shared along the way."],
["Deliver","Provide the agreed deliverables, documentation and handover."]
],
// Packaged starting points on services.html. price is a starting estimate in rupiah;
// set showPrices to false to hide every price on the site.
showPrices:true,
offers:[
 {id:"prototype-sprint",title:"Playable Prototype Sprint",for:"Startups, entrepreneurs, game developers and organizations",price:1500000,type:"Game Prototype / MVP",
  includes:["Core gameplay mechanics","Unity prototype development","Basic user interface","One playable scene","Basic build and demonstration"]},
 {id:"3d-product-demo",title:"Interactive 3D Product Demo",for:"Manufacturers, businesses, exhibitions and property developers",price:1500000,type:"Product Visualization",
  includes:["3D product visualization","Interactive object inspection","Camera controls","Product information panels","Basic configurator features"]},
 {id:"educational-module",title:"Educational Interactive Module",for:"Schools, universities and training providers",price:1500000,type:"Educational Application",
  includes:["Interactive learning experiences","Educational games","Virtual laboratory concepts","Interactive assessments","Simulation-based learning"]},
 {id:"vr-training-poc",title:"VR Training Proof of Concept",for:"Corporate training providers, universities and industrial clients",price:3000000,type:"VR / Simulation",
  includes:["VR interaction","Scenario-based learning","Basic training workflows","Demonstration builds","Hardware-specific development where supported"]},
 {id:"unity-support",title:"Unity Technical Support",for:"Independent developers, startups and small development teams",price:150000,unit:"/ hour",type:"Unity Technical Support",
  includes:["Debugging","Performance optimization","C# scripting","Project architecture","Unity troubleshooting"]}
],
// Ave Ludum Originals: the studio's own games
originals:{
 title:"The Legend of Toakala",
 status:"In development",
 text:"Our first original game: a mobile 3D adventure that retells the Toa Kala folktale from Maros, South Sulawesi. Players travel through forests, karst cliffs and a royal village, with quests built around local heritage like Lipa' Sabbe weaving and the handprints of Leang-Leang.",
 facts:[["Status","In development"],["Platform","Mobile"],["Engine","Unity 6"],["Setting","Maros, South Sulawesi"]],
 updates:[
  ["Nov 2026","New art style, with gameplay, quests and painted story cutscenes running on mobile."],
  ["31 Oct 2026","Pitched to Dinas Kebudayaan dan Kepariwisataan Sulawesi Selatan."]
 ],
 images:["assets/toakala/tk-lagoon-huts.webp","assets/toakala/tk-explore.webp","assets/toakala/tk-village-street.webp"]
},
// Digital products for sale. Leave empty until something is ready to buy;
// the section then shows what's planned, clearly marked as coming soon.
products:[],
plannedProducts:["Unity starter templates","Reusable gameplay systems","UI kits","3D asset packs","Educational interactive templates","Development tools"],
// Project inquiry form.
// endpoint: the inquiry backend URL. The studio backend is the Google Apps Script web app in
//   backend/apps-script (setup in backend/README.md); its URL ends in /exec. A form service that
//   accepts JSON (Formspree, Web3Forms…) also works: set provider to "" for those.
//   Empty = the form opens the visitor's email app with the inquiry filled in instead.
// whatsapp: the studio's WhatsApp number in international format without "+" (e.g. 6281234567890).
//   Empty = the WhatsApp button is hidden.
inquiry:{endpoint:"https://script.google.com/macros/s/AKfycbxexXseOPBu4rNTzmuWDCVVDuumsGxFIv7Wb9hk_gL2K1JtPPVvb1N5x4KkVgRHhPk_sw/exec",provider:"apps-script",whatsapp:""},
email:"ave.ludum@gmail.com",
location:{
 intro:"We work out of a small house on a quiet street in Rappocini, Makassar. Look for the sign above the gate.",
 photo:"assets/studio-front.webp",
 photoAlt:"The front of the studio: a small house behind a black gate, with an Ave Ludum Studio banner hanging from the carport",
 address:["Jln. Mapala IV, Blok E30 No. 13","Tidung, Kec. Rappocini","Makassar, South Sulawesi 90222"],
 mapsUrl:"https://maps.app.goo.gl/prLRSztEHbN9Wsh98",
 // Google Maps place embed for the studio's listing (pinned by place ID, no API key needed)
 embedUrl:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1200!2d119.4414785!3d-5.1678416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbee3c33fcef485%3A0x6dc7682745e6b7e6!2sAve%20Ludum%20Studio!5e0!3m2!1sen!2sid!4v1760900000000!5m2!1sen!2sid"
},
contact:[["Email","ave.ludum@gmail.com","mailto:ave.ludum@gmail.com"],["Instagram","@ave.ludum","https://www.instagram.com/ave.ludum/"],["LinkedIn","Ave Ludum Studio","https://www.linkedin.com/company/ave-ludum-studio"],["Facebook","Ave Ludum Studio","https://www.facebook.com/profile.php?id=61594251814646"],["Studio","Open in Google Maps","https://maps.app.goo.gl/prLRSztEHbN9Wsh98"],["GitHub","aveludumstudio","https://github.com/aveludumstudio"]],
// studio social accounts, shown in the footer
socials:[["Instagram","https://www.instagram.com/ave.ludum/"],["LinkedIn","https://www.linkedin.com/company/ave-ludum-studio"],["Facebook","https://www.facebook.com/profile.php?id=61594251814646"],["GitHub","https://github.com/aveludumstudio"]]
};
