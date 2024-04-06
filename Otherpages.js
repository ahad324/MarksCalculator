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
  console.log(window.scrollY);
  const menuBar = document.querySelector(".Menu-bar");
  if (window.scrollY > 100) {
    menuBar.style.boxShadow = "var(--box-shadow)";
  } else {
    menuBar.style.boxShadow = "none";
  }
});
