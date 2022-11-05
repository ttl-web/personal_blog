const burger = document.getElementById("sidebarToggle");
const sidebar = document.getElementById("sidebar");

burger.addEventListener("click", (event) => {
  document.body.classList.toggle("show-sidebar");
});
