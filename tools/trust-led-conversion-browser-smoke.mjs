import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';

const chromePath = process.env.CHROME_BIN;
const baseUrl = process.env.CYBERSHIELD_BASE_URL || 'http://127.0.0.1:4173';
const artifactDir = path.resolve(process.env.ARTIFACT_DIR || 'artifacts');
const remotePort = Number(process.env.CHROME_DEBUG_PORT || 9222);

if (!chromePath) throw new Error('CHROME_BIN is required');
if (typeof WebSocket === 'undefined') throw new Error('Node global WebSocket is unavailable');

fs.mkdirSync(artifactDir, { recursive: true });
const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cybershield-chrome-'));
const chrome = spawn(chromePath, [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--disable-dev-shm-usage',
  '--hide-scrollbars',
  `--remote-debugging-port=${remotePort}`,
  `--user-data-dir=${profileDir}`,
  'about:blank'
], { stdio: ['ignore', 'pipe', 'pipe'] });

let chromeOutput = '';
chrome.stdout.on('data', chunk => { chromeOutput += chunk.toString(); });
chrome.stderr.on('data', chunk => { chromeOutput += chunk.toString(); });

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function getJson(url, options = {}, attempts = 50) {
  let lastError;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      return await response.json();
    } catch (error) {
      lastError = error;
      await delay(100);
    }
  }
  throw lastError;
}

class CdpClient {
  constructor(url) {
    this.url = url;
    this.socket = null;
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();
  }

  async connect() {
    this.socket = new WebSocket(this.url);
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('CDP WebSocket open timed out')), 10000);
      this.socket.addEventListener('open', () => { clearTimeout(timer); resolve(); }, { once: true });
      this.socket.addEventListener('error', event => { clearTimeout(timer); reject(new Error(`CDP WebSocket error: ${event.message || 'unknown'}`)); }, { once: true });
    });
    this.socket.addEventListener('message', event => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(`${pending.method}: ${message.error.message}`));
        else pending.resolve(message.result || {});
        return;
      }
      if (message.method) {
        const listeners = this.listeners.get(message.method) || [];
        listeners.forEach(listener => listener(message.params || {}));
      }
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject, method });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  waitFor(method, timeoutMs = 10000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`${method} timed out`)), timeoutMs);
      const handler = params => {
        clearTimeout(timer);
        const current = this.listeners.get(method) || [];
        this.listeners.set(method, current.filter(item => item !== handler));
        resolve(params);
      };
      this.listeners.set(method, [...(this.listeners.get(method) || []), handler]);
    });
  }

  close() {
    this.socket?.close();
  }
}

const checks = [];
function assert(condition, message) {
  checks.push({ pass: Boolean(condition), message });
  if (!condition) throw new Error(message);
}

async function evaluate(client, expression) {
  const response = await client.send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
    userGesture: true
  });
  if (response.exceptionDetails) {
    throw new Error(response.exceptionDetails.exception?.description || response.exceptionDetails.text || 'Runtime evaluation failed');
  }
  return response.result?.value;
}

async function navigate(client, url) {
  const loaded = client.waitFor('Page.loadEventFired', 15000);
  await client.send('Page.navigate', { url });
  await loaded;
  await delay(350);
}

async function setViewport(client, width, height, mobile = false) {
  await client.send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile
  });
}

async function screenshot(client, filename) {
  const response = await client.send('Page.captureScreenshot', {
    format: 'png',
    fromSurface: true,
    captureBeyondViewport: false
  });
  fs.writeFileSync(path.join(artifactDir, filename), Buffer.from(response.data, 'base64'));
}

async function heading(client) {
  return evaluate(client, `document.querySelector('#app h1')?.textContent?.trim() || ''`);
}

async function click(client, selector) {
  const clicked = await evaluate(client, `(() => { const element = document.querySelector(${JSON.stringify(selector)}); if (!element) return false; element.click(); return true; })()`);
  assert(clicked, `Found and clicked ${selector}`);
  await delay(250);
}

let client;
try {
  await getJson(`http://127.0.0.1:${remotePort}/json/version`);
  const target = await getJson(`http://127.0.0.1:${remotePort}/json/new?about:blank`, { method: 'PUT' });
  client = new CdpClient(target.webSocketDebuggerUrl);
  await client.connect();
  await client.send('Page.enable');
  await client.send('Runtime.enable');

  await setViewport(client, 1440, 1100, false);
  await navigate(client, `${baseUrl}/index.html`);
  assert((await evaluate(client, `document.querySelector('h1')?.textContent || ''`)).includes('prove the recommendation can survive challenge'), 'Landing headline renders');
  assert(Boolean(await evaluate(client, `document.querySelector('a[href="vendor-risk-next.html"]')`)), 'Landing primary CTA renders');
  await screenshot(client, 'landing-desktop.png');

  await setViewport(client, 390, 844, true);
  await navigate(client, `${baseUrl}/index.html`);
  assert(Boolean(await evaluate(client, `document.querySelector('.hero')`)), 'Mobile landing renders the hero');
  await screenshot(client, 'landing-mobile.png');

  await setViewport(client, 1440, 1200, false);
  await navigate(client, `${baseUrl}/vendor-risk-next.html`);
  assert((await heading(client)).includes('Would your current process approve this recommendation?'), 'Initial screen shows the recommendation challenge');
  assert(!(await evaluate(client, `Boolean(document.querySelector('#firstName'))`)), 'Initial screen does not ask for first name');
  assert((await evaluate(client, `document.querySelectorAll('[data-judgment]').length`)) === 3, 'Initial screen offers three judgment choices');

  await click(client, '[data-judgment="more_evidence"]');
  assert((await heading(client)).includes('recommendation sounds stronger than the evidence'), 'Judgment advances to the evidence problem');
  assert(Boolean(await evaluate(client, `document.querySelector('#contradiction')`)), 'Evidence step exposes contradiction selection');

  await click(client, '#next');
  assert((await heading(client)).includes('Personalize the record'), 'Personalization follows initial value');
  assert(Boolean(await evaluate(client, `document.querySelector('#firstName') && document.querySelector('#company') && document.querySelector('#vendor')`)), 'Optional personalization fields are present');

  await click(client, '#next');
  assert((await heading(client)).includes('extracts claims'), 'Review step renders claims and validators');
  assert((await evaluate(client, `document.querySelectorAll('table tbody tr').length`)) > 0, 'Review step renders material claim rows');

  await click(client, '#next');
  assert((await heading(client)).includes('Compare the candidate actions'), 'Decision step renders candidate actions');
  assert(Boolean(await evaluate(client, `document.body.textContent.includes('Strongest Action for This Evidence Set')`)), 'Decision copy qualifies the controlled result');

  await click(client, '#next');
  assert((await heading(client)).includes('AI Trust Decision Record is ready'), 'Record step renders');
  assert(Boolean(await evaluate(client, `document.querySelector('#reviewReal')`)), 'Real-recommendation CTA is present');
  assert(Boolean(await evaluate(client, `document.querySelector('#pilot')`)), 'Pilot CTA is present');
  assert(Boolean(await evaluate(client, `document.querySelector('#print') && document.querySelector('#download')`)), 'Print and JSON actions remain present');
  assert(!(await evaluate(client, `document.body.textContent.includes('Sheet ID source of truth')`)), 'Visible route does not expose the Sheet ID label');
  await screenshot(client, 'record-desktop.png');

  await setViewport(client, 1440, 1100, false);
  await navigate(client, `${baseUrl}/pilot-package.html`);
  assert((await evaluate(client, `document.querySelector('h1')?.textContent || ''`)).includes('Controlled AI Decision Assurance Pilot'), 'Pilot page renders');
  assert(Boolean(await evaluate(client, `document.body.textContent.includes('Pilot pricing and delivery schedule are confirmed after scope review.')`)), 'Pilot page preserves the commercial boundary');
  assert(!(await evaluate(client, `Boolean(document.querySelector('a[href="internal-qa.html"]'))`)), 'Pilot page contains no Internal QA link');
  await screenshot(client, 'pilot-desktop.png');

  const result = { status: 'pass', checks };
  fs.writeFileSync(path.join(artifactDir, 'browser-smoke-results.json'), JSON.stringify(result, null, 2));
  console.log(`BROWSER_SMOKE_PASS: ${checks.length} checks`);
  checks.forEach(item => console.log(`  ✓ ${item.message}`));
} catch (error) {
  const result = { status: 'fail', error: error.message, checks, chromeOutput };
  fs.writeFileSync(path.join(artifactDir, 'browser-smoke-results.json'), JSON.stringify(result, null, 2));
  console.error(`BROWSER_SMOKE_FAIL: ${error.message}`);
  checks.forEach(item => console.error(`  ${item.pass ? '✓' : '✗'} ${item.message}`));
  process.exitCode = 1;
} finally {
  try { client?.close(); } catch {}
  chrome.kill('SIGTERM');
  await delay(200);
  fs.rmSync(profileDir, { recursive: true, force: true });
}
