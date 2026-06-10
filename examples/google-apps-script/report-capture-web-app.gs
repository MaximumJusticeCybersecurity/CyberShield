/**
 * CyberShield Report Capture Web App Example
 * 2026061022-report-capture-apps-script-contract
 *
 * Deployment pattern:
 * 1. Create a Google Apps Script project owned by Maximum Justice Cybersecurity.
 * 2. Paste this file into the Apps Script editor.
 * 3. Set SCRIPT_PROP CRM_SHEET_ID to the target Google Sheet ID.
 * 4. Deploy as a Web App with access limited to the intended audience.
 * 5. Copy the Web App URL into CyberShield REPORT_CAPTURE_ENDPOINT only after testing.
 *
 * Do not place Google credentials or secrets in GitHub Pages front-end code.
 */

const REQUIRED_FIELDS = [
  'event_type',
  'capture_timestamp',
  'record_id',
  'recommended_action',
  'risk_if_wrong',
  'confidence_band',
  'human_review_required',
  'structured_record_json'
];

const HEADERS = [
  'received_at',
  'event_type',
  'capture_timestamp',
  'first_name',
  'company',
  'vendor',
  'email',
  'contradiction_type',
  'contradiction_label',
  'record_id',
  'recommended_action',
  'risk_if_wrong',
  'confidence_band',
  'human_review_required',
  'record_domain',
  'record_defensibility_band',
  'record_json'
];

function doPost(e) {
  try {
    const body = parseJsonBody_(e);
    validatePayload_(body);
    const sheet = getCaptureSheet_();
    ensureHeaders_(sheet);
    sheet.appendRow(toRow_(body));
    return jsonResponse_({ ok: true, status: 'saved', record_id: body.record_id });
  } catch (error) {
    return jsonResponse_({ ok: false, status: 'error', message: String(error && error.message ? error.message : error) }, 400);
  }
}

function doGet() {
  return jsonResponse_({ ok: true, service: 'CyberShield report capture endpoint', status: 'ready' });
}

function parseJsonBody_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('Missing request body.');
  }
  try {
    return JSON.parse(e.postData.contents);
  } catch (error) {
    throw new Error('Invalid JSON body.');
  }
}

function validatePayload_(body) {
  REQUIRED_FIELDS.forEach(function(field) {
    if (body[field] === undefined || body[field] === null || body[field] === '') {
      throw new Error('Missing required field: ' + field);
    }
  });
  if (!body.structured_record_json || typeof body.structured_record_json !== 'object') {
    throw new Error('structured_record_json must be an object.');
  }
  if (String(body.recommended_action).toLowerCase().includes('approve')) {
    // Guardrail: approval captures are allowed only as records, not as proof that approval is defensible.
    // The front end should still preserve CyberShield's original recommended action separately.
  }
}

function getCaptureSheet_() {
  const props = PropertiesService.getScriptProperties();
  const sheetId = props.getProperty('CRM_SHEET_ID');
  if (!sheetId) throw new Error('Missing SCRIPT_PROP CRM_SHEET_ID.');
  const spreadsheet = SpreadsheetApp.openById(sheetId);
  return spreadsheet.getSheetByName('CyberShield Report Captures') || spreadsheet.insertSheet('CyberShield Report Captures');
}

function ensureHeaders_(sheet) {
  const range = sheet.getRange(1, 1, 1, HEADERS.length);
  const existing = range.getValues()[0];
  const needsHeaders = existing.every(function(value) { return value === ''; });
  if (needsHeaders) {
    range.setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function toRow_(body) {
  const record = body.structured_record_json || {};
  return [
    new Date().toISOString(),
    body.event_type || '',
    body.capture_timestamp || '',
    body.first_name || '',
    body.company || '',
    body.vendor || '',
    body.email || '',
    body.contradiction_type || '',
    body.contradiction_label || '',
    body.record_id || '',
    body.recommended_action || '',
    body.risk_if_wrong || '',
    body.confidence_band || '',
    body.human_review_required === true ? 'Yes' : 'No',
    record.domain || '',
    record.record_defensibility_band || '',
    JSON.stringify(record)
  ];
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
