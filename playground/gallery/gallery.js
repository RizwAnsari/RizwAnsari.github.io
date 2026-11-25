(function () {
  "use strict";

  var photos = [
    "https://i.imgur.com/qK42fUu.jpg",
    "https://images.unsplash.com/photo-1435771112039-1e5b2bcad966",
    "https://images.unsplash.com/photo-1442406964439-e46ab8eff7c4",
    "https://images.unsplash.com/photo-1439524970634-649c37a69e5c",
    "https://images.unsplash.com/photo-1444090542259-0af8fa96557e",
    "https://images.unsplash.com/photo-1434543177303-ef2cc7707e0d",
    "https://images.unsplash.com/photo-1436262513933-a0b06755c784",
    "https://images.unsplash.com/photo-1439396087961-98bc12c21176",
    "https://images.unsplash.com/photo-1439694458393-78ecf14da7f9",
  ];

  function size(url, w) {
    return url.indexOf("unsplash") > -1 ? url + "?auto=format&fit=crop&q=75&w=" + w : url;
  }

  var grid = document.getElementById("grid");
  var box = document.getElementById("lightbox");
  var big = document.getElementById("lb-img");
  var count = document.getElementById("lb-count");
  var current = 0;

  photos.forEach(function (url, i) {
    var col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-4";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "shot";
    btn.dataset.n = i + 1 + " / " + photos.length;
    btn.setAttribute("aria-label", "Open photo " + (i + 1) + " of " + photos.length);
    var img = new Image();
    img.alt = "Gallery photo " + (i + 1);
    img.loading = "lazy";
    img.decoding = "async";
    img.referrerPolicy = "no-referrer"; // some hosts block hotlinking by referrer
    img.src = size(url, 800);
    img.addEventListener("load", function () {
      img.classList.add("loaded");
    });
    img.addEventListener("error", function () {
      // keep the tile so the grid doesn't silently lose a photo
      btn.classList.add("broken");
      btn.disabled = true;
      btn.setAttribute("aria-label", "Photo " + (i + 1) + " could not be loaded");
    });
    btn.appendChild(img);
    btn.addEventListener("click", function () {
      show(i);
      if (!box.open) box.showModal();
    });
    col.appendChild(btn);
    grid.appendChild(col);
  });

  var seq = 0; // guards against a slow earlier photo overwriting a newer one
  big.referrerPolicy = "no-referrer";

  function load(url, done) {
    var im = new Image();
    im.referrerPolicy = "no-referrer";
    im.onload = function () {
      done(im.src);
    };
    im.onerror = function () {
      done(null);
    };
    im.src = url;
  }

  function show(i) {
    current = (i + photos.length) % photos.length;
    var mine = ++seq;
    var url = photos[current];
    big.alt = "Gallery photo " + (current + 1);
    count.textContent = current + 1 + " of " + photos.length;

    // 1) show the already-cached thumbnail straight away so the photo always changes
    big.src = size(url, 800);
    big.classList.add("loading");
    // 2) swap in the large version once it has downloaded, unless the user moved on
    load(size(url, 1600), function (src) {
      if (mine !== seq) return;
      if (src) big.src = src;
      big.classList.remove("loading");
      // warm the cache for the neighbours
      [current - 1, current + 1].forEach(function (n) {
        load(size(photos[(n + photos.length) % photos.length], 1600), function () {});
      });
    });
  }

  box.querySelector(".prev").addEventListener("click", function () {
    show(current - 1);
  });
  box.querySelector(".next").addEventListener("click", function () {
    show(current + 1);
  });
  box.querySelector(".lb-close").addEventListener("click", function () {
    box.close();
  });
  box.addEventListener("click", function (e) {
    if (e.target === box) box.close(); // click on the backdrop
  });
  box.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
})();
