import profile from "./profile.js";

function createChevron() {
  return `
    <svg class="w-4 h-4 inline-block transform transition-transform group-data-[expanded=true]:rotate-90" 
         viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" 
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
            clip-rule="evenodd" />
    </svg>
  `;
}

function renderValue(value, level = 0, isLast = true, isArrayInObject = false) {
  if (typeof value === "string") {
    return `<span class="text-emerald-300">"${value}"${
      isLast ? "" : "<span class='json-comma'> ,</span>"
    }</span>`;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return `<span class="text-blue-300">${value}${
      isLast ? "" : "<span class='json-comma'> ,</span>"
    }</span>`;
  }
  if (value === null) {
    return `<span class="text-gray-400">null${
      isLast ? "" : "<span class='json-comma'> ,</span>"
    }</span>`;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return `<span class="text-gray-300">[</span><span class="text-gray-300">]${
        isLast ? "" : "<span class='json-comma'> ,</span>"
      }</span>`;
    }

    const items = value
      .map((item, index) => {
        return `<div class="json-array-item">${renderValue(
          item,
          level + 2,
          index === value.length - 1
        )}</div>`;
      })
      .join("");

    return `
      <div>
        <div class="json-square-bracket json-square-bracket-open"><span class="text-gray-300">[</span></div>
        <div class="json-array-items">
          ${items}
        </div>
        <div class="json-square-bracket json-square-bracket-close"><span class="text-gray-300">]${
          isLast ? "" : "<span class='json-comma'> ,</span>"
        }</span></div>
      </div>
    `;
  }
  if (typeof value === "object") {
    const rendered = renderObject(value, level);

    let index = rendered.lastIndexOf("</span>");
    let before = rendered.slice(0, index);
    let after = rendered.slice(index);

    return `${before} ${
      isLast ? "" : "<span class='json-comma'> ,</span>"
    } ${after}`;
    // return `${rendered}${isLast ? "" : ","}`;
  }
}

function renderObject(obj, level = 0) {
  if (!obj || Object.keys(obj).length === 0) {
    return '<span class="text-gray-300">{}</span>';
  }

  const entries = Object.entries(obj)
    .map(([key, value], index) => {
      const isExpandable = typeof value === "object" && value !== null;
      const isLast = index === Object.keys(obj).length - 1;

      return `
      <div class="json-section">
        <div class="json-key group ${isExpandable ? "cursor-pointer" : ""}"
             ${isExpandable ? 'data-expandable="true"' : ""}>
          ${isExpandable ? createChevron() : ""}
          <span class="text-blue-300 group-hover:text-blue-400 transition-colors">"${key}"</span>: 
          ${!isExpandable ? renderValue(value, level + 1, isLast) : ""}
        </div>
        ${
          isExpandable
            ? `
            <div class="json-content" data-expanded="true">
              ${renderValue(value, level + 1, isLast, true)}
            </div>
            `
            : ""
        }
      </div>
    `;
    })
    .join("");

  return `
    <div class="json-object">
      <div class="json-curly-brace json-curly-brace-open"><span class="text-gray-300">{</span></div>
      ${entries}
      <div class="json-curly-brace json-curly-brace-close"><span class="text-gray-300">}</span></div>
    </div>
  `;
}

function collapseAllJsonSections() {
  const expandableSections = document.querySelectorAll(
    '.json-key[data-expandable="true"]'
  );
  expandableSections.forEach((key) => {
    const content = key.nextElementSibling;
    const chevron = key.querySelector("svg");

    if (content && content.classList.contains("expanded")) {
      content.classList.remove("expanded");
      chevron.style.transform = "";
    }
  });
}

function expandAllJsonSections() {
  const expandableSections = document.querySelectorAll(
    '.json-key[data-expandable="true"]'
  );
  expandableSections.forEach((key) => {
    const content = key.nextElementSibling;
    const chevron = key.querySelector("svg");

    if (content && !content.classList.contains("expanded")) {
      content.classList.add("expanded");
      chevron.style.transform = "rotate(90deg)";
    }
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  const jsonRoot = document.getElementById("json-root");
  jsonRoot.innerHTML = renderObject(profile);

  // Add click handlers for JSON expansion
  document
    .querySelectorAll('.json-key[data-expandable="true"]')
    .forEach((key) => {
      key.addEventListener("click", (e) => {
        const content = key.nextElementSibling;
        const chevron = key.querySelector("svg");
        const level = parseInt(content.style.getPropertyValue("--level")) || 0;

        content.classList.toggle("expanded");
        chevron.style.transform = content.classList.contains("expanded")
          ? "rotate(90deg)"
          : "";

        // Animate nested items with staggered delay
        const nestedItems = content.querySelectorAll(".json-section");
        nestedItems.forEach((item, index) => {
          item.style.transitionDelay = `${index * 50}ms`;
        });

        e.stopPropagation();
      });
    });

  // Red button to collapse all
  const redDot = document.querySelector(".terminal-dot.bg-red-500");
  redDot.addEventListener("click", collapseAllJsonSections);

  // Orange button to expand all
  const orangeDot = document.querySelector(".terminal-dot.bg-yellow-500");
  orangeDot.addEventListener("click", expandAllJsonSections);

  // Add fullscreen toggle functionality
  document.getElementById("fullscreen-toggle").addEventListener("click", () => {
    const container = document.querySelector(".json-container");
    const floatingContainer = container.closest(".floating");

    container.classList.toggle("fullscreen");
    if (floatingContainer) {
      floatingContainer.classList.toggle("fullscreen");
    }

    // Prevent body scroll when fullscreen
    document.body.style.overflow = container.classList.contains("fullscreen")
      ? "hidden"
      : "";

    // Allow closing with Escape key
    if (container.classList.contains("fullscreen")) {
      const escHandler = (e) => {
        if (e.key === "Escape") {
          container.classList.remove("fullscreen");
          if (floatingContainer) {
            floatingContainer.classList.remove("fullscreen");
          }
          document.body.style.overflow = "";
          document.removeEventListener("keydown", escHandler);
        }
      };
      document.addEventListener("keydown", escHandler);
    }
  });
});
