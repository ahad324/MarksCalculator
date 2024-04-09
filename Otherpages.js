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
    setTimeout(() => {
      document.querySelector(".slideup-container").style.display = "none";
    }, 1000)
    document.querySelector(".slideup-tittle").style.transform = "translateY(-500px)";
    const slideupbars = document.querySelectorAll(".slideup-bar");
    
    slideupbars.forEach((e, i) => {
      const transitionDelay = (i + 1) * 0.1;
      e.classList.add("hidden");
      e.style.transitionDelay = `${transitionDelay}s`;
    })


    const fadeElements = document.querySelectorAll(".fade-in");
    fadeElements.forEach((element, index) => {
      element.style.transform = "translateY(0)";
      const transitionDelay = (index + 1) * 0.1;

      element.style.transitionDelay = `${transitionDelay}s`;
    });
  }, 500);
});

Array.from(document.getElementsByClassName('delayed-link')).forEach((link) => {
  link.addEventListener('click', function (event) {
    event.preventDefault();

    document.querySelector(".delayed-link-slide-down-container").style.transform = 'translateY(0)';
    const slidedownbars = document.querySelectorAll(".delayed-link-slidedown-bar");

    slidedownbars.forEach((e, i) => {
      const transitionDelay = (i + 1) * 0.1;
      e.classList.add("showing");
      e.style.transitionDelay = `${transitionDelay}s`;
    })

    setTimeout(()=> {
      window.location.href = event.target.href;
    }, 1000);

  });
});
