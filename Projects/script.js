(function () {
  'use strict';

  /* ==========================================
     1. SCROLL ENGINE & AMBIENT GLOW SWITCHER
     ========================================== */
  var sections = document.querySelectorAll('.section');
  var currentIndexEl = document.getElementById('current-index');
  var scrollProgressBar = document.getElementById('scroll-progress');
  var signalTick = document.getElementById('signal-tick');

  function handleScroll() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
    
    if (scrollProgressBar) {
      scrollProgressBar.style.width = (progress * 100) + '%';
    }
    if (signalTick) {
      signalTick.style.top = (progress * 100) + '%';
    }

    var viewportCenter = window.innerHeight / 2;
    var activeFound = false;

    sections.forEach(function (sec) {
      var rect = sec.getBoundingClientRect();
      var secCenter = rect.top + rect.height / 2;
      var dist = Math.abs(secCenter - viewportCenter);

      if (dist < window.innerHeight * 0.45 && !activeFound) {
        sec.classList.add('active');
        activeFound = true;

        var accent = sec.getAttribute('data-color');
        var index = sec.getAttribute('data-index');

        if (accent) {
          sec.style.setProperty('--accent', accent);
        }
        if (currentIndexEl && index) {
          currentIndexEl.textContent = index;
        }
      } else {
        sec.classList.remove('active');
      }
    });
  }

  sections.forEach(function (sec) {
    var accent = sec.getAttribute('data-color');
    if (accent) sec.style.setProperty('--accent', accent);
  });

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('load', handleScroll);
  handleScroll();

  /* ==========================================
     2. DEMO 1: RAG CHAT & STATS
     ========================================== */
  var chatViewport = document.getElementById('rag-chat');
  var ragStatus = document.getElementById('rag-status');
  var chatBtns = document.querySelectorAll('.chat-btn');
  var metricVals = document.querySelectorAll('.metric-val');
  var statsCounted = false;

  var ragData = {
    webhook: {
      query: "How do I configure custom webhook endpoints?",
      status: "Searching vectors for 'webhook configuration'...",
      response: "In project settings, navigate to Integrations &rarr; Webhooks. Enter your HTTPS endpoint and select triggers. Signatures are HMAC-SHA256 verified."
    },
    auth: {
      query: "How do I refresh an expired OAuth 2.0 token?",
      status: "Retrieving 'OAuth 2.0 refresh flow' docs...",
      response: "POST to /api/v1/auth/refresh with your grant_type=refresh_token and refresh_token string in headers to acquire a new 60-min JWT access token."
    },
    rate: {
      query: "What are the rate limits for batch embeddings?",
      status: "Consulting 'Rate Limits & Tier Policy' section...",
      response: "Standard tier allows up to 10,000 requests/min and 1,000,000 tokens/min. Excess requests trigger HTTP 429 with Retry-After header."
    }
  };

  chatBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      chatBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var key = btn.getAttribute('data-query');
      var data = ragData[key];
      if (!data) return;

      chatViewport.innerHTML = '<div class="chat-bubble user">' + data.query + '</div>' +
        '<div class="chat-bubble system thinking"><span class="spinner"></span> ' + data.status + '</div>';

      setTimeout(function () {
        chatViewport.innerHTML = '<div class="chat-bubble user">' + data.query + '</div>' +
          '<div class="chat-bubble system">' + data.response + '</div>';
      }, 700);
    });
  });

  function countMetricStats() {
    if (statsCounted) return;
    var ragSec = document.getElementById('p1');
    if (!ragSec) return;
    var rect = ragSec.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      statsCounted = true;
      metricVals.forEach(function (el) {
        var targetNum = parseFloat(el.getAttribute('data-target'));
        var isDecimal = targetNum % 1 !== 0;
        var duration = 1200;
        var startTime = null;

        function step(ts) {
          if (!startTime) startTime = ts;
          var progress = Math.min((ts - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var current = targetNum * eased;
          el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }
  }

  window.addEventListener('scroll', countMetricStats);
  countMetricStats();

  /* ==========================================
     3. DEMO 2: AI VISION CAPTION STREAM
     ========================================== */
  var blipCaption = document.getElementById('blip-caption');
  var captions = [
    '"A city crosswalk with passing traffic during sunset"',
    '"Pedestrian wearing coat holding smartphone near street lamp"',
    '"Sedan turning right at traffic intersection with 98.4% confidence"'
  ];
  var capIdx = 0;

  setInterval(function () {
    if (!blipCaption) return;
    capIdx = (capIdx + 1) % captions.length;
    blipCaption.style.opacity = '0';
    setTimeout(function () {
      blipCaption.textContent = captions[capIdx];
      blipCaption.style.opacity = '1';
    }, 300);
  }, 3500);

  /* ==========================================
     4. DEMO 3: NETFLIX INTERACTIVE CHART
     ========================================== */
  var chartBarsContainer = document.getElementById('chart-bars');
  var chartTitle = document.getElementById('chart-title');
  var chartTabs = document.querySelectorAll('.chart-tab');

  var datasets = {
    growth: {
      title: "Global Title Growth (2010–2021)",
      data: [
        { label: "'10", val: "20%" }, { label: "'12", val: "35%" },
        { label: "'14", val: "50%" }, { label: "'16", val: "75%" },
        { label: "'18", val: "88%" }, { label: "'20", val: "100%" }
      ]
    },
    genres: {
      title: "Top Content Categories",
      data: [
        { label: "Dramas", val: "95%" }, { label: "Comedies", val: "78%" },
        { label: "Action", val: "62%" }, { label: "Docs", val: "48%" },
        { label: "International", val: "84%" }, { label: "Sci-Fi", val: "40%" }
      ]
    },
    ratings: {
      title: "Maturity Rating Distribution",
      data: [
        { label: "TV-MA", val: "90%" }, { label: "TV-14", val: "70%" },
        { label: "R", val: "55%" }, { label: "TV-PG", val: "35%" },
        { label: "PG-13", val: "28%" }, { label: "TV-Y7", val: "15%" }
      ]
    }
  };

  function renderChart(type) {
    if (!chartBarsContainer) return;
    var set = datasets[type];
    if (!set) return;

    if (chartTitle) chartTitle.textContent = set.title;
    chartBarsContainer.innerHTML = '';

    set.data.forEach(function (item) {
      var wrap = document.createElement('div');
      wrap.className = 'chart-bar-wrap';
      wrap.innerHTML = '<div class="chart-bar-fill" style="height: 0%"></div><span class="chart-bar-label">' + item.label + '</span>';
      chartBarsContainer.appendChild(wrap);

      setTimeout(function () {
        var fill = wrap.querySelector('.chart-bar-fill');
        if (fill) fill.style.height = item.val;
      }, 50);
    });
  }

  chartTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      chartTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      renderChart(tab.getAttribute('data-type'));
    });
  });

  renderChart('growth');

  /* ==========================================
     5. DEMO 4: IR THERMAL HAND TRACKER CANVAS
     ========================================== */
  (function () {
    var canvas = document.getElementById('ir-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var angle = 0;

    function drawIRHand() {
      var w = canvas.width;
      var h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      var cx = w / 2;
      var cy = h / 2 + 10;
      angle += 0.03;
      var palmShiftX = Math.sin(angle) * 12;
      var palmShiftY = Math.cos(angle * 0.7) * 8;

      var landmarks = [
        [cx + palmShiftX, cy + 60 + palmShiftY], // Wrist
        [cx - 40 + palmShiftX, cy + 30 + palmShiftY], [cx - 60 + palmShiftX, cy - 10 + palmShiftY], [cx - 75 + palmShiftX, cy - 35 + palmShiftY], // Thumb
        [cx - 25 + palmShiftX, cy - 20 + palmShiftY], [cx - 30 + palmShiftX, cy - 60 + palmShiftY], [cx - 32 + palmShiftX, cy - 90 + palmShiftY], // Index
        [cx + palmShiftX, cy - 25 + palmShiftY], [cx + palmShiftX, cy - 70 + palmShiftY], [cx + palmShiftX, cy - 105 + palmShiftY], // Middle
        [cx + 25 + palmShiftX, cy - 20 + palmShiftY], [cx + 28 + palmShiftX, cy - 62 + palmShiftY], [cx + 30 + palmShiftX, cy - 92 + palmShiftY], // Ring
        [cx + 45 + palmShiftX, cy - 10 + palmShiftY], [cx + 52 + palmShiftX, cy - 40 + palmShiftY], [cx + 58 + palmShiftX, cy - 65 + palmShiftY]  // Pinky
      ];

      // Draw thermal connections
      ctx.strokeStyle = 'rgba(255, 69, 58, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var i = 0; i < landmarks.length - 1; i++) {
        if (i % 3 !== 0) {
          ctx.moveTo(landmarks[i][0], landmarks[i][1]);
          ctx.lineTo(landmarks[i + 1][0], landmarks[i + 1][1]);
        }
      }
      ctx.stroke();

      // Draw thermal glowing points
      landmarks.forEach(function (pt) {
        var grad = ctx.createRadialGradient(pt[0], pt[1], 0, pt[0], pt[1], 8);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.4, '#ff453a');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(pt[0], pt[1], 8, 0, Math.PI * 2);
        ctx.fill();
      });

      // Animated Palm Eye
      var eyeX = cx + palmShiftX;
      var eyeY = cy + palmShiftY;
      var eyeGrad = ctx.createRadialGradient(eyeX, eyeY, 0, eyeX, eyeY, 20);
      eyeGrad.addColorStop(0, '#ffffff');
      eyeGrad.addColorStop(0.3, '#ff9f0a');
      eyeGrad.addColorStop(0.7, '#ff453a');
      eyeGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = eyeGrad;
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, 20, 0, Math.PI * 2);
      ctx.fill();

      requestAnimationFrame(drawIRHand);
    }

    drawIRHand();
  })();

  /* ==========================================
     6. DEMO 6: STRANGE ATTRACTOR 3D CANVAS
     ========================================== */
  (function () {
    var canvas = document.getElementById('attractor-canvas-3d');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var currentSystem = 'lorenz';
    var animId;

    var systems = {
      lorenz: { sigma: 10, rho: 28, beta: 8 / 3, dt: 0.005, scale: 0.038 },
      rossler: { a: 0.2, b: 0.2, c: 5.7, dt: 0.012, scale: 0.08 },
      aizawa: { a: 0.95, b: 0.7, c: 0.6, d: 3.5, e: 0.25, f: 0.1, dt: 0.01, scale: 1.1 }
    };

    var params = systems.lorenz;
    var state = [0.1, 0, 0];
    var trail = [];
    var rotY = 0;

    function resize() {
      var dpr = window.devicePixelRatio || 1;
      var rect = canvas.parentElement.getBoundingClientRect();
      var sz = Math.min(rect.width, 360);
      canvas.width = sz * dpr;
      canvas.height = sz * dpr;
    }

    function step() {
      var p = params;
      var x = state[0], y = state[1], z = state[2];
      var dx, dy, dz;

      if (currentSystem === 'lorenz') {
        dx = p.sigma * (y - x);
        dy = x * (p.rho - z) - y;
        dz = x * y - p.beta * z;
      } else if (currentSystem === 'rossler') {
        dx = -y - z;
        dy = x + p.a * y;
        dz = p.b + z * (x - p.c);
      } else {
        dx = (z - p.b) * x - p.d * y;
        dy = p.d * x + (z - p.b) * y;
        dz = p.c + p.a * z - (z * z * z) / 3 - (x * x + y * y) * (1 + p.e * z) + p.f * z * x * x * x;
      }

      state[0] = x + dx * p.dt;
      state[1] = y + dy * p.dt;
      state[2] = z + dz * p.dt;
      trail.push([state[0], state[1], state[2]]);
      if (trail.length > 3000) trail.shift();
    }

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rotY += 0.008;

      var cx = canvas.width / 2;
      var cy = canvas.height / 2;
      var sc = params.scale * (canvas.width / 2);

      var cosY = Math.cos(rotY);
      var sinY = Math.sin(rotY);

      if (trail.length > 2) {
        for (var i = 1; i < trail.length; i++) {
          var p1 = trail[i - 1];
          var p2 = trail[i];

          // Rotate around Y
          var x1 = p1[0] * cosY - p1[1] * sinY;
          var y1 = p1[0] * sinY + p1[1] * cosY;
          var z1 = p1[2];

          var x2 = p2[0] * cosY - p2[1] * sinY;
          var y2 = p2[0] * sinY + p2[1] * cosY;
          var z2 = p2[2];

          var sx1 = cx + x1 * sc;
          var sy1 = cy - z1 * sc + (currentSystem === 'lorenz' ? 120 : 0);
          var sx2 = cx + x2 * sc;
          var sy2 = cy - z2 * sc + (currentSystem === 'lorenz' ? 120 : 0);

          var alpha = (i / trail.length);
          ctx.strokeStyle = 'rgba(0, 240, 255, ' + (alpha * 0.85).toFixed(2) + ')';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(sx1, sy1);
          ctx.lineTo(sx2, sy2);
          ctx.stroke();
        }
      }
    }

    function loop() {
      for (var i = 0; i < 4; i++) step();
      render();
      animId = requestAnimationFrame(loop);
    }

    function start() {
      resize();
      trail = [];
      state = [0.1, 0, 0];
      params = systems[currentSystem];
      if (animId) cancelAnimationFrame(animId);
      loop();
    }

    var sysBtns = document.querySelectorAll('.sys-btn');
    sysBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        sysBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        currentSystem = btn.getAttribute('data-sys');
        start();
      });
    });

    window.addEventListener('resize', resize);
    start();
  })();

  /* ==========================================
     7. DEMO 7: THREE BODY GRAVITATIONAL ENGINE
     ========================================== */
  (function () {
    var canvas = document.getElementById('threebody-canvas-2d');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');

    var bodies = [
      { x: 0, y: -0.4, vx: 0.45, vy: 0, mass: 1.5, color: '#ff9f0a' },
      { x: 0.6, y: 0.3, vx: -0.25, vy: 0.45, mass: 1.2, color: '#bf5af2' },
      { x: -0.5, y: 0.2, vx: 0.15, vy: -0.55, mass: 1.0, color: '#30d158' }
    ];

    var trails = [[], [], []];

    function resizeTB() {
      var dpr = window.devicePixelRatio || 1;
      var rect = canvas.parentElement.getBoundingClientRect();
      var sz = Math.min(rect.width, 360);
      canvas.width = sz * dpr;
      canvas.height = sz * dpr;
    }

    function stepTB() {
      var ax = [0, 0, 0], ay = [0, 0, 0];

      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          if (i === j) continue;
          var dx = bodies[j].x - bodies[i].x;
          var dy = bodies[j].y - bodies[i].y;
          var r = Math.sqrt(dx * dx + dy * dy) + 0.08;
          var f = bodies[j].mass / (r * r * r);
          ax[i] += f * dx;
          ay[i] += f * dy;
        }
      }

      for (var i = 0; i < 3; i++) {
        bodies[i].vx += ax[i] * 0.004;
        bodies[i].vy += ay[i] * 0.004;
        bodies[i].x += bodies[i].vx * 0.004;
        bodies[i].y += bodies[i].vy * 0.004;

        trails[i].push([bodies[i].x, bodies[i].y]);
        if (trails[i].length > 300) trails[i].shift();
      }
    }

    function drawTB() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      var cx = canvas.width / 2;
      var cy = canvas.height / 2;
      var sc = canvas.width * 0.35;

      // Draw trails
      for (var b = 0; b < 3; b++) {
        var tr = trails[b];
        if (tr.length < 2) continue;

        for (var i = 1; i < tr.length; i++) {
          var alpha = i / tr.length;
          ctx.strokeStyle = bodies[b].color;
          ctx.globalAlpha = alpha * 0.6;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(cx + tr[i - 1][0] * sc, cy + tr[i - 1][1] * sc);
          ctx.lineTo(cx + tr[i][0] * sc, cy + tr[i][1] * sc);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      // Draw celestial bodies with glowing energy radial gradients
      for (var i = 0; i < 3; i++) {
        var bx = cx + bodies[i].x * sc;
        var by = cy + bodies[i].y * sc;

        var grad = ctx.createRadialGradient(bx, by, 0, bx, by, 12);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.4, bodies[i].color);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bx, by, 12, 0, Math.PI * 2);
        ctx.fill();
      }

      stepTB();
      requestAnimationFrame(drawTB);
    }

    resizeTB();
    window.addEventListener('resize', resizeTB);
    drawTB();
  })();

})();