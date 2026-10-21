// Edit this file to change the text, projects and links on the site.
// Filters under "Work" are built automatically from each project's category.
window.siteContent={
work:[
{title:"The Legend of Toakala",type:"Folklore game",category:"Games",image:"assets/toakala-combat.webp",
 description:"A 3D game from Maros that retells the Toa Kala folktale as something you can walk through and play.",
 role:"Game development, level design, narrative, 3D",stack:["Unity","3D"],
 gallery:[
  {image:"assets/toakala-combat.webp",alt:"A white-furred hero with a sword faces an enemy in a sunlit forest ruin"},
  {image:"assets/toakala-cliff-path.webp",alt:"A stone path winding between tall cliffs toward a glowing doorway"},
  {image:"assets/toakala-lagoon.webp",alt:"A turquoise lagoon surrounded by jungle and stone pillars"},
  {image:"assets/toakala-shrine.webp",alt:"A stone throne and torches below a wooden stairway leading up to a hut"},
  {image:"assets/toakala-level-layout.webp",alt:"Top-down view of the level in the Unity editor"}
 ]},
{title:"Supermarket VR",type:"VR training simulator",category:"VR / XR",image:"assets/project-supermarket-vr.jpg",
 description:"A VR recreation of a client's supermarket, built so staff can practise checkout and customer service before they ever stand at a real till.",
 role:"Simulation design, 3D environment, interaction",stack:["Unity","C#","VR"]},
{title:"Pilah Bumi",type:"Environmental simulation",category:"Simulation",image:"assets/project-pilah-bumi.png",
 description:"A free-roam waste sorting sim. You pick up litter scattered around an open 3D map and sort it into the right bins.",
 role:"Game design, systems, 3D",stack:["Unity","C#"]},
{title:"Mini Dungeon",type:"Mobile roguelite",category:"Games",image:"assets/project-mini-dungeon.png",
 description:"A top-down, survivors-style roguelite with procedurally generated maps. Our in-house mobile project.",
 role:"Gameplay systems, procedural generation",stack:["Unity","C#","Mobile"]},
{title:"MAGER AR",type:"Augmented reality",category:"AR",image:"assets/project-mager-ar.png",
 description:"Stickers and keychains for the Makassar Game Developer community that come to life when you point a phone at them.",
 role:"AR app, 3D models",stack:["Unity","AR"]},
{title:"Booth renders",type:"Event visualisation",category:"3D",image:"assets/project-booth-renders.png",
 description:"Real-time 3D renders of exhibition booths and stands, so clients can see the layout and foot traffic before anything gets built.",
 role:"3D modelling, real-time rendering",stack:["Real-time 3D"]},
{title:"Key art",type:"Visual development",category:"3D",image:"assets/project-key-art.jpg",
 description:"A painted key art piece from our visual development work.",
 role:"Illustration, visual development",stack:["Digital painting","3D"]}
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
studioCopy:[
"Ave Ludum Studio is an independent studio from Makassar, South Sulawesi. Alongside original games inspired by Indonesian places and folklore, we build interactive work for clients—combining game-development thinking with clear scope, practical prototypes, and collaborative delivery."
],
fieldPhotos:[
{image:"assets/team-photo.jpg",width:1800,height:1012,caption:"The team on a field trip in Maros."},
{image:"assets/client-review-field-01.jpg",width:1600,height:1067,caption:"Talking through a project on site."},
{image:"assets/client-review-field-02.jpg",width:1600,height:1067,caption:"Review session during field work."}
],
testimonials:[
{quote:"Good quality project, as initially agreed.",source:"VR simulator client"},
{quote:"Perfect for visualising projects — better than expected.",source:"Booth render client"}
],
services:[
["Unity Prototypes & Gameplay","Test a mechanic or concept with a focused playable build. Useful for pitches, proof-of-concept work, and early validation."],
["Interactive 3D & Product Demos","Let customers explore a product, space, or process through a simple interactive experience built for an agreed platform."],
["Training Simulations & VR","Prototype a procedural or training scenario with clear interactions and feedback. Content is developed with your subject-matter expert."],
["Development Support","Add a feature, fix a defined bug, optimize a small section, or provide specialist Unity implementation for an existing project."]
],
process:[
["Scope","Define the audience, problem, target platform, must-have interactions, and budget range."],
["Prototype","Agree on a small deliverable and show progress early."],
["Build & review","Share working builds at agreed milestones; gather consolidated feedback."],
["Handoff","Deliver the agreed build, source files if included, and concise handoff notes."]
],
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
contact:[["Email","ave.ludum@gmail.com","mailto:ave.ludum@gmail.com"],["Instagram","@ave.ludum","https://www.instagram.com/ave.ludum/"],["Studio","Open in Google Maps","https://maps.app.goo.gl/prLRSztEHbN9Wsh98"],["GitHub","aveludumstudio","https://github.com/aveludumstudio"]]
};
