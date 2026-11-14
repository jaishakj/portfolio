const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function captureFull() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9225;
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=C:\\Users\\M700\\AppData\\Local\\Temp\\chrome-fp-profile',
    'about:blank'
  ]);
  await new Promise(r => setTimeout(r, 1500));
  try {
    const list = await new Promise((res, rej) => http.get(`http://127.0.0.1:${port}/json`, r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => res(JSON.parse(d)));
    }).on('error', rej));

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
    await new Promise(r => setTimeout(r, 1000));

    // get document height
    const docHeight = await send('Runtime.evaluate', { expression: 'document.documentElement.scrollHeight', returnByValue: true });
    const height = Math.min(docHeight.result.value || 4000, 8000);

    const { data: ssFull } = await send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
      clip: { x: 0, y: 0, width: 1440, height, scale: 1 }
    });
    fs.writeFileSync('C:\\Users\\M700\\.gemini\\antigravity\\brain\\583e25a8-6a0f-43a6-a212-265f8dadce2f\\screenshots\\baseline-fullpage-1440.png', Buffer.from(ssFull, 'base64'));
    console.log(`Saved baseline-fullpage-1440.png with height ${height}px`);
    ws.close();
  } finally {
    chrome.kill();
  }
}
captureFull().catch(console.error);
