/* Shared: theme (same saved choice as the portfolio) and the top bar. */
(function () {
  var root = document.documentElement;
  var saved = null;
  try {
    saved = localStorage.getItem("theme");
  } catch (e) {}
  root.dataset.theme = saved === "light" ? "light" : "dark";

  document.addEventListener("DOMContentLoaded", function () {
    var body = document.body;
    if (body.dataset.appbar === "none") return;

    var bar = document.createElement("header");
    bar.className = "appbar";
    var title = body.dataset.appTitle || document.title;
    bar.innerHTML =
      '<a class="back" href="../../#playground">&larr; Portfolio</a>' +
      '<span class="app-title"></span>' +
      '<button class="icon-btn theme-btn" type="button" aria-label="Toggle light and dark theme">' +
      '<svg class="i-moon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>' +
      '<svg class="i-sun" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>' +
      "</button>";
    bar.querySelector(".app-title").textContent = title;
    bar.querySelector(".theme-btn").addEventListener("click", function () {
      var next = root.dataset.theme === "light" ? "dark" : "light";
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
    });
    body.prepend(bar);
  });
})();
