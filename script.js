const toggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  const dark = theme === "dark";
  document.body.classList.toggle("dark", dark);
  toggle.setAttribute("aria-pressed", String(dark));
  toggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  toggle.title = dark ? "Switch to light mode" : "Switch to dark mode";
}

let savedTheme = null;
try {
  savedTheme = localStorage.getItem("baranwal-theme");
} catch (_) {}

if (savedTheme === "dark" || savedTheme === "light") {
  applyTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

toggle.addEventListener("click", () => {
  const next = document.body.classList.contains("dark") ? "light" : "dark";
  applyTheme(next);
  try {
    localStorage.setItem("baranwal-theme", next);
  } catch (_) {}
});

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav a")];

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${entry.target.id}`
      );
    });
  });
}, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

sections.forEach((section) => observer.observe(section));

/* Floating header: stay in flow at the top, then overlay and reveal on upward scroll. */
(() => {
  const header = document.querySelector(".site-header");
  if (!header) return;

  let lastY = window.scrollY;
  let ticking = false;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  const updateHeader = () => {
    const y = window.scrollY;
    const delta = y - lastY;

    if (y > 24) header.classList.add("is-floating");
    else {
      header.classList.remove("is-floating", "nav-hidden");
    }

    if (!reduced.matches && y > 120 && Math.abs(delta) > 2) {
      if (delta > 0) header.classList.add("nav-hidden");
      else header.classList.remove("nav-hidden");
    } else if (y <= 120 || reduced.matches) {
      header.classList.remove("nav-hidden");
    }

    lastY = y;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
})();

/* Skills + Process interaction */
(() => {
  const skillSelectors = [
    ".skill-pill", ".skills-list span", ".skills-grid span",
    ".skill", ".skills li"
  ];
  const processSelectors = [
    ".process-step", ".process-card", ".process-item",
    ".process-grid > div", ".process-list > div", ".process-steps > div"
  ];

  const unique = (selectors) => {
    const nodes = [];
    selectors.forEach(s => document.querySelectorAll(s).forEach(n => {
      if (!nodes.includes(n)) nodes.push(n);
    }));
    return nodes;
  };

  const skills = unique(skillSelectors);
  const process = unique(processSelectors);

  // Cursor-position light on skill pills.
  if (matchMedia("(pointer:fine)").matches) {
    skills.forEach(el => {
      el.addEventListener("pointermove", e => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--skill-x", `${((e.clientX-r.left)/r.width)*100}%`);
        el.style.setProperty("--skill-y", `${((e.clientY-r.top)/r.height)*100}%`);
      });
      el.addEventListener("pointerenter", () => el.classList.add("is-active"));
      el.addEventListener("pointerleave", () => el.classList.remove("is-active"));
    });
  }

  // Click/focus interaction for skills: selected pill remains highlighted.
  skills.forEach(el => {
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "0");
    el.setAttribute("role", "button");
    el.addEventListener("click", () => {
      skills.forEach(s => s.classList.remove("is-active"));
      el.classList.add("is-active");
    });
    el.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        el.click();
      }
    });
  });

  // Process cards highlight on hover/focus and click.
  process.forEach((el, i) => {
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "0");
    el.addEventListener("pointerenter", () => {
      process.forEach(p => p.classList.remove("is-active"));
      el.classList.add("is-active");
    });
    el.addEventListener("focus", () => {
      process.forEach(p => p.classList.remove("is-active"));
      el.classList.add("is-active");
    });
    el.addEventListener("click", () => {
      process.forEach(p => p.classList.remove("is-active"));
      el.classList.add("is-active");
    });
    el.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        el.click();
      }
    });
  });
})();

/* Theme bulb micro-interaction: a tiny "switch on" pulse. */
(() => {
  const button = document.getElementById("themeToggle");
  if (!button) return;
  button.addEventListener("click", () => {
    button.classList.remove("theme-bulb-pulse");
    void button.offsetWidth;
    button.classList.add("theme-bulb-pulse");
  });
})();

/* =========================================================
   Minimal pencil sketch trace
   Leaves a faint hand-drawn mark while moving the pencil cursor.
   Each mark dissolves smoothly over ~3 seconds.
   ========================================================= */
(() => {
  if (!window.matchMedia || !window.matchMedia("(pointer:fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.id = "pencilSketchCanvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const marks = [];
  const LIFE = 3000;
  const MAX_MARKS = 180;
  let lastX = null;
  let lastY = null;
  let raf = 0;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener("resize", resize, { passive: true });

  const isDark = () => document.body.classList.contains("dark");

  const addMark = (x, y) => {
    if (lastX === null) {
      lastX = x;
      lastY = y;
      return;
    }

    const dx = x - lastX;
    const dy = y - lastY;
    const distance = Math.hypot(dx, dy);
    if (distance < 3) return;

    // Keep marks sparse: one tiny graphite stroke every few pixels.
    const steps = Math.min(3, Math.max(1, Math.floor(distance / 18)));
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const px = lastX + dx * t;
      const py = lastY + dy * t;
      const jitter = (Math.random() - 0.5) * 2.2;
      const length = 4 + Math.random() * 7;
      const angle = Math.atan2(dy, dx) + Math.PI / 2 + (Math.random() - 0.5) * 0.45;
      marks.push({
        x: px + jitter,
        y: py + jitter,
        x2: px + Math.cos(angle) * length,
        y2: py + Math.sin(angle) * length,
        born: performance.now(),
        alpha: 0.12 + Math.random() * 0.07,
        width: 0.55 + Math.random() * 0.45
      });
    }

    while (marks.length > MAX_MARKS) marks.shift();
    lastX = x;
    lastY = y;
    if (!raf) raf = requestAnimationFrame(draw);
  };

  const draw = (now) => {
    raf = 0;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    const dark = isDark();
    const rgb = dark ? "245, 224, 201" : "65, 45, 32";

    for (let i = marks.length - 1; i >= 0; i--) {
      const m = marks[i];
      const age = now - m.born;
      if (age >= LIFE) {
        marks.splice(i, 1);
        continue;
      }
      const fade = 1 - age / LIFE;
      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(m.x2, m.y2);
      ctx.strokeStyle = `rgba(${rgb}, ${m.alpha * fade})`;
      ctx.lineWidth = m.width;
      ctx.lineCap = "round";
      ctx.stroke();
    }

    if (marks.length) raf = requestAnimationFrame(draw);
  };

  window.addEventListener("pointermove", (event) => {
    if (event.pointerType && event.pointerType !== "mouse") return;
    addMark(event.clientX, event.clientY);
    if (!raf) raf = requestAnimationFrame(draw);
  }, { passive: true });

  window.addEventListener("pointerleave", () => {
    lastX = lastY = null;
  }, { passive: true });
})();
