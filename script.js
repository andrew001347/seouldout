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


/* Reviews data (edit/replace with real reviews later) */
const reviews = [
  {
    quote: "Hands down the best samgyeopsal in LA. The beef melts and the staff bring the energy.",
    name: "Mina K.",
    rating: 5
  },
  {
    quote: "Authentic flavors, lively atmosphere — perfect for groups. The banchan is on point.",
    name: "Daniel R.",
    rating: 4
  },
  {
    quote: "Service was fast and friendly. Loved the soju cocktails and the marinade on the ribs.",
    name: "Lena P.",
    rating: 5
  },
  {
    quote: "Great late-night spot. Grills were hot and the portions are generous.",
    name: "Mark S.",
    rating: 4
  },
  {
    quote: "Fun vibe and the staff helped us pick the right meat combo. Will come back!",
    name: "Aisha T.",
    rating: 5
  }
];

/* render setup */
const listEl = document.getElementById('reviewsList');
let indexStart = 0; // which card shows first
const visibleCount = 3; // how many cards to show at once on wide screens

function renderReviews() {
  listEl.innerHTML = '';
  // create cards in the order of the array (we will slide using transform)
  reviews.forEach((r, i) => {
    const card = document.createElement('article');
    card.className = 'review-card';
    card.innerHTML = `
      <blockquote class="review-quote">“${r.quote}”</blockquote>
      <div class="review-meta">
        <span class="reviewer-name">${r.name}</span>
        <span class="flames" aria-hidden="true">${renderFlames(r.rating)}</span>
      </div>
    `;
    listEl.appendChild(card);
  });

  // position the list so indexStart is visible at the left
  updateListPosition();
}

function renderFlames(rating) {
  let html = '';
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      html += '<i class="fas fa-fire" aria-hidden="true"></i>';
    } else {
      html += '<i class="fas fa-fire flame--dim" aria-hidden="true"></i>';
    }
  }
  return html;
}

function updateListPosition() {
  // size of one card (including gap) - compute from DOM
  const card = listEl.querySelector('.review-card');
  if (!card) return;
  const style = getComputedStyle(card);
  const gap = parseInt(getComputedStyle(listEl).gap || 18, 10);
  const cardWidth = card.offsetWidth + gap;
  // clamp indexStart
  indexStart = Math.max(0, Math.min(indexStart, Math.max(0, reviews.length - visibleCount)));
  const offset = -indexStart * cardWidth;
  listEl.style.transform = `translateX(${offset}px)`;
}

/* nav handlers */
document.querySelectorAll('.reviews-prev').forEach(btn => {
  btn.addEventListener('click', () => {
    indexStart = Math.max(0, indexStart - 1);
    updateListPosition();
  });
});
document.querySelectorAll('.reviews-next').forEach(btn => {
  btn.addEventListener('click', () => {
    indexStart = Math.min(reviews.length - visibleCount, indexStart + 1);
    updateListPosition();
  });
});

/* optional auto-rotate */
let autoRotate = true;
if (autoRotate) {
  setInterval(() => {
    indexStart = (indexStart + 1) % Math.max(1, reviews.length - visibleCount + 1);
    updateListPosition();
  }, 6000);
}

/* initialize after DOM ready */
document.addEventListener('DOMContentLoaded', () => {
  renderReviews();
  // update on window resize to recalc widths
  window.addEventListener('resize', updateListPosition);
});
