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
};
