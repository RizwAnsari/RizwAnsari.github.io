$(function () {
  "use strict";

  var KEY = "portfolio-todos";
  var todos = load();
  var filter = "all";

  var CHECK =
    '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  var TRASH =
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v5M14 11v5"/></svg>';

  function load() {
    try {
      var saved = JSON.parse(localStorage.getItem(KEY));
      if (Array.isArray(saved)) return saved;
    } catch (e) {}
    return [
      { id: 1, text: "Complete the web development bootcamp", done: true },
      { id: 2, text: "Learn something new", done: false },
      { id: 3, text: "Buy groceries", done: false },
      { id: 4, text: "Press clothes", done: false },
    ];
  }
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(todos));
    } catch (e) {}
  }

  function visible() {
    return todos.filter(function (t) {
      return filter === "all" || (filter === "done" ? t.done : !t.done);
    });
  }

  function render(animateId) {
    var $list = $("#list").empty();
    visible().forEach(function (t) {
      var $li = $("<li>")
        .addClass("item" + (t.done ? " done" : ""))
        .attr("data-id", t.id);
      if (t.id !== animateId) $li.css("animation", "none");
      $("<button>")
        .attr({ type: "button", class: "check", "aria-label": (t.done ? "Mark not done: " : "Mark done: ") + t.text, "aria-pressed": t.done })
        .html(CHECK)
        .appendTo($li);
      $("<span>").addClass("text").text(t.text).appendTo($li); // .text() escapes HTML
      $("<button>")
        .attr({ type: "button", class: "del", "aria-label": "Delete: " + t.text })
        .html(TRASH)
        .appendTo($li);
      $list.append($li);
    });

    var left = todos.filter(function (t) {
      return !t.done;
    }).length;
    $("#summary").text(
      todos.length === 0 ? "No tasks yet" : left + (left === 1 ? " task" : " tasks") + " left"
    );
    $("#empty").prop("hidden", visible().length > 0);
    $("#clear").prop("hidden", !todos.some(function (t) { return t.done; }));
  }

  $("#add").on("submit", function (e) {
    e.preventDefault();
    var $input = $("#new-todo");
    var text = $.trim($input.val());
    if (!text) return;
    var t = { id: Date.now(), text: text, done: false };
    todos.push(t);
    $input.val("");
    save();
    if (filter === "done") setFilter("all");
    render(t.id);
  });

  $("#list").on("click", ".check", function () {
    var id = $(this).closest(".item").data("id");
    todos.forEach(function (t) {
      if (t.id === id) t.done = !t.done;
    });
    save();
    render();
  });

  $("#list").on("click", ".del", function () {
    var $item = $(this).closest(".item");
    var id = $item.data("id");
    $item.fadeOut(180, function () {
      todos = todos.filter(function (t) {
        return t.id !== id;
      });
      save();
      render();
    });
  });

  $("#clear").on("click", function () {
    todos = todos.filter(function (t) {
      return !t.done;
    });
    save();
    render();
  });

  function setFilter(f) {
    filter = f;
    $("#filters button").each(function () {
      $(this).attr("aria-pressed", $(this).data("filter") === f);
    });
  }
  $("#filters").on("click", "button", function () {
    setFilter($(this).data("filter"));
    render();
  });

  render();
});
