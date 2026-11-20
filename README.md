# Ave Ludum Studio Website

Static HTML/CSS/JS site for GitHub Pages.

## Edit the site
Update `content.js` to change the public-facing text, work, services, studio information, process and contact links. No build step is required.

## Team photos
Each team member has a photo slot in `assets/team/`, named after them in lowercase: `fri.jpg`, `zaki.jpg`, `muja.jpg`, `dharma.jpg`, `zara.jpg`, `anes.jpg`, `fari.jpg`, `wildan.jpg`, `dara.jpg`. To change a photo, replace the file with a square headshot (about 400×400 px) and keep the same name. The site shows it in a small circle, so keep the face centred. Names, roles and job descriptions are in `content.js` under `team`.

## Project inquiry form
The "Start a project" form validates its fields, then sends the inquiry in one of two ways, set in `content.js` under `inquiry`:
- `endpoint` empty (the default): the form opens the visitor's email app with the inquiry filled in, addressed to `email`. Nothing is sent until they press send.
- `endpoint` set to a form service URL that accepts JSON (for example Formspree, Web3Forms or FormSubmit's `/ajax/` URL): the form posts there and shows a loading state, then a success or error message. Most services need a one-time setup or activation by the inbox owner, so send one test inquiry after setting it.

`whatsapp` takes the studio's WhatsApp number in international format without "+" (e.g. `6281234567890`). When it's empty the WhatsApp button stays hidden.

## Services, pricing and products
Packages and their starting prices are under `offers` in `content.js`; set `showPrices:false` to hide every price. Digital products go in `products` (title, text, price, url, image); while it's empty the site shows the planned list as "Coming soon".

## Files
- `services.html` / `services.js` — services and pricing page
- `site.js` — shared by both pages: theme toggle, footer links, price formatting
- `index.html` — page structure
- `content.js` — editable content
- `script.js` — rendering and interactions
- `styles.css` — visual design

## Contact
The public studio contact is `ave.ludum@gmail.com`.

## Hosting
This repository is intended to be published through GitHub Pages.
