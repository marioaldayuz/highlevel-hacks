(function () {
  if (!location.pathname.includes("/courses/library-v2") && !location.pathname.includes("/home")) return;

  const hide = document.createElement("style");
  hide.textContent = "html,body{visibility:hidden !important}";
  document.head.appendChild(hide);

  const replaceOnce = () => {
    if (!document.body) return requestAnimationFrame(replaceOnce);

    while (document.body.firstChild) document.body.removeChild(document.body.firstChild);

    const container = document.createElement("div");
    container.id = "override-root";

    const shadow = container.attachShadow({ mode: "open" });
    shadow.innerHTML = 
    `
    <body>YOUR HTML GOES HERE!</body>
    `;

    document.body.appendChild(container);
    hide.remove();
    window.dispatchEvent(new Event('contentReady'));

    const lock = new MutationObserver(() => {
      if (!document.getElementById("override-root")) {
        document.body.innerHTML = "";
        document.body.appendChild(container);
      }
    });
    lock.observe(document.body, { childList: true, subtree: false });

    const hook = (type) => {
      const orig = history[type];
      history[type] = function () {
        const r = orig.apply(this, arguments);
        if (location.pathname.includes("/courses/library-v2") || location.pathname.includes("/home")) {
          if (!document.getElementById("override-root")) {
            document.body.innerHTML = "";
            document.body.appendChild(container);
          }
        }
        return r;
      };
    };
    ["pushState", "replaceState"].forEach(hook);
    addEventListener("popstate", () => {
      if (location.pathname.includes("/courses/library-v2") || location.pathname.includes("/home")) {
        if (!document.getElementById("override-root")) {
          document.body.innerHTML = "";
          document.body.appendChild(container);
        }
      }
    });
  };

  replaceOnce();
})();

