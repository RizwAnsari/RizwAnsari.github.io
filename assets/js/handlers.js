export default {
  mouseOverHandler: (evt) => {
    let target = evt.target;
    let contains = target.classList.contains("logo__first");

    target.style[contains ? "paddingRight" : "paddingLeft"] = "0px";

    let middle = document.querySelector(".logo__middle");
    middle.style.padding = "0.5rem 0px";
    middle.style.backgroundColor = "#8458B3";

    let partToChange = document.querySelector(
      contains ? ".logo__last" : ".logo__first"
    );
    partToChange.style.padding = "0";
    partToChange.style.backgroundColor = "#000";
  },

  mouseOutHandler: (evt) => {
    let target = evt.target;
    let contains = target.classList.contains("logo__first");

    target.style[contains ? "paddingRight" : "paddingLeft"] = "5px";

    let middle = document.querySelector(".logo__middle");
    middle.style.padding = "0px";
    middle.style.backgroundColor = "#000";

    let partToChange = document.querySelector(
      contains ? ".logo__last" : ".logo__first"
    );
    partToChange.style.padding = "0.5rem";
    partToChange.style.backgroundColor = "#8458B3";
  },

  bodyClickHandler: () => {
    let firstObjectSpan = document.querySelector(
      ".renderjson > span > .object:first-child"
    );

    let profile = document.querySelector(".profile");
    let profileKnowMe = document.querySelector(".profile__know-me");
    let profileDisclosure = document.querySelector(".profile__disclosure");

    if (firstObjectSpan.style.display !== "none") {
      profile.style.display = "flex";

      profileDisclosure.style.width = null;
      profileDisclosure.style.margin = null;

      return (profileKnowMe.style.display = "block");
    }
    profileDisclosure.style.width = "255px";
    profileDisclosure.style.margin = "auto";

    profile.style.display = "block";
    profileKnowMe.style.display = "none";
  },

  levelExistsHandler: (level) => {
    if (["1", "2", "3", "all"].includes(level)) {
      document.querySelector(".profile").style.display = "block";
      document.querySelector(".profile__know-me").style.display = "none";

      let profileDisclosure = document.querySelector(".profile__disclosure");
      profileDisclosure.style.width = "255px";
      profileDisclosure.style.margin = "auto";
    }
  },
};
