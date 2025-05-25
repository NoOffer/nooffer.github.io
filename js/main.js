// Get all pages
const pages = document.querySelectorAll('.page');

let currPageIdx = 0;

// Prevent multiple scrolls
let isScrolling = false;

function onScroll(index) {
  if (index < 0 || index >= pages.length || isScrolling) return;

  isScrolling = true;

  pages.forEach((page, i) => {
    // Move each page up or down depending on its position
    page.style.transform = `translateY(${(i - index) * 100}vh)`;
  });

  // Allow next scroll
  setTimeout(() => {
    currPageIdx = index;
    isScrolling = false;
  }, 700);
}

// Listen for mouse scrolls
document.addEventListener('wheel', (event) => {
  if (event.deltaY > 0) {
    onScroll(currPageIdx + 1);
  } else {
    onScroll(currPageIdx - 1);
  }
});