/**
 * Ave Ludum Studio: project inquiry backend.
 *
 * A Google Apps Script bound to the "Ave Ludum Inquiries" Google Sheet.
 *  - doPost receives inquiries from the website form, validates them, saves each one
 *    as a row in the "Inquiries" sheet, emails the studio and (optionally) the client.
 *  - The "Inquiries" menu in the Sheet opens the inquiry manager (Manager.html), where the
 *    studio can change status, keep notes, reply to the client and send a quotation.
 *
 * Setup steps are in backend/README.md.
 */

const CONFIG = {
  STUDIO_EMAIL: 'ave.ludum@gmail.com',   // new-inquiry notifications go here
  STUDIO_NAME: 'Ave Ludum Studio',
  SEND_CLIENT_ACKNOWLEDGEMENT: true,     // email the client a copy with their reference number
  SHEET_NAME: 'Inquiries',
  MAX_PER_EMAIL_PER_HOUR: 3,             // basic spam guard
  MAX_ACKNOWLEDGEMENTS_PER_DAY: 40       // keeps the free Gmail quota (about 100/day) for studio emails and replies
};

// Must match the options in the website form (index.html)
const PROJECT_TYPES = ['Game Development', 'Game Prototype / MVP', 'Interactive 3D Application', 'Product Visualization',
  'Educational Application', 'VR / Simulation', 'Unity Technical Support', 'Other'];
const BUDGETS = ['Below Rp1,000,000', 'Rp1,000,000–3,000,000', 'Rp3,000,000–5,000,000', 'Rp5,000,000–10,000,000',
  'Rp10,000,000–25,000,000', 'Above Rp25,000,000', 'Not sure yet'];
const STATUSES = ['New', 'Contacted', 'Quoted', 'Won', 'Lost', 'Archived'];
const COLUMNS = ['ID', 'Received', 'Status', 'Name', 'Organization', 'Email', 'WhatsApp', 'Project type', 'Budget',
  'Timeline', 'Reference links', 'Description', 'Page', 'Internal notes', 'Quote (IDR)', 'Last reply', 'Last reply at'];
const COL = Object.fromEntries(COLUMNS.map((name, i) => [name, i + 1]));

/* ---------- Website endpoint ---------- */

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: 'The request could not be read.' });
  }
  // Hidden "website" field: people never see it, bots fill it in. Drop those quietly.
  if (data.website) return json_({ ok: true, id: '' });

  const clean = normalise_(data);
  const errors = validate_(clean);
  if (errors.length) return json_({ ok: false, error: errors.join(' ') });

  const cache = CacheService.getScriptCache();
  const rateKey = 'rate_' + clean.email.toLowerCase();
  const count = Number(cache.get(rateKey) || 0);
  if (count >= CONFIG.MAX_PER_EMAIL_PER_HOUR) {
    return json_({ ok: false, error: 'We have already received several inquiries from this email in the last hour. Please email us directly instead.' });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  let id;
  try {
    const sheet = sheet_();
    id = newId_(sheet);
    const t = sheetText_;
    sheet.appendRow([id, new Date(), 'New', t(clean.name), t(clean.organization), t(clean.email), t(clean.whatsapp),
      clean.projectType, clean.budget, t(clean.timeline), t(clean.links), t(clean.description), t(clean.page), '', '', '', '']);
  } finally {
    lock.releaseLock();
  }
  cache.put(rateKey, String(count + 1), 3600);

  // The inquiry is saved at this point; a mail failure shouldn't lose it or fail the visitor.
  try { notifyStudio_(id, clean); } catch (err) { console.error('Studio notification failed', err); }
  // Acknowledgements go to addresses typed into a public form, so cap them per day:
  // someone abusing the form can't use up the studio's email quota.
  const ackKey = 'acks_' + Utilities.formatDate(new Date(), 'Asia/Makassar', 'yyyyMMdd');
  const acks = Number(cache.get(ackKey) || 0);
  if (CONFIG.SEND_CLIENT_ACKNOWLEDGEMENT && acks < CONFIG.MAX_ACKNOWLEDGEMENTS_PER_DAY) {
    try { acknowledgeClient_(id, clean); cache.put(ackKey, String(acks + 1), 21600); }
    catch (err) { console.error('Client acknowledgement failed', err); }
  }
  return json_({ ok: true, id: id });
}

// A plain GET just confirms the endpoint is live (handy when testing the deployment URL).
function doGet() {
  return json_({ ok: true, service: 'Ave Ludum inquiries' });
}

function normalise_(d) {
  const s = v => String(v == null ? '' : v).trim();
  return {
    name: s(d.name), organization: s(d.organization), email: s(d.email), whatsapp: s(d.whatsapp),
    projectType: s(d.projectType), budget: s(d.budget), timeline: s(d.timeline), links: s(d.links),
    description: s(d.description), page: s(d.page).slice(0, 300), consent: s(d.consent)
  };
}

function validate_(d) {
  const errors = [];
  if (d.name.length < 2 || d.name.length > 100) errors.push('Please enter your name.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) || d.email.length > 200) errors.push('Please enter a valid email address.');
  if (d.whatsapp && !/^\+?[\d\s-]{8,20}$/.test(d.whatsapp)) errors.push('Please check the WhatsApp number.');
  if (PROJECT_TYPES.indexOf(d.projectType) < 0) errors.push('Please choose a project type.');
  if (BUDGETS.indexOf(d.budget) < 0) errors.push('Please choose a budget range.');
  if (d.description.length < 10) errors.push('Please describe your project in a few sentences.');
  if (d.description.length > 5000) errors.push('Please keep the description under 5,000 characters.');
  if (d.organization.length > 150 || d.timeline.length > 200 || d.links.length > 1000) errors.push('One of the fields is too long.');
  if (d.consent !== 'yes') errors.push('Please agree to be contacted about this inquiry.');
  return errors;
}

/* ---------- Emails ---------- */

function notifyStudio_(id, d) {
  const rows = [['Name', d.name], ['Organization', d.organization], ['Email', d.email], ['WhatsApp', d.whatsapp],
    ['Project type', d.projectType], ['Budget', d.budget], ['Timeline', d.timeline], ['Reference links', d.links], ['Sent from', d.page]]
    .filter(r => r[1]);
  const html = `<p><b>New project inquiry ${esc_(id)}</b></p>
    <table cellpadding="4" style="border-collapse:collapse">${rows.map(r => `<tr><td style="color:#666">${r[0]}</td><td>${esc_(r[1])}</td></tr>`).join('')}</table>
    <p style="white-space:pre-wrap;border-left:3px solid #ec5a1f;padding-left:10px">${esc_(d.description)}</p>
    <p>Reply to this email to answer the client directly, or manage it in the inquiry sheet:<br>
    <a href="${SpreadsheetApp.getActive().getUrl()}">${SpreadsheetApp.getActive().getName()}</a></p>`;
  MailApp.sendEmail({
    to: CONFIG.STUDIO_EMAIL,
    replyTo: d.email,
    subject: `New inquiry ${id}: ${d.projectType} from ${d.name}`,
    htmlBody: html,
    name: CONFIG.STUDIO_NAME + ' website'
  });
}

function acknowledgeClient_(id, d) {
  const html = `<p>Hi ${esc_(d.name)},</p>
    <p>Thank you for considering ${CONFIG.STUDIO_NAME}. Your project inquiry has been received. We'll review your requirements and get back to you.</p>
    <p>Your reference number is <b>${esc_(id)}</b>. If you want to add anything, just reply to this email.</p>
    <p style="color:#666">Your inquiry:<br>${esc_(d.projectType)} · ${esc_(d.budget)}${d.timeline ? ' · ' + esc_(d.timeline) : ''}</p>
    <p style="white-space:pre-wrap;color:#666">${esc_(d.description)}</p>
    <p>${CONFIG.STUDIO_NAME}<br><a href="https://aveludumstudio.com/">aveludumstudio.com</a></p>`;
  MailApp.sendEmail({
    to: d.email,
    replyTo: CONFIG.STUDIO_EMAIL,
    subject: `We received your project inquiry (${id})`,
    htmlBody: html,
    name: CONFIG.STUDIO_NAME
  });
}

/* ---------- Sheet menu and inquiry manager ---------- */

function onOpen() {
  SpreadsheetApp.getUi().createMenu('Inquiries')
    .addItem('Open inquiry manager', 'openManager')
    .addSeparator()
    .addItem('Set up sheet', 'setup')
    .addToUi();
}

function openManager() {
  const html = HtmlService.createHtmlOutputFromFile('Manager').setWidth(1180).setHeight(760);
  SpreadsheetApp.getUi().showModalDialog(html, 'Ave Ludum inquiries');
}

// Run once after pasting the script: creates the sheet and its header, and asks for permissions.
function setup() {
  const sheet = sheet_();
  const statusRule = SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build();
  sheet.getRange(2, COL['Status'], sheet.getMaxRows() - 1, 1).setDataValidation(statusRule);
  sheet.setFrozenRows(1);
  try { SpreadsheetApp.getUi().alert('Inquiry sheet is ready. Next: Deploy > New deployment > Web app (see backend/README.md).'); } catch (err) {}
}

// Called from Manager.html. Newest first.
function getInquiries() {
  requireEditor_();
  const sheet = sheet_();
  const last = sheet.getLastRow();
  if (last < 2) return [];
  const values = sheet.getRange(2, 1, last - 1, COLUMNS.length).getValues();
  return values.map((r, i) => {
    const o = { row: i + 2 };
    COLUMNS.forEach((name, c) => { o[name] = r[c] instanceof Date ? r[c].toISOString() : r[c]; });
    return o;
  }).filter(o => o.ID).reverse();
}

// Saves status, notes and quote amount for one inquiry.
function updateInquiry(id, changes) {
  requireEditor_();
  const sheet = sheet_();
  const row = findRow_(sheet, id);
  if (changes.status != null) {
    if (STATUSES.indexOf(changes.status) < 0) throw new Error('Unknown status.');
    sheet.getRange(row, COL['Status']).setValue(changes.status);
  }
  if (changes.notes != null) sheet.getRange(row, COL['Internal notes']).setValue(sheetText_(String(changes.notes)));
  if (changes.quote != null) sheet.getRange(row, COL['Quote (IDR)']).setValue(changes.quote === '' ? '' : Number(changes.quote));
  return true;
}

// Emails the client from the studio account, records it on the inquiry, and moves the status on.
function sendReply(id, subject, body, quote) {
  requireEditor_();
  subject = String(subject || '').trim();
  body = String(body || '').trim();
  if (!subject || !body) throw new Error('Write a subject and a message first.');
  const sheet = sheet_();
  const row = findRow_(sheet, id);
  const email = sheet.getRange(row, COL['Email']).getValue();
  MailApp.sendEmail({
    to: email,
    replyTo: CONFIG.STUDIO_EMAIL,
    subject: subject,
    htmlBody: `<div style="white-space:pre-wrap">${esc_(body)}</div>`,
    name: CONFIG.STUDIO_NAME
  });
  const now = new Date();
  sheet.getRange(row, COL['Last reply']).setValue(subject);
  sheet.getRange(row, COL['Last reply at']).setValue(now);
  const notesCell = sheet.getRange(row, COL['Internal notes']);
  const stamp = Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm');
  notesCell.setValue(`[${stamp}] Sent "${subject}"\n` + notesCell.getValue());
  const status = sheet.getRange(row, COL['Status']).getValue();
  if (quote !== '' && quote != null) {
    sheet.getRange(row, COL['Quote (IDR)']).setValue(Number(quote));
    sheet.getRange(row, COL['Status']).setValue('Quoted');
  } else if (status === 'New') {
    sheet.getRange(row, COL['Status']).setValue('Contacted');
  }
  return true;
}

/* ---------- Helpers ---------- */

function sheet_() {
  const ss = SpreadsheetApp.getActive();
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
  }
  return sheet;
}

function findRow_(sheet, id) {
  const ids = sheet.getRange(2, COL['ID'], Math.max(sheet.getLastRow() - 1, 1), 1).getValues();
  const i = ids.findIndex(r => r[0] === id);
  if (i < 0) throw new Error('Inquiry ' + id + ' was not found.');
  return i + 2;
}

// AL-20261121-001 style: date plus a running number for that day
function newId_(sheet) {
  const prefix = 'AL-' + Utilities.formatDate(new Date(), 'Asia/Makassar', 'yyyyMMdd') + '-';
  const last = sheet.getLastRow();
  const ids = last > 1 ? sheet.getRange(2, 1, last - 1, 1).getValues().map(r => String(r[0])) : [];
  const today = ids.filter(id => id.indexOf(prefix) === 0).length;
  return prefix + String(today + 1).padStart(3, '0');
}

// Manager functions only work for people who can edit the inquiry sheet.
function requireEditor_() {
  const user = Session.getActiveUser().getEmail();
  const ss = SpreadsheetApp.getActive();
  const allowed = [ss.getOwner() && ss.getOwner().getEmail()].concat(ss.getEditors().map(u => u.getEmail()));
  if (!user || allowed.indexOf(user) < 0) throw new Error('Only editors of the inquiry sheet can do this.');
}

// Text from the public form is stored as plain text: a value starting with = + - or @
// would otherwise run as a spreadsheet formula (formula injection).
function sheetText_(s) {
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function esc_(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
