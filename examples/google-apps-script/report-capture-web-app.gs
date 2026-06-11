/**
 * CyberShield Report Capture Web App Example
 * 2026061114-hardened-capture-logging
 *
 * Deployment pattern:
 * 1. Create a Google Apps Script project owned by Maximum Justice Cybersecurity.
 * 2. Paste this file into the Apps Script editor.
 * 3. Set Script Property CRM_SHEET_ID to the target Google Sheet ID.
 * 4. Deploy as a Web App.
 * 5. Execute as: Me.
 * 6. Access: Anyone with the link, or the narrowest setting that still allows GitHub Pages POST.
 * 7. Copy the Web App URL into CyberShield REPORT_CAPTURE_ENDPOINT only after testing.
 *
 * Do not place Google credentials or secrets in GitHub Pages front-end code.
 */

const CAPTURE_SHEET_NAME = 'CyberShield Report Captures';
const ERROR_SHEET_NAME = 'CyberShield Capture Errors';

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

const ERROR_HEADERS = [
  'received_at',
  'stage',
  'message',
  'post_type',
  'raw_body'
];

function doPost(e) {
  try {
    const rawBody = getRawBody_(e);
    const body = parseJsonBody_(rawBody);
    validatePayload_(body);
    const sheet = getSheet_(CAPTURE_SHEET_NAME);
    ensureHeaders_(sheet, HEADERS);
    sheet.appendRow(toRow_(body));
    return jsonResponse_({ ok: true, status: 'saved', record_id: body.record_id });
  } catch (error) {
    logCaptureError_('doPost', error, e);
    return jsonResponse_({ ok: false, status: 'error', message: String(error && error.message ? error.message : error) });
  }
}

function doGet() {
  try {
    const sheetId = getSheetId_();
    return jsonResponse_({
      ok: true,
      service: 'CyberShield report capture endpoint',
      status: 'ready',
      sheet_id_configured: Boolean(sheetId),
      capture_sheet_name: CAPTURE_SHEET_NAME,
      error_sheet_name: ERROR_SHEET_NAME
    });
  } catch (error) {
    return jsonResponse_({ ok: false, status: 'error', message: String(error && error.message ? error.message : error) });
  }
}

function getRawBody_(e) {
  if (!e || !e.postData || e.postData.contents === undefined || e.postData.contents === null || e.postData.contents === '') {
    throw new Error('Missing request body.');
  }
  return String(e.postData.contents);
}

function parseJsonBody_(rawBody) {
  try {
    return JSON.parse(rawBody);
  } catch (error) {
    throw new Error('Invalid JSON body: ' + String(error && error.message ? error.message : error));
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
}

function getSheetId_() {
  const props = PropertiesService.getScriptProperties();
  const sheetId = props.getProperty('CRM_SHEET_ID');
  if (!sheetId) throw new Error('Missing Script Property CRM_SHEET_ID.');
  return sheetId;
}

function getSpreadsheet_() {
  return SpreadsheetApp.openById(getSheetId_());
}

function getSheet_(sheetName) {
  const spreadsheet = getSpreadsheet_();
  return spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
}

function ensureHeaders_(sheet, headers) {
  const range = sheet.getRange(1, 1, 1, headers.length);
  const existing = range.getValues()[0];
  const needsHeaders = existing.every(function(value) { return value === ''; });
  if (needsHeaders) {
    range.setValues([headers]);
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

function logCaptureError_(stage, error, e) {
  try {
    const rawBody = e && e.postData && e.postData.contents ? String(e.postData.contents) : '';
    const postType = e && e.postData && e.postData.type ? String(e.postData.type) : '';
    const sheet = getSheet_(ERROR_SHEET_NAME);
    ensureHeaders_(sheet, ERROR_HEADERS);
    sheet.appendRow([
      new Date().toISOString(),
      stage || '',
      String(error && error.message ? error.message : error),
      postType,
      rawBody.slice(0, 45000)
    ]);
  } catch (logError) {
    // Avoid recursive failure if the Sheet ID itself is missing or inaccessible.
    console.error('CyberShield capture logging failed:', logError);
  }
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
