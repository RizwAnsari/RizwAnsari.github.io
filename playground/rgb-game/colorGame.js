(function () {
  "use strict";

  var board = document.getElementById("board");
  var target = document.getElementById("target");
  var statusEl = document.getElementById("status");
  var resetBtn = document.getElementById("reset");
  var modeBtns = document.querySelectorAll(".segmented button");
  var streakEl = document.getElementById("streak");
  var bestEl = document.getElementById("best");
  var missesEl = document.getElementById("misses");

  var count = 6;
  var colors = [];
  var answer = null;
  var solved = false;
  var streak = 0;
  var misses = 0;
  var best = 0;
  try {
    best = parseInt(localStorage.getItem("rgb-best"), 10) || 0;
  } catch (e) {}

  function rand() {
    return Math.floor(Math.random() * 256);
  }
  function makeColor() {
    return { r: rand(), g: rand(), b: rand() };
  }
  function css(c) {
    return "rgb(" + c.r + ", " + c.g + ", " + c.b + ")";
  }
  // pick black or white text, whichever contrasts more with the colour
  function inkFor(c) {
    function lin(v) {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    }
    var L = 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
    return (L + 0.05) / 0.05 > 1.05 / (L + 0.05) ? "#000000" : "#ffffff";
  }
  function flood(c) {
    var st = document.body.style;
    var ink = inkFor(c);
    st.setProperty("--bg", css(c));
    st.setProperty("--text", ink);
    st.setProperty("--muted", ink);
    st.setProperty("--accent", ink);
    st.setProperty("--on-accent", css(c));
    st.setProperty("--ok", ink);
    // surfaces drift slightly away from the ink colour so text on them stays readable
    var away = ink === "#ffffff" ? "#000000" : "#ffffff";
    st.setProperty("--card", "color-mix(in srgb, " + css(c) + " 84%, " + away + ")");
    st.setProperty("--card-hi", "color-mix(in srgb, " + css(c) + " 74%, " + away + ")");
    st.setProperty("--line", "color-mix(in srgb, " + css(c) + " 60%, " + ink + ")");
    document.body.classList.add("flooded");
  }
  function unflood() {
    var st = document.body.style;
    document.body.classList.remove("flooded");
    ["--bg", "--text", "--muted", "--accent", "--on-accent", "--ok", "--card", "--card-hi", "--line"].forEach(function (p) {
      st.removeProperty(p);
    });
  }
  function setStatus(text, kind) {
    statusEl.textContent = text;
    statusEl.className = "status" + (kind ? " " + kind : "");
  }
  function renderScore() {
    streakEl.textContent = streak;
    bestEl.textContent = best;
    missesEl.textContent = misses;
  }

  function newRound() {
    solved = false;
    unflood();
    board.classList.remove("solved");
    colors = [];
    for (var i = 0; i < count; i++) colors.push(makeColor());
    answer = colors[Math.floor(Math.random() * colors.length)];

    target.querySelector(".r").textContent = answer.r;
    target.querySelector(".g").textContent = answer.g;
    target.querySelector(".b").textContent = answer.b;
    target.setAttribute("aria-label", "Find " + css(answer));

    board.replaceChildren.apply(
      board,
      colors.map(function (c, i) {
        var tile = document.createElement("button");
        tile.type = "button";
        tile.className = "tile";
        tile.style.backgroundColor = css(c);
        tile.style.animationDelay = i * 40 + "ms";
        tile.setAttribute("aria-label", "Colour option " + (i + 1));
        tile.addEventListener("click", function () {
          pick(tile, c);
        });
        return tile;
      })
    );
    resetBtn.textContent = "New colours";
    setStatus("Pick the square that matches the value.");
  }

  function pick(tile, c) {
    if (solved || tile.classList.contains("miss")) return;
    if (c === answer) {
      solved = true;
      streak += 1;
      if (streak > best) {
        best = streak;
        try {
          localStorage.setItem("rgb-best", best);
        } catch (e) {}
      }
      Array.prototype.forEach.call(board.children, function (t) {
        t.style.backgroundColor = css(answer);
        t.classList.remove("miss");
      });
      tile.classList.add("won");
      flood(answer);
      board.classList.add("solved");
      resetBtn.textContent = "Play again";
      setStatus("Correct! Streak: " + streak, "ok");
    } else {
      tile.classList.add("miss");
      tile.setAttribute("aria-disabled", "true");
      streak = 0;
      misses += 1;
      setStatus("Not that one. Try again.", "bad");
    }
    renderScore();
  }

  modeBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      modeBtns.forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === btn));
      });
      count = parseInt(btn.dataset.count, 10);
      streak = 0;
      renderScore();
      newRound();
    });
  });
  resetBtn.addEventListener("click", newRound);

  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === "n" || e.key === "N") {
      newRound();
    } else if (/^[1-6]$/.test(e.key)) {
      var tile = board.children[parseInt(e.key, 10) - 1];
      if (tile) tile.click();
    }
  });

  renderScore();
  newRound();
})();
