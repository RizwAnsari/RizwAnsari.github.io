import handlers from "./handlers.js";
import profileData from "./profile-data.js";

let logoFirst = document.querySelector(".logo__first");
logoFirst.addEventListener("mouseover", handlers.mouseOverHandler);
logoFirst.addEventListener("mouseout", handlers.mouseOutHandler);

let logoLast = document.querySelector(".logo__last");
logoLast.addEventListener("mouseover", handlers.mouseOverHandler);
logoLast.addEventListener("mouseout", handlers.mouseOutHandler);

let levels = [0, 1, 2, 3, "all"];

renderjson.set_icons("+", "-");
// renderjson.set_show_to_level(levels[Math.floor(Math.random() * levels.length)]);
renderjson.set_show_to_level(0);
renderjson.set_max_string_length(100);

document.getElementById("profile__body").appendChild(renderjson(profileData));

document
  .querySelector("body")
  .addEventListener("click", handlers.bodyClickHandler);
