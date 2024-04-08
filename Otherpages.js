let menu_icon = document.getElementsByClassName("menu-icon")[0];

menu_icon.addEventListener("click", (e) => {
  menu_icon.classList.toggle("cross");
  document
    .getElementsByClassName("Menu-links")[0]
    .classList.toggle("menu-open");
  document
    .querySelectorAll(".Menu-links-link")
    .forEach((e) => e.classList.toggle("menu-open"));
});

window.addEventListener("scroll", () => {
  const menuBar = document.querySelector(".Menu-bar");
  if (window.scrollY > 100) {
    menuBar.style.boxShadow = "var(--box-shadow)";
  } else {
    menuBar.style.boxShadow = "none";
  }
});
// Pre-Loader function
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    document.querySelector(".slideup").classList.add("hidden");

    const fadeElements = document.querySelectorAll(".fade-in");
    fadeElements.forEach((element, index) => {
      element.style.transform = "translateY(0)";
      const transitionDelay = (index + 1) * 0.1;

      element.style.transitionDelay = `${transitionDelay}s`;
    });
  }, 500);
});

Array.from(document.getElementsByClassName('delayed-link')).forEach((e) => {
  e.addEventListener('click', function (event) {
    event.preventDefault();
    
    document.querySelector(".delayed-link-slide").classList.add('show');

    setTimeout(function () {
      window.location.href = event.target.href;
    }, 1000);
  });
});
