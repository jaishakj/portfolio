const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const VIEWPORTS = [
  { name: '320x568', width: 320, height: 568, mobile: true },
  { name: '360x800', width: 360, height: 800, mobile: true },
  { name: '375x812', width: 375, height: 812, mobile: true },
  { name: '390x844', width: 390, height: 844, mobile: true },
  { name: '393x873', width: 393, height: 873, mobile: true },
  { name: '414x896', width: 414, height: 896, mobile: true },
  { name: '430x932', width: 430, height: 932, mobile: true },
  { name: '480x900', width: 480, height: 900, mobile: true },
  { name: '768x1024', width: 768, height: 1024, mobile: true },
  { name: '820x1180', width: 820, height: 1180, mobile: true },
  { name: '1024x768', width: 1024, height: 768, mobile: false },
  { name: '1280x800', width: 1280, height: 800, mobile: false },
  { name: '1440x900', width: 1440, height: 900, mobile: false },
  { name: '1920x1080', width: 1920, height: 1080, mobile: false },
  { name: 'landscape-844x390', width: 844, height: 390, mobile: true },
  { name: 'landscape-800x360', width: 800, height: 360, mobile: true }
];

async function runAudit() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9223;
  const outDir = 'C:\\Users\\M700\\.gemini\\antigravity\\brain\\583e25a8-6a0f-43a6-a212-265f8dadce2f\\screenshots';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=C:\\Users\\M700\\AppData\\Local\\Temp\\chrome-audit-profile',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const list = await new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${port}/json`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(JSON.parse(data)));
      }).on('error', reject);
    });

    const page = list.find(t => t.type === 'page');
    if (!page) throw new Error('No page target');

    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    let msgId = 1;
    const send = (method, params = {}) => new Promise((resolve, reject) => {
      const id = msgId++;
      const handler = (evt) => {
        const res = JSON.parse(evt.data);
        if (res.id === id) {
          ws.removeEventListener('message', handler);
          if (res.error) reject(res.error);
          else resolve(res.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id, method, params }));
    });

    const evaluate = async (expr) => {
      const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
      return res.result?.value;
    };

    await send('Page.enable');
    await send('DOM.enable');
    await send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-reduced-motion', value: 'reduce' }]
    });

    console.log('Testing 16 viewports for layout overflow...');
    const results = [];

    for (const vp of VIEWPORTS) {
      await send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.mobile
      });
      await send('Page.navigate', { url: 'http://localhost:4173/' });
      await new Promise(r => setTimeout(r, 600));

      const metrics = await evaluate(`({
        scrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        innerWidth: window.innerWidth,
        hasOverflow: document.documentElement.scrollWidth > window.innerWidth || document.body.scrollWidth > window.innerWidth
      })`);

      const pass = !metrics.hasOverflow;
      results.push({ ...vp, ...metrics, pass });
      console.log(`[${pass ? 'PASS' : 'FAIL'}] ${vp.name} - Win: ${metrics.innerWidth}px, DocScroll: ${metrics.scrollWidth}px, BodyScroll: ${metrics.bodyScrollWidth}px`);

      // capture key screenshots
      if (['390x844', '768x1024', '1440x900'].includes(vp.name)) {
        const { data: ss } = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(outDir, `baseline-${vp.name}.png`), Buffer.from(ss, 'base64'));

        // Also test light theme
        await evaluate(`document.documentElement.setAttribute('data-theme', 'light')`);
        await new Promise(r => setTimeout(r, 200));
        const { data: ssl } = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(outDir, `baseline-${vp.name}-light.png`), Buffer.from(ssl, 'base64'));
        await evaluate(`document.documentElement.removeAttribute('data-theme')`);
      }
    }

    // Test resume view
    await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: 'http://localhost:4173/#resume' });
    await new Promise(r => setTimeout(r, 600));
    const { data: ssResume } = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'baseline-resume-1440.png'), Buffer.from(ssResume, 'base64'));

    ws.close();
    console.log('Audit completed successfully. All viewports processed.');
  } finally {
    chrome.kill();
  }
}

runAudit().catch(err => {
  console.error(err);
  process.exit(1);
});
