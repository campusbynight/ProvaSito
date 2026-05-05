(function () {
  var NAVBAR_COMPONENT_PATH = "./components/navbar.html";

  function isIOSSafari() {
    var ua = navigator.userAgent || "";
    var isIOSDevice =
      /iPad|iPhone|iPod/.test(ua) ||
      (ua.indexOf("Macintosh") !== -1 && "ontouchend" in document);
    var isSafari =
      ua.indexOf("Safari") !== -1 &&
      ua.indexOf("CriOS") === -1 &&
      ua.indexOf("FxiOS") === -1 &&
      ua.indexOf("EdgiOS") === -1 &&
      ua.indexOf("OPiOS") === -1;
    return isIOSDevice && isSafari;
  }

  function getSportIconElements() {
    var container = document.querySelector(".nav-icona-sport-container");
    if (!container) return null;

    return {
      inlineSvg: container.querySelector("svg"),
      objectEl: container.querySelector("object[data-sport-icon-object='true']"),
    };
  }

  function updateSportObjectForScrollState(navbar) {
    var els = getSportIconElements();
    if (!els || !els.objectEl) return;

    if (els.objectEl.style.display === "none") return;

    var isScrolled = !!(navbar && navbar.classList.contains("scrolled-nav"));
    var desiredSrc = isScrolled
      ? "assets/icons/sport-white.svg"
      : "assets/icons/sport-blue.svg";

    if (els.objectEl.getAttribute("data") !== desiredSrc) {
      els.objectEl.setAttribute("data", desiredSrc);
    }
  }

  function setupIOSSportIconFallback(navbar) {
    if (!isIOSSafari()) return;

    var els = getSportIconElements();
    if (!els || !els.inlineSvg || !els.objectEl) return;

    els.inlineSvg.style.display = "none";
    els.objectEl.style.display = "block";
    updateSportObjectForScrollState(navbar);
  }

  function setupScrollBehavior() {
    var navbar = document.querySelector(".navbar-wrapper");
    if (!navbar) return;

    var onScroll = function () {
      if (window.scrollY > 150) {
        navbar.classList.add("scrolled-nav");
      } else {
        navbar.classList.remove("scrolled-nav");
      }

      updateSportObjectForScrollState(navbar);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function getMountTarget() {
    return (
      document.querySelector(".navbar-wrapper") ||
      document.querySelector(".framer-1a537ep-container[data-framer-name='navbar']") ||
      document.querySelector(".framer-1a537ep-container")
    );
  }

  function loadNavbar() {
    fetch(NAVBAR_COMPONENT_PATH)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Impossibile caricare il componente navbar");
        }
        return response.text();
      })
      .then(function (html) {
        var target = getMountTarget();

        if (target) {
          target.outerHTML = html;
        } else {
          var main = document.querySelector("#main");
          if (main) {
            main.insertAdjacentHTML("afterbegin", html);
          } else {
            document.body.insertAdjacentHTML("afterbegin", html);
          }
        }

        setupScrollBehavior();
        setupIOSSportIconFallback(document.querySelector(".navbar-wrapper"));
      })
      .catch(function (error) {
        console.error("Errore navbar-loader:", error);
      });
  }

  document.addEventListener("DOMContentLoaded", loadNavbar);
})();
