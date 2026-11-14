const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function waitForPort(port, timeout = 5000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const data = await new Promise((resolve, reject) => {
        const req = http.get(`http://127.0.0.1:${port}/json`, (res) => {
          let str = '';
          res.on('data', d => str += d);
          res.on('end', () => resolve(str));
        });
        req.on('error', reject);
        req.setTimeout(500, () => req.destroy(new Error('timeout')));
      });
      return JSON.parse(data);
    } catch {
      await new Promise(r => setTimeout(r, 200));
    }
  }
  throw new Error('Chrome remote port timed out');
}

async function captureSections() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9228;
  const outDir = 'C:\\Users\\M700\\.gemini\\antigravity\\brain\\583e25a8-6a0f-43a6-a212-265f8dadce2f\\screenshots';

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=C:\\Users\\M700\\AppData\\Local\\Temp\\chrome-sec3-profile',
    'about:blank'
  ]);

  try {
    const list = await waitForPort(port);
    const ws = new WebSocket(list[0].webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);
    let id = 1;
    const send = (method, params = {}) => new Promise((resolve, reject) => {
      const i = id++;
      const h = (e) => {
        const m = JSON.parse(e.data);
        if (m.id === i) {
          ws.removeEventListener('message', h);
          if (m.error) reject(m.error);
          else resolve(m.result);
        }
      };
      ws.addEventListener('message', h);
      ws.send(JSON.stringify({ id: i, method, params }));
    });

    await send('Page.enable');
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
    await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: 'http://localhost:4173/' });
    await new Promise(r => setTimeout(r, 800));

    const sections = ['#education', '#skills', '#projects', '#contact'];
    for (const sec of sections) {
      await send('Runtime.evaluate', {
        expression: `document.querySelector('${sec}')?.scrollIntoView({ behavior: 'instant', block: 'start' })`
      });
      await new Promise(r => setTimeout(r, 500));
      const { data: ss } = await send('Page.captureScreenshot', { format: 'png' });
      const name = sec.replace('#', '');
      fs.writeFileSync(`${outDir}/section-${name}.png`, Buffer.from(ss, 'base64'));
      console.log(`Captured scrolled view for ${name}`);
    }

    ws.close();
  } finally {
    chrome.kill();
  }
}
captureSections().catch(console.error);
