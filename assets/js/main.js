import handlers from "./handlers.js";
import profileData from "./profile-data.js";

let logoFirst = document.querySelector(".logo__first");
logoFirst.addEventListener("mouseover", handlers.mouseOverHandler);
logoFirst.addEventListener("mouseout", handlers.mouseOutHandler);

let logoLast = document.querySelector(".logo__last");
logoLast.addEventListener("mouseover", handlers.mouseOverHandler);
logoLast.addEventListener("mouseout", handlers.mouseOutHandler);

const level = new URLSearchParams(window.location.search).get("level");

renderjson.set_icons("+", "-");
renderjson.set_show_to_level(level);
renderjson.set_max_string_length(100);

document.getElementById("profile__body").appendChild(renderjson(profileData));

document
  .querySelector("body")
  .addEventListener("click", handlers.bodyClickHandler);

handlers.levelExistsHandler(level);
