// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav-open');
  });
}

// Mobile menu dropdown on Menu page
const mobileMenuBtn = document.getElementById('mobileMenuButton');

if (mobileMenuBtn) {
  const wrapper = mobileMenuBtn.parentElement; // .menu-select

  mobileMenuBtn.addEventListener('click', () => {
    wrapper.classList.toggle('open');
  });
}


const categoryImages = {
  beef: [
    { src: "src/beef/brisket.png", caption: "Beef Brisket" },
    { src: "src/beef/belly.png", caption: "Beef Belly" },
    { src: "src/beef/bulgogi.png", caption: "Bulgogi" },
    { src: "src/beef/rib.png", caption: "Short Rib" }
  ],

  pork: [
    { src: "src/pork/belly.png", caption: "Pork Belly" },
    { src: "src/pork/jowl.png", caption: "Pork Jowl" },
    { src: "src/pork/porkbul.png", caption: "Marinated Pork" },
    { src: "src/pork/smoked.png", caption: "Smoked Pork" }
  ],

  chicken: [
    { src: "src/chicken/teriyaki.png", caption: "Teriyaki Chicken" },
    { src: "src/chicken/wings.png", caption: "Chicken Wings" }
  ],

  sides: [
    { src: "src/sides/egg.png", caption: "Steamed Egg" },
    { src: "src/sides/tofu.png", caption: "Spicy Tofu Soup" },
    { src: "src/sides/bean.png", caption: "Bean Paste Soup" },
    { src: "src/sides/salad.png", caption: "Sangchu Geotjeori" }
  ],

  drinks: [
    { src: "src/drinks/soda.png", caption: "Soft Drinks" },
    { src: "src/drinks/beer.png", caption: "Beer" },
    { src: "src/drinks/soju.png", caption: "Soju" }
  ]
};

// Attach slider functionality to each category
document.querySelectorAll(".menu-category").forEach(category => {
  const imgElement = category.querySelector(".menu-image");
  const captionElement = category.querySelector(".menu-image-caption");
  const leftBtn = category.querySelector(".slider-arrow--left");
  const rightBtn = category.querySelector(".slider-arrow--right");

  const catName = imgElement.dataset.category;
  let index = 0;

  function updateImage() {
    const item = categoryImages[catName][index];
    imgElement.src = item.src;
    captionElement.textContent = item.caption;
  }

  leftBtn.addEventListener("click", () => {
    index = (index - 1 + categoryImages[catName].length) % categoryImages[catName].length;
    updateImage();
  });

  rightBtn.addEventListener("click", () => {
    index = (index + 1) % categoryImages[catName].length;
    updateImage();
  });
});