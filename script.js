const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav-open');
  });
}

const tabButtons = document.querySelectorAll("[data-tab]");
const tabs = document.querySelectorAll(".menu-tab");

tabButtons.forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    const target = btn.dataset.tab;

    tabs.forEach(tab => {
      tab.style.display = tab.id === target ? "block" : "none";
    });
  });
});
