# Inquiry backend

The website's "Start a project" form sends inquiries to a small Google Apps Script backend that lives inside a Google Sheet. Nothing here runs on GitHub Pages; this folder holds the code and these instructions.

## What it does

When someone submits the form:

1. **Validates** every field again on the server (required fields, email format, project type and budget from the allowed lists, length limits, consent). A hidden spam-trap field and a limit of 3 inquiries per email per hour block basic spam.
2. **Saves** the inquiry as a new row in the `Inquiries` sheet, with a reference number like `AL-20261121-001` and the status `New`.
3. **Emails the studio** at `ave.ludum@gmail.com`, with the inquiry details and a link to the sheet. Replying to that email goes straight to the client.
4. **Emails the client** an acknowledgement with their reference number. Set `SEND_CLIENT_ACKNOWLEDGEMENT: false` in `Code.gs` to turn this off.
5. **Confirms on the website**, which shows the confirmation message with the reference number. If the backend rejects a field, the website shows the reason instead.

To **respond**, open the sheet and use **Inquiries → Open inquiry manager**. The manager lets you:
- search the inquiries and filter them by status
- change the status (New, Contacted, Quoted, Won, Lost, Archived)
- keep internal notes and record a quote amount
- email the client using the follow-up or quotation templates

Every email sent from the manager is logged on the inquiry. Sending moves `New` to `Contacted`, and sending a quotation marks the inquiry `Quoted`.

## Files

- `apps-script/Code.gs`: the backend, the emails and the server side of the manager
- `apps-script/Manager.html`: the inquiry manager window
- `apps-script/appsscript.json`: project settings (time zone `Asia/Makassar`, web app access)

## Setup (about 10 minutes, done once)

Do this signed in to the Google account that should own the inquiries and send the emails. That should be **ave.ludum@gmail.com**, so emails come from the studio address.

1. **Create the sheet.** In Google Sheets, create a blank spreadsheet named `Ave Ludum Inquiries`.
2. **Add the script.** In the sheet, open **Extensions → Apps Script**. Then:
   - Replace the contents of `Code.gs` with `apps-script/Code.gs` from this folder.
   - Add an HTML file (**+ → HTML**) named exactly `Manager`, and paste in `apps-script/Manager.html`.
   - In **Project Settings**, tick *Show "appsscript.json" manifest file in editor*, then replace that file's contents with `apps-script/appsscript.json`.
   - Save.
3. **Authorize.** In the editor, choose the `setup` function and press **Run**. Google asks for permission to manage the spreadsheet and send email as you; allow it. A personal Gmail account shows an "unverified app" warning because the script is your own: choose *Advanced → Go to project*. This creates the `Inquiries` sheet and its header row.
4. **Deploy the endpoint.** Click **Deploy → New deployment**, then:
   - Under type, choose **Web app**.
   - Set *Execute as* to **Me** and *Who has access* to **Anyone**.
   - Click **Deploy** and copy the **Web app URL**. It ends in `/exec`.

   "Anyone" lets the public form post to it. The manager is only available inside the sheet, to people who can edit the sheet.
5. **Connect the website.** In `content.js`, set `inquiry.endpoint` to that URL, keep `provider:"apps-script"`, then commit and push. The form switches from opening the visitor's email app to sending directly.
6. **Test it.** Send one inquiry from the live site with your own email address. You should see:
   - the confirmation message with a reference number on the site
   - a new row in the sheet
   - the studio notification in ave.ludum@gmail.com
   - the acknowledgement in your test inbox

   Delete the test row afterwards.
7. **Reload the sheet** to get the **Inquiries** menu.

When you change `Code.gs` later, publish the change with **Deploy → Manage deployments → Edit → Version: New version**. Editing the existing deployment this way keeps the same URL, so the website doesn't need updating.

## Still required (cannot be done from the website code)

| Item | Who | Notes |
| --- | --- | --- |
| Google account to own the sheet and send mail | Studio | Should be ave.ludum@gmail.com |
| Steps 1–4 above (create, authorize, deploy) | Studio | Needs that account's sign-in and permission grant |
| Web app URL in `content.js` | Studio or developer | Until it's set, the form falls back to opening the visitor's email app |
| Studio WhatsApp number in `content.js` (`inquiry.whatsapp`) | Studio | Optional; shows the WhatsApp button |

## Limits worth knowing

- **Email quota:** a free Gmail account can send about 100 emails a day from Apps Script. Each inquiry uses 2 (the notification and the acknowledgement); replies from the manager use 1 each. That's plenty for normal inquiry volume. A Google Workspace account allows far more.
- **Sheet size:** a sheet handles tens of thousands of rows. Archive old inquiries to another tab once a year if it gets long.
- **Access:** anyone with edit access to the sheet can read every inquiry and reply as the studio. Share it only with the people who handle clients.
