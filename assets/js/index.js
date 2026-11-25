(() => {
  const root = document.documentElement;
  root.classList.add("js");
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const EMAIL = "contact@rizwansari.com";

  // Experience since Jan 2021 (first role), computed live
  const CAREER_START = new Date(2021, 0, 1);
  (function setExperience() {
    const now = new Date();
    let months = (now.getFullYear() - CAREER_START.getFullYear()) * 12 + (now.getMonth() - CAREER_START.getMonth());
    if (now.getDate() < CAREER_START.getDate()) months--;
    const txt = `${Math.floor(months / 12)}y ${months % 12}m`;
    $$("[data-exp]").forEach((el) => (el.textContent = txt));
    $$("[data-exp-str]").forEach((el) => (el.textContent = `"${txt}"`));
  })();

  $("#year").textContent = new Date().getFullYear();

  /* ---------- Career bar: proportional to real months, jumps to a role ---------- */
  (function career() {
    const bar = $(".career-bar");
    if (!bar) return;
    const monthIdx = (y, m) => (y - CAREER_START.getFullYear()) * 12 + m - CAREER_START.getMonth();
    const now = new Date();
    const total = monthIdx(now.getFullYear(), now.getMonth()) + 1;
    const fmt = (m) => {
      const y = Math.floor(m / 12);
      const r = m % 12;
      return [y ? y + "y" : "", r ? r + "m" : ""].filter(Boolean).join(" ");
    };
    const segs = $$(".seg", bar);
    segs.forEach((seg) => {
      const [sy, sm] = seg.dataset.start.split("-").map(Number);
      const start = monthIdx(sy, sm - 1);
      let end;
      if (seg.dataset.end === "now") {
        end = total;
      } else {
        const [ey, em] = seg.dataset.end.split("-").map(Number);
        end = monthIdx(ey, em - 1) + 1;
      }
      seg.style.flexGrow = end - start;
      $(".seg-dur", seg).textContent = fmt(end - start);
      seg.addEventListener("click", () => {
        const job = $(seg.dataset.target);
        if (!job) return;
        job.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
        job.classList.add("flash");
        setTimeout(() => job.classList.remove("flash"), 1400);
      });
    });

    // year ticks
    const ticks = $(".career-ticks");
    for (let y = CAREER_START.getFullYear(); y <= now.getFullYear(); y++) {
      const t = document.createElement("span");
      t.textContent = y;
      t.style.left = (monthIdx(y, 0) / total) * 100 + "%";
      ticks.append(t);
    }

    // proportional mini-bar (phones): one slice per role, same widths as the real months
    const prop = document.createElement("div");
    prop.className = "career-prop";
    prop.setAttribute("aria-hidden", "true");
    const propSlices = segs.map((seg) => {
      const sl = document.createElement("span");
      sl.style.flexGrow = seg.style.flexGrow;
      prop.append(sl);
      return sl;
    });
    bar.before(prop);

    const phone = matchMedia("(max-width: 760px)");
    function centerSeg(seg) {
      if (!phone.matches) return;
      const left = seg.getBoundingClientRect().left - bar.getBoundingClientRect().left + bar.scrollLeft - 20;
      bar.scrollTo({ left: Math.max(0, left), behavior: reduced ? "auto" : "smooth" });
    }
    // start on the current role (rightmost), like "Today" on the timeline
    requestAnimationFrame(() => {
      if (phone.matches) bar.scrollLeft = bar.scrollWidth;
    });

    // highlight the segment for the role currently in view
    const roleObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          const seg = segs.find((s) => s.dataset.target === "#" + en.target.id);
          if (!seg) return;
          seg.classList.toggle("active", en.isIntersecting);
          propSlices[segs.indexOf(seg)].classList.toggle("on", en.isIntersecting);
          if (en.isIntersecting) centerSeg(seg);
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    segs.forEach((s) => {
      const job = $(s.dataset.target);
      if (job) roleObs.observe(job);
    });
  })();

  /* ---------- Logo: Rizwan Ansari -> ra ---------- */
  const brand = $("#brand");
  if (brand) setTimeout(() => brand.classList.add("collapsed"), reduced ? 0 : 2000);

  /* ---------- Toast ---------- */
  const toastEl = $("#toast");
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1800);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast("Email copied to clipboard");
    } catch {
      toast(EMAIL);
    }
  }
  $("#copy-email").addEventListener("click", copyEmail);

  /* ---------- Theme ---------- */
  function toggleTheme() {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }
  $("#theme-toggle").addEventListener("click", toggleTheme);

  /* ---------- Rotating word ---------- */
  const words = ["scale", "stay fast", "stay up", "ship on time", "last"];
  const rot = $("#rotator");
  let wi = 0;
  if (!reduced && rot) {
    setInterval(() => {
      wi = (wi + 1) % words.length;
      const s = document.createElement("span");
      s.textContent = words[wi];
      rot.replaceChildren(s);
    }, 2400);
  }

  /* ---------- Scroll: progress, nav hide, active link, parallax spot ---------- */
  const progress = $(".progress") || { style: {} };
  const nav = $("#nav");
  const links = $$(".nav-links a");
  const sections = links.map((a) => $(a.getAttribute("href")));
  let lastY = 0;
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    nav.classList.toggle("hide", y > lastY && y > 160 && !nav.classList.contains("open"));
    lastY = y;

    let current = null;
    sections.forEach((s) => {
      if (s && s.getBoundingClientRect().top < innerHeight * 0.4) current = s.id;
    });
    links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
    ticking = false;
  }
  addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    },
    { passive: true }
  );
  onScroll();

  /* ---------- Mobile menu ---------- */
  const menuBtn = $("#menu-btn");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    if (menuBtn) {
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
  }
  if (menuBtn) {
    menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
    $$(".nav-links a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        setMenu(false);
        menuBtn.focus();
      }
    });
    // tapping the dimmed page (or anywhere outside the nav) closes it
    document.addEventListener("click", (e) => {
      if (!nav.classList.contains("open")) return;
      if (e.target === nav || !e.target.closest("#nav")) setMenu(false);
    });
    matchMedia("(min-width: 981px)").addEventListener("change", (e) => {
      if (e.matches) setMenu(false);
    });
  }

  /* ---------- Cursor spotlight (page + cards) ---------- */
  addEventListener(
    "pointermove",
    (e) => {
      root.style.setProperty("--mx", e.clientX + "px");
      root.style.setProperty("--my", e.clientY + "px");
      const card = e.target.closest && e.target.closest(".card.spot");
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--cx", e.clientX - r.left + "px");
        card.style.setProperty("--cy", e.clientY - r.top + "px");
      }
    },
    { passive: true }
  );

  /* ---------- Terminal tilt ---------- */
  const term = $("#terminal");
  if (term && !reduced && matchMedia("(hover: hover)").matches) {
    const host = term.parentElement;
    host.addEventListener("pointermove", (e) => {
      const r = term.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      term.style.transform = `perspective(900px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg)`;
    });
    term.addEventListener("pointerleave", () => (term.style.transform = ""));
  }

  /* ---------- Reveal + counters ---------- */
  function countUp(el) {
    const to = +el.dataset.to;
    if (reduced) return (el.textContent = to);
    const start = performance.now();
    const dur = 1400;
    (function tick(now) {
      const t = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(tick);
    })(start);
  }

  // stagger siblings inside grids
  $$(".bento, .stack-grid, .edu-grid").forEach((g) =>
    $$(".reveal", g).forEach((el, i) => el.style.setProperty("--d", i * 0.07 + "s"))
  );

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        $$(".count", en.target).forEach(countUp);
        io.unobserve(en.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  $$(".reveal").forEach((el) => io.observe(el));

  /* ---------- Command palette ---------- */
  const palette = $("#palette");
  const input = $("#palette-input");
  const list = $("#palette-list");
  const go = (id) => () => {
    $(id).scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };
  const open = (url) => () => window.open(url, "_blank", "noopener");
  const commands = [
    { name: "Go to Home", hint: "section", run: go("#home") },
    { name: "Go to Impact", hint: "section", run: go("#impact") },
    { name: "Go to Experience", hint: "section", run: go("#experience") },
    { name: "Go to Toolbox", hint: "section", run: go("#stack") },
    { name: "Go to Education", hint: "section", run: go("#education") },
    { name: "Go to Contact", hint: "section", run: go("#contact") },
    { name: "Copy email address", hint: EMAIL, run: copyEmail },
    { name: "Send an email", hint: "mailto", run: () => (location.href = "mailto:" + EMAIL) },
    { name: "Open GitHub", hint: "github.com/RizwAnsari", run: open("https://github.com/RizwAnsari") },
    { name: "Open LinkedIn", hint: "in/ansari-rizwan", run: open("https://linkedin.com/in/ansari-rizwan") },
    { name: "Toggle light / dark theme", hint: "theme", run: toggleTheme },
  ];
  let shown = commands;
  let sel = 0;

  function render() {
    list.replaceChildren(
      ...shown.map((c, i) => {
        const li = document.createElement("li");
        li.className = i === sel ? "sel" : "";
        const a = document.createElement("span");
        a.textContent = c.name;
        const b = document.createElement("small");
        b.textContent = c.hint;
        li.append(a, b);
        li.addEventListener("click", () => run(c));
        li.addEventListener("pointermove", () => {
          if (sel !== i) {
            sel = i;
            render();
          }
        });
        return li;
      })
    );
    const s = $(".sel", list);
    if (s) s.scrollIntoView({ block: "nearest" });
  }
  function run(c) {
    closePalette();
    c.run();
  }
  function openPalette() {
    palette.hidden = false;
    input.value = "";
    shown = commands;
    sel = 0;
    render();
    input.focus();
  }
  function closePalette() {
    palette.hidden = true;
  }
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    shown = commands.filter((c) => (c.name + " " + c.hint).toLowerCase().includes(q));
    sel = 0;
    render();
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      sel = Math.min(sel + 1, shown.length - 1);
      render();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      sel = Math.max(sel - 1, 0);
      render();
    } else if (e.key === "Enter" && shown[sel]) {
      run(shown[sel]);
    }
  });
  palette.addEventListener("click", (e) => {
    if (e.target === palette) closePalette();
  });
  
  addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      palette.hidden ? openPalette() : closePalette();
    } else if (e.key === "Escape" && !palette.hidden) {
      closePalette();
    }
  });
})();
