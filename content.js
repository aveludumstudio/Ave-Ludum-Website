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
studioCopy:[
"Ave Ludum is a small game studio in Makassar, South Sulawesi. Most of our work is either commissioned — VR simulators, AR apps, 3D visualisation — or our own games.",
"We care a lot about the place we're from. Several of our projects start with South Sulawesi folklore or local environmental problems, and we go out to see the places and people involved before we build anything."
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
["Games","Original games and client games, from first prototype to release. Mobile and PC."],
["VR / XR","Training simulators and walkthroughs for standalone VR headsets."],
["Simulation","Purpose-built simulators for schools, training programs and institutions."],
["AR","Phone-based AR for campaigns, merchandise and communities."],
["3D & visualisation","Real-time environments, booth and stand renders, interactive scenes."],
["Unity support","Optimisation, integrations and extra hands for teams already in production."]
],
process:[
["Talk","Tell us what you need, who it's for and what it has to run on."],
["Scope","We come back with an approach, milestones and a quote."],
["Prototype","A small playable version early, so we can check the idea works."],
["Build","Regular builds for you to try, with fixes as we go."],
["Hand over","Final build, deployment help and documentation."]
],
email:"ave.ludum@gmail.com",
contact:[["Email","ave.ludum@gmail.com","mailto:ave.ludum@gmail.com"],["Instagram","@ave.ludum","https://www.instagram.com/ave.ludum/"],["GitHub","aveludumstudio","https://github.com/aveludumstudio"]]
};
