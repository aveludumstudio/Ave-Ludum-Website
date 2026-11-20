# Ave Ludum Studio Website

Static HTML/CSS/JS site for GitHub Pages.

## Edit the site
Update `content.js` to change the public-facing text, work, services, studio information, process and contact links. No build step is required.

## Team photos
Each team member has a photo slot in `assets/team/`, named after them in lowercase: `fri.jpg`, `zaki.jpg`, `muja.jpg`, `dharma.jpg`, `zara.jpg`, `anes.jpg`, `fari.jpg`, `wildan.jpg`, `dara.jpg`. To change a photo, replace the file with a square headshot (about 400×400 px) and keep the same name. The site shows it in a small circle, so keep the face centred. Names, roles and job descriptions are in `content.js` under `team`.

## Project inquiry form
The form validates its fields, then sends the inquiry to the studio backend: a Google Apps Script attached to a Google Sheet, which saves each inquiry, emails the studio and the client, and adds an inquiry manager to the sheet for replies and quotations. The code and step-by-step setup are in `backend/` (see `backend/README.md`).

It is configured in `content.js` under `inquiry`:
- `endpoint` empty (the default): the form opens the visitor's email app with the inquiry filled in, addressed to `email`. Nothing is sent until they press send.
- `endpoint` set to the Apps Script web app URL (with `provider:"apps-script"`): the form posts there, shows a loading state, then the confirmation with a reference number, or the reason the server gave if a field was rejected.

`whatsapp` takes the studio's WhatsApp number in international format without "+" (e.g. `6281234567890`). When it's empty the WhatsApp button stays hidden.

## Services, pricing and products
Packages and their starting prices are under `offers` in `content.js`; set `showPrices:false` to hide every price. Digital products go in `products` (title, text, price, url, image); while it's empty the site shows the planned list as "Coming soon".

## Case studies
Every project in `work` (in `content.js`) has its own page at `project.html?p=<slug>`. The page shows a large screenshot and clip viewer, then numbered sections: overview, challenge, approach, interactive features, technology, status and what Ave Ludum contributed. Fill these in under each project's `caseStudy`. A section with nothing in it is left out, so add details only once they're confirmed. When you add a project, give it a `slug` and add its URL to `sitemap.xml`.

## Files
- `services.html` / `services.js` — services and pricing page
- `project.html` / `project.js` — case study page for each project
- `404.html` — page shown for broken links (uses `<base href="/">` so it works at any path)
- `site.js` — shared by every page: theme toggle, footer links, price formatting, swipe and drag helpers
- `index.html` — page structure
- `content.js` — editable content
- `script.js` — rendering and interactions
- `styles.css` — visual design

## Contact
The public studio contact is `ave.ludum@gmail.com`.

## Hosting
This repository is intended to be published through GitHub Pages.
