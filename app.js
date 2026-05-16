const DATA = window.SITE_DATA;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

$("#metricFrontier").textContent = DATA.frontiers.length;
$("#metricDirection").textContent = DATA.directions.length;
$("#metricCourse").textContent = DATA.courses.length;

const menuBtn = $("#menuBtn");
const navLinks = $("#navLinks");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
$$(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

function renderFrontiers() {
  $("#frontierGrid").innerHTML = DATA.frontiers.map((item) => `
    <article class="frontier-card">
      <img class="frontier-image" src="${item.image}" alt="${item.title} 装饰图">
      <h3>${item.title}</h3>
      <p>${item.summary}</p>
      <div class="tag-row">
        ${item.points.map((x) => `<span class="tag">${x}</span>`).join("")}
      </div>
      <p><strong>关联课程：</strong>${item.related.join("、")}</p>
      <a class="source-link" href="${item.url}" target="_blank" rel="noopener">参考来源：${item.source} →</a>
    </article>
  `).join("");
}

function renderDirections() {
  $("#directionGrid").innerHTML = DATA.directions.map((item, index) => `
    <article class="direction-card" data-index="${index}">
      <img src="${item.image}" alt="${item.title} 方向装饰图">
      <div class="direction-body">
        <div class="direction-head">
          <span>${item.icon}</span>
          <h3>${item.title}</h3>
        </div>
        <p>${item.summary}</p>
        <div class="tag-row">
          ${item.courses.map((x) => `<span class="tag">${x}</span>`).join("")}
        </div>
        <div class="direction-tabs">
          <button class="direction-tab" data-kind="keyQuestions">关键问题</button>
          <button class="direction-tab" data-kind="methods">技术方法</button>
          <button class="direction-tab" data-kind="applications">典型应用</button>
          <button class="direction-tab" data-kind="courses">关联课程</button>
        </div>
        <div class="direction-extra" id="directionExtra${index}">
          <ul>${item.keyQuestions.map((x) => `<li>${x}</li>`).join("")}</ul>
        </div>
      </div>
    </article>
  `).join("");

  $$(".direction-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".direction-card");
      const index = Number(card.dataset.index);
      const kind = btn.dataset.kind;
      const values = DATA.directions[index][kind];
      $(`#directionExtra${index}`).innerHTML = `<ul>${values.map((x) => `<li>${x}</li>`).join("")}</ul>`;
    });
  });
}

let activeCategory = "全部";
let activeCourseId = "circuit";

function renderCategoryChips() {
  const wrap = $("#categoryChips");
  wrap.innerHTML = DATA.categories.map((category) => `
    <button class="chip ${category === activeCategory ? "active" : ""}" data-category="${category}">
      ${category}
    </button>
  `).join("");

  wrap.querySelectorAll(".chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.category;
      renderCategoryChips();
      renderCourses();
    });
  });
}

function getFilteredCourses() {
  const keyword = $("#courseSearch").value.trim().toLowerCase();
  return DATA.courses.filter((course) => {
    const inCategory = activeCategory === "全部" || course.category === activeCategory;
    const text = [
      course.title,
      course.category,
      course.summary,
      course.concepts.join(" "),
      course.prerequisites.join(" "),
      course.goals.join(" ")
    ].join(" ").toLowerCase();
    return inCategory && (!keyword || text.includes(keyword));
  });
}

function renderCourses() {
  const list = getFilteredCourses();
  const courseList = $("#courseList");

  if (!list.length) {
    courseList.innerHTML = `<p class="empty">没有找到匹配课程。</p>`;
    $("#courseDetail").innerHTML = `<p class="empty">请换一个关键词或分类。</p>`;
    return;
  }

  if (!list.some((course) => course.id === activeCourseId)) {
    activeCourseId = list[0].id;
  }

  courseList.innerHTML = list.map((course) => `
    <button class="course-item ${course.id === activeCourseId ? "active" : ""}" data-id="${course.id}">
      <strong>${course.icon} ${course.title}</strong>
      <span>${course.category} · 难度：${course.difficulty}</span>
    </button>
  `).join("");

  courseList.querySelectorAll(".course-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCourseId = btn.dataset.id;
      renderCourses();
    });
  });

  const active = DATA.courses.find((course) => course.id === activeCourseId);
  renderCourseDetail(active);
}

function renderCourseDetail(course) {
  $("#courseDetail").innerHTML = `
    <div class="detail-top">
      <div>
        <p class="eyebrow">${course.category}</p>
        <h2>${course.icon} ${course.title}</h2>
      </div>
      <span class="badge">难度：${course.difficulty}</span>
    </div>

    <p>${course.summary}</p>

    <div class="detail-grid">
      <div class="detail-box">
        <h4>先修知识</h4>
        <ul>${course.prerequisites.map((x) => `<li>${x}</li>`).join("")}</ul>
      </div>
      <div class="detail-box">
        <h4>核心概念</h4>
        <ul>${course.concepts.map((x) => `<li>${x}</li>`).join("")}</ul>
      </div>
      <div class="detail-box">
        <h4>学习目标</h4>
        <ul>${course.goals.map((x) => `<li>${x}</li>`).join("")}</ul>
      </div>
      <div class="detail-box">
        <h4>学习建议</h4>
        <p>${course.advice}</p>
      </div>
    </div>

    <a class="btn primary" href="${course.video.url}" target="_blank" rel="noopener">
      打开 B 站视频：${course.video.title}
    </a>
  `;
}

function renderResources() {
  $("#resourceGrid").innerHTML = DATA.courses.filter((course) => course.id !== "math" && course.id !== "physics").map((course) => `
    <article class="resource-card">
      <div class="resource-icon">▶</div>
      <span class="tag">${course.category}</span>
      <h3>${course.title}</h3>
      <p><strong>${course.video.title}</strong></p>
      <p>${course.video.note}</p>
      <a class="btn primary" href="${course.video.url}" target="_blank" rel="noopener">打开视频</a>
    </article>
  `).join("");
}

function renderRoadmap() {
  $("#roadStageWrap").innerHTML = DATA.roadmapStages.map((stage) => `
    <article class="road-stage">
      <span>${stage.stage}</span>
      <h3>${stage.title}</h3>
      <p>${stage.aim}</p>
      <ul>${stage.courses.map((x) => `<li>${x}</li>`).join("")}</ul>
      <p><strong>阶段成果：</strong>${stage.output}</p>
    </article>
  `).join("");

  renderGraph();
}

function renderGraph(activeId = "") {
  const svg = $("#courseGraph");
  const { nodes, edges } = DATA.graph;
  const nodeById = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const activeEdges = new Set();

  if (activeId) {
    edges.forEach(([a, b]) => {
      if (a === activeId || b === activeId) {
        activeEdges.add(`${a}-${b}`);
      }
    });
  }

  const defs = `
    <defs>
      <marker id="arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
        <path d="M2,2 L10,6 L2,10 Z" fill="#a9c8db"></path>
      </marker>
      <marker id="arrowActive" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
        <path d="M2,2 L10,6 L2,10 Z" fill="#1a91d6"></path>
      </marker>
    </defs>
  `;

  const edgeMarkup = edges.map(([a, b]) => {
    const p1 = nodeById[a];
    const p2 = nodeById[b];
    const isActive = activeEdges.has(`${a}-${b}`);
    const x1 = p1.x + 92;
    const y1 = p1.y + 34;
    const x2 = p2.x + 8;
    const y2 = p2.y + 34;
    const mid = (x1 + x2) / 2;
    return `<path class="graph-edge ${isActive ? "active" : ""}" marker-end="url(#${isActive ? "arrowActive" : "arrow"})" d="M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}" />`;
  }).join("");

  const nodeMarkup = nodes.map((n) => `
    <g class="graph-node ${n.id === activeId ? "active" : ""}" data-id="${n.id}" tabindex="0" role="button" aria-label="${n.name}">
      <rect x="${n.x}" y="${n.y}" width="160" height="74" rx="18"></rect>
      <text x="${n.x + 80}" y="${n.y + 32}" text-anchor="middle">${n.name}</text>
      <text class="group-label" x="${n.x + 80}" y="${n.y + 56}" text-anchor="middle">${n.group}</text>
    </g>
  `).join("");

  svg.innerHTML = defs + edgeMarkup + nodeMarkup;

  svg.querySelectorAll(".graph-node").forEach((node) => {
    const setActive = () => {
      const id = node.dataset.id;
      const data = DATA.graph.nodes.find((n) => n.id === id);
      $("#topologyInfo").textContent = `${data.name}：${data.desc}`;
      renderGraph(id);
    };
    node.addEventListener("click", setActive);
    node.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") setActive();
    });
  });
}

$("#courseSearch").addEventListener("input", renderCourses);

renderFrontiers();
renderDirections();
renderCategoryChips();
renderCourses();
renderResources();
renderRoadmap();

/* ===========================
   Canvas 3D 动画实验室升级版
=========================== */

class Canvas3DLab {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = 0;
    this.height = 0;

    this.yaw = -0.65;
    this.pitch = 0.42;
    this.zoom = 1;
    this.speed = 1;
    this.intensity = 1;
    this.density = 1;
    this.demo = "em";
    this.time = 0;
    this.paused = false;
    this.showTrails = true;
    this.showLabels = true;
    this.showAxis = true;

    this.dragging = false;
    this.lastPointer = { x: 0, y: 0 };

    this.setupEvents();
    this.resize();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  setupEvents() {
    this.canvas.addEventListener("pointerdown", (event) => {
      this.dragging = true;
      this.lastPointer = { x: event.clientX, y: event.clientY };
      this.canvas.setPointerCapture(event.pointerId);
    });

    this.canvas.addEventListener("pointermove", (event) => {
      if (!this.dragging) return;
      const dx = event.clientX - this.lastPointer.x;
      const dy = event.clientY - this.lastPointer.y;
      this.lastPointer = { x: event.clientX, y: event.clientY };
      this.yaw += dx * 0.008;
      this.pitch += dy * 0.008;
      this.pitch = Math.max(-1.18, Math.min(1.18, this.pitch));
    });

    this.canvas.addEventListener("pointerup", () => { this.dragging = false; });
    this.canvas.addEventListener("pointercancel", () => { this.dragging = false; });

    this.canvas.addEventListener("wheel", (event) => {
      event.preventDefault();
      this.zoom *= event.deltaY > 0 ? 0.92 : 1.08;
      this.zoom = Math.max(0.55, Math.min(2.4, this.zoom));
    }, { passive: false });

    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.width = Math.max(340, rect.width);
    this.height = Math.max(480, rect.height);
    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  resetView() {
    this.yaw = -0.65;
    this.pitch = 0.42;
    this.zoom = 1;
  }

  topView() {
    this.yaw = 0;
    this.pitch = 1.12;
    this.zoom = 1.05;
  }

  sideView() {
    this.yaw = -Math.PI / 2;
    this.pitch = 0.12;
    this.zoom = 1;
  }

  setDemo(demo) {
    this.demo = demo;
    this.time = 0;
  }

  project(point) {
    let [x, y, z] = point;
    const cosY = Math.cos(this.yaw);
    const sinY = Math.sin(this.yaw);
    const x1 = x * cosY - z * sinY;
    const z1 = x * sinY + z * cosY;

    const cosP = Math.cos(this.pitch);
    const sinP = Math.sin(this.pitch);
    const y2 = y * cosP - z1 * sinP;
    const z2 = y * sinP + z1 * cosP;

    const distance = 9.5;
    const perspective = (540 * this.zoom) / (distance + z2);
    return {
      x: this.width / 2 + x1 * perspective,
      y: this.height / 2 - y2 * perspective,
      z: z2,
      scale: perspective / 540
    };
  }

  clear() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    const gradient = ctx.createRadialGradient(
      this.width * 0.45, this.height * 0.35, 10,
      this.width * 0.5, this.height * 0.5, Math.max(this.width, this.height) * 0.78
    );
    gradient.addColorStop(0, "rgba(51, 194, 255, 0.20)");
    gradient.addColorStop(0.42, "rgba(255, 255, 255, 0.82)");
    gradient.addColorStop(1, "rgba(232, 247, 255, 0.85)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.width, this.height);

    this.drawGrid();
    if (this.showAxis) this.drawAxis();
  }

  drawGrid() {
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = "rgba(26, 145, 214, 0.12)";
    ctx.lineWidth = 1;
    for (let i = -6; i <= 6; i++) {
      this.lineRaw([-6, -2.2, i], [6, -2.2, i]);
      this.lineRaw([i, -2.2, -6], [i, -2.2, 6]);
    }
    ctx.restore();
  }

  drawAxis() {
    this.arrow([0, -2.15, 0], [4.8, -2.15, 0], "#ff6b8a", "x");
    this.arrow([0, -2.15, 0], [0, 2.6, 0], "#13a886", "y");
    this.arrow([0, -2.15, 0], [0, -2.15, 4.8], "#1a91d6", "z");
  }

  lineRaw(a, b) {
    const p1 = this.project(a);
    const p2 = this.project(b);
    this.ctx.beginPath();
    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.lineTo(p2.x, p2.y);
    this.ctx.stroke();
  }

  line(a, b, color = "rgba(26, 145, 214, 0.82)", width = 2) {
    const p1 = this.project(a);
    const p2 = this.project(b);
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(0.75, width * (p1.scale + p2.scale));
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    ctx.restore();
  }

  polyline(points, color, width = 1.6) {
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    points.forEach((pt, i) => {
      const p = this.project(pt);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();
    ctx.restore();
  }

  sphere(point, radius, color, glow = false, label = "") {
    const p = this.project(point);
    const ctx = this.ctx;
    const r = Math.max(2.2, radius * 84 * p.scale);

    ctx.save();
    if (glow) {
      ctx.shadowColor = color;
      ctx.shadowBlur = 18;
    }
    const grad = ctx.createRadialGradient(p.x - r * 0.35, p.y - r * 0.35, 1, p.x, p.y, r);
    grad.addColorStop(0, "#ffffff");
    grad.addColorStop(0.22, color);
    grad.addColorStop(1, "rgba(26, 50, 77, 0.35)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    if (label && this.showLabels) this.label(point, label, radius + 0.15);
  }

  label(point, text, lift = 0.35) {
    const p = this.project([point[0], point[1] + lift, point[2]]);
    const ctx = this.ctx;
    ctx.save();
    ctx.font = "800 13px system-ui, sans-serif";
    const w = ctx.measureText(text).width + 18;
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.strokeStyle = "rgba(26,145,214,0.18)";
    roundRect(ctx, p.x - w / 2, p.y - 14, w, 26, 13);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#17324d";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, p.x, p.y);
    ctx.restore();
  }

  arrow(from, to, color = "#1a91d6", label = "") {
    this.line(from, to, color, 2.5);
    const p1 = this.project(from);
    const p2 = this.project(to);
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    const size = 10;
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(p2.x, p2.y);
    ctx.lineTo(p2.x - Math.cos(angle - 0.45) * size, p2.y - Math.sin(angle - 0.45) * size);
    ctx.lineTo(p2.x - Math.cos(angle + 0.45) * size, p2.y - Math.sin(angle + 0.45) * size);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    if (label && this.showLabels) this.label(to, label, 0.2);
  }

  ring(radius, y, color, tilt = 0, lineWidth = 1.3) {
    const points = [];
    for (let i = 0; i <= 120; i++) {
      const a = (i / 120) * Math.PI * 2;
      points.push([
        Math.cos(a) * radius,
        Math.sin(tilt) * Math.sin(a) * radius + y,
        Math.cos(tilt) * Math.sin(a) * radius
      ]);
    }
    this.polyline(points, color, lineWidth);
  }

  drawEM() {
    const t = this.time * this.speed;
    const count = Math.floor(20 + this.density * 22);
    const intensity = this.intensity;

    this.sphere([0, 0, 0], 0.44, "#f5b700", true, "+ 电荷");

    for (let r = 1.05; r <= 3.8; r += 0.55) {
      this.ring(r, 0, "rgba(26, 145, 214, 0.14)", Math.PI / 2, 1.2);
      this.ring(r * 0.82, 0, "rgba(128,103,232,0.12)", 0.55, 1);
    }

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const wobble = Math.sin(t * 1.7 + i) * 0.16 * intensity;
      const y = Math.sin(i * 1.7 + t) * 0.56 * intensity;
      const start = [Math.cos(angle) * 0.65, y * 0.08, Math.sin(angle) * 0.65];
      const end = [
        Math.cos(angle + wobble) * (2.7 + intensity * 0.55),
        y,
        Math.sin(angle + wobble) * (2.7 + intensity * 0.55)
      ];
      this.arrow(start, end, i % 2 ? "#1a91d6" : "#8067e8");
    }
  }

  drawMotor() {
    const t = this.time * this.speed;
    const intensity = this.intensity;

    this.ring(2.72, 0, "rgba(26,145,214,0.72)", Math.PI / 2, 3.4);
    this.ring(2.12, 0, "rgba(26,145,214,0.28)", Math.PI / 2, 1.5);

    const coilColors = ["#ff6b8a", "#1a91d6", "#8067e8"];
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2;
      const center = [Math.cos(a) * 2.45, 0, Math.sin(a) * 2.45];
      const pulse = 0.7 + Math.sin(t * 2 + i * Math.PI * 2 / 3) * 0.3;
      this.sphere(center, 0.24 + pulse * 0.03, coilColors[i], true, ["A相", "B相", "C相"][i]);
      this.ring(0.34 + pulse * 0.1, 0, coilColors[i], a, 2);
    }

    const rotorAngle = t * 2.1 * intensity;
    for (let i = 0; i < 8; i++) {
      const a = rotorAngle + i * Math.PI / 4;
      this.line([Math.cos(a) * 0.25, 0, Math.sin(a) * 0.25], [Math.cos(a) * 1.28, 0, Math.sin(a) * 1.28], "#f5b700", 5);
    }
    this.sphere([0, 0, 0], 0.3, "#f5b700", true, "转子");

    const fieldAngle = t * 2.8;
    this.arrow([0, 0.55, 0], [Math.cos(fieldAngle) * 1.9, 0.55, Math.sin(fieldAngle) * 1.9], "#13a886", "B合成");
    if (this.showTrails) {
      for (let k = 1; k <= 5; k++) {
        const a = fieldAngle - k * 0.32;
        this.line([0, 0.45, 0], [Math.cos(a) * (1.8 - k * 0.15), 0.45, Math.sin(a) * (1.8 - k * 0.15)], `rgba(19,168,134,${0.28 - k*0.035})`, 2);
      }
    }
  }

  drawAnalog() {
    const t = this.time * this.speed;
    const gain = this.intensity;
    const input = [];
    const output = [];
    for (let i = 0; i <= 160; i++) {
      const x = -4.4 + (i / 160) * 8.8;
      input.push([x, Math.sin(x * 2.4 + t * 2.2) * 0.34, -1.35]);
      output.push([x, Math.sin(x * 2.4 + t * 2.2) * 0.34 * (1.2 + gain), 1.35]);
    }

    if (this.showTrails) {
      for (let offset = 1; offset <= 3; offset++) {
        const trail = [];
        for (let i = 0; i <= 160; i++) {
          const x = -4.4 + (i / 160) * 8.8;
          trail.push([x, Math.sin(x * 2.4 + t * 2.2 - offset * 0.28) * 0.34 * (1.2 + gain), 1.35]);
        }
        this.polyline(trail, `rgba(255,138,61,${0.16 / offset})`, 2);
      }
    }

    this.polyline(input, "#1a91d6", 2.4);
    this.polyline(output, "#ff8a3d", 3.0);
    this.label([-3.2, 0.8, -1.35], "输入小信号", 0.12);
    this.label([2.4, 1.35, 1.35], "输出放大信号", 0.12);
    this.box([0, 0, 0], [1.55, 1.25, 1.0], "#8067e8", `增益 ${(1.2 + gain).toFixed(1)}x`);
  }

  drawDigital() {
    const t = this.time * this.speed;
    const density = this.density;
    const count = Math.floor(10 + density * 7);
    for (let i = 0; i < count; i++) {
      const high = Math.sin(t * 4 + i * 0.8) > 0;
      const h = high ? 1.2 * this.intensity : 0.25;
      const x = -4.6 + i * (9.2 / Math.max(1, count - 1));
      const z = (i % 2) * 0.8 - 0.4;
      this.drawColumn(x, -1.85, z, 0.28, h, high ? "#1a91d6" : "#b6cddd");
      if (this.showLabels) this.label([x, -1.62 + h, z], high ? "1" : "0", 0.16);
    }

    const step = [];
    for (let i = 0; i < 12; i++) {
      const x1 = -4.2 + i * 0.7;
      const y = i % 2 ? -0.75 : 0.05;
      step.push([x1, y, 1.55]);
      step.push([x1 + 0.7, y, 1.55]);
    }
    this.polyline(step, "#f5b700", 3);
    this.label([0, 0.9, 1.5], "时钟脉冲 CLK", 0.1);
  }

  drawPower() {
    const t = this.time * this.speed;
    const nodes = [
      { name: "发电厂", pos: [-4.0, 0, -1.45], color: "#f5b700" },
      { name: "升压站", pos: [-1.35, 0.3, 1.25], color: "#1a91d6" },
      { name: "变电站", pos: [1.35, 0.2, 1.0], color: "#8067e8" },
      { name: "城市负荷", pos: [4.0, 0, -1.45], color: "#ff6b8a" }
    ];

    for (let i = 0; i < nodes.length - 1; i++) {
      this.line(nodes[i].pos, nodes[i + 1].pos, "rgba(26,145,214,0.72)", 3.1);
    }
    nodes.forEach((node) => this.sphere(node.pos, 0.32, node.color, true, node.name));

    const path = nodes.map((n) => n.pos);
    const particleCount = Math.floor(12 + this.density * 14);
    for (let i = 0; i < particleCount; i++) {
      const progress = (t * 0.28 + i / particleCount) % 1;
      const pos = interpolatePath(path, progress);
      this.sphere(pos, 0.06 + this.intensity * 0.016, "#ffffff", true);
      if (this.showTrails) {
        const prev = interpolatePath(path, (progress - 0.035 + 1) % 1);
        this.line(prev, pos, "rgba(245,183,0,0.32)", 2);
      }
    }
    this.label([0, 1.25, 0], `潮流强度 ${(this.intensity * 100).toFixed(0)}%`, 0.1);
  }

  drawColumn(x, baseY, z, size, height, color) {
    const p = [
      [x-size, baseY, z-size], [x+size, baseY, z-size], [x+size, baseY+height, z-size], [x-size, baseY+height, z-size],
      [x-size, baseY, z+size], [x+size, baseY, z+size], [x+size, baseY+height, z+size], [x-size, baseY+height, z+size]
    ];
    [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]]
      .forEach(([a, b]) => this.line(p[a], p[b], color, 2.1));
    this.sphere([x, baseY + height, z], 0.075, color, true);
  }

  box(center, size, color, label = "") {
    const [cx, cy, cz] = center;
    const [sx, sy, sz] = size.map((v) => v / 2);
    const p = [
      [cx-sx, cy-sy, cz-sz], [cx+sx, cy-sy, cz-sz], [cx+sx, cy+sy, cz-sz], [cx-sx, cy+sy, cz-sz],
      [cx-sx, cy-sy, cz+sz], [cx+sx, cy-sy, cz+sz], [cx+sx, cy+sy, cz+sz], [cx-sx, cy+sy, cz+sz]
    ];
    [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]]
      .forEach(([a, b]) => this.line(p[a], p[b], color, 2.4));
    this.sphere(center, 0.12, color, true, label);
  }

  render() {
    this.clear();
    if (this.demo === "em") this.drawEM();
    if (this.demo === "motor") this.drawMotor();
    if (this.demo === "analog") this.drawAnalog();
    if (this.demo === "digital") this.drawDigital();
    if (this.demo === "power") this.drawPower();
  }

  animate(now) {
    if (!this.lastTime) this.lastTime = now;
    const dt = Math.min(0.04, (now - this.lastTime) / 1000);
    this.lastTime = now;

    if (!this.paused) this.time += dt;
    if (!this.dragging && !this.paused) this.yaw += 0.0012 * this.speed;

    this.render();
    requestAnimationFrame(this.animate);
  }
}

function interpolatePath(points, t) {
  const segments = points.length - 1;
  const raw = t * segments;
  const index = Math.min(segments - 1, Math.floor(raw));
  const local = raw - index;
  const a = points[index];
  const b = points[index + 1];
  return [
    a[0] + (b[0] - a[0]) * local,
    a[1] + (b[1] - a[1]) * local,
    a[2] + (b[2] - a[2]) * local
  ];
}

function roundRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

const lab = new Canvas3DLab($("#labCanvas"));

function updateConcept() {
  const demo = DATA.demos[$("#demoSelect").value];
  $("#conceptTitle").textContent = demo.title;
  $("#conceptText").textContent = demo.text;
  $("#conceptBullets").innerHTML = demo.bullets.map((x) => `<li>${x}</li>`).join("");
}

$("#demoSelect").addEventListener("change", (event) => {
  lab.setDemo(event.target.value);
  updateConcept();
});

$("#speedRange").addEventListener("input", (event) => {
  lab.speed = Number(event.target.value);
  $("#speedValue").textContent = `${lab.speed.toFixed(1)}x`;
});

$("#intensityRange").addEventListener("input", (event) => {
  lab.intensity = Number(event.target.value);
  $("#intensityValue").textContent = lab.intensity.toFixed(1);
});

$("#densityRange").addEventListener("input", (event) => {
  lab.density = Number(event.target.value);
  $("#densityValue").textContent = lab.density.toFixed(1);
});

$("#trailToggle").addEventListener("change", (event) => { lab.showTrails = event.target.checked; });
$("#labelToggle").addEventListener("change", (event) => { lab.showLabels = event.target.checked; });
$("#axisToggle").addEventListener("change", (event) => { lab.showAxis = event.target.checked; });

$("#resetViewBtn").addEventListener("click", () => lab.resetView());
$("#topViewBtn").addEventListener("click", () => lab.topView());
$("#sideViewBtn").addEventListener("click", () => lab.sideView());

$("#pauseBtn").addEventListener("click", () => {
  lab.paused = !lab.paused;
  $("#pauseBtn").textContent = lab.paused ? "继续动画" : "暂停动画";
  $("#labStatus").textContent = lab.paused ? "已暂停" : "运行中";
});

updateConcept();


/* ===========================
   AI 学习助手
   前端只请求 /api/chat，不保存 API Key
=========================== */

const aiForm = document.querySelector("#aiForm");
const aiInput = document.querySelector("#aiInput");
const aiMessages = document.querySelector("#aiMessages");
const aiSuggestions = Array.from(document.querySelectorAll(".ai-suggestion"));
const aiHistory = [];

function addAiMessage(role, text, className = "") {
  if (!aiMessages) return null;
  const div = document.createElement("div");
  div.className = `ai-message ${role} ${className}`.trim();
  div.textContent = text;
  aiMessages.appendChild(div);
  aiMessages.scrollTop = aiMessages.scrollHeight;
  return div;
}

async function askAi(message) {
  if (!message) return;

  addAiMessage("user", message);
  aiHistory.push({ role: "user", content: message });

  const loading = addAiMessage("assistant", "正在思考中，请稍等...", "loading");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message,
        history: aiHistory.slice(-8)
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "请求失败");
    }

    const reply = data.reply || "没有返回内容。";
    loading.textContent = reply;
    loading.classList.remove("loading");
    aiHistory.push({ role: "assistant", content: reply });
  } catch (error) {
    loading.textContent =
      "调用失败：" +
      error.message +
      "\n\n如果你是在本地直接运行 app.py，这个 AI 接口不会生效；请部署 Render Web Service，并在 Environment Variables 中配置 OPENAI_API_KEY。";
    loading.classList.remove("loading");
  }
}

if (aiForm) {
  aiForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = aiInput.value.trim();
    if (!message) return;
    aiInput.value = "";
    askAi(message);
  });
}

aiSuggestions.forEach((button) => {
  button.addEventListener("click", () => {
    const question = button.dataset.question;
    if (aiInput) aiInput.value = question;
    askAi(question);
  });
});
