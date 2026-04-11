(function () {
  var NAVBAR_COMPONENT_PATH = "./components/navbar.html";

  function setupScrollBehavior() {
    var navbar = document.querySelector(".navbar-wrapper");
    if (!navbar) return;

    var onScroll = function () {
      if (window.scrollY > 150) {
        navbar.classList.add("scrolled-nav");
      } else {
        navbar.classList.remove("scrolled-nav");
      }
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
      })
      .catch(function (error) {
        console.error("Errore navbar-loader:", error);
      });
  }

  document.addEventListener("DOMContentLoaded", loadNavbar);
})();
