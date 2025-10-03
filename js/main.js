const pages = document.querySelectorAll('.page');
const navItems = document.querySelectorAll('.nav_item');
console.log(`Total page: ${pages.length}`);

// On load
pages.forEach((page, i) => {
  page.style.transform = `translateY(${i * 100}vh)`;
});
setTimeout(() => {
  pages.forEach((page, _) => {
    page.style.visibility = 'visible';
    page.style.transition = 'transform 0.8s ease';
  });
}, 50);

navItems.forEach((item, i) => {
  item.addEventListener('click', () => { scrollToPage(i); });
});

// Ease-in
setTimeout(() => {    
  pages.forEach((page, i) => {
    page.classList.toggle('current', i === 0)
  });
  document.getElementById('nav').classList.toggle('loaded', true);
  // document.getElementById('intro').classList.toggle('loaded', true);
  // document.querySelector('#intro_page .contacts').classList.toggle('loaded', true);
}, 200);

// State
let currPageIdx = 0;
let isScrolling = false;

// Behavior
function scrollToPage(index) {
  console.log(`Currently at page ${currPageIdx}, scrolling to page ${index}`);
  if (index < 0 || index >= pages.length || isScrolling) return;
  
  isScrolling = true;

  pages.forEach((page, i) => {
    // Move each page up or down depending on its position
    page.style.transform = `translateY(${(i - index) * 100}vh)`;
  });

  pages.forEach((page, i) => {
    page.classList.toggle('current', i === currPageIdx)
  });
  
  navItems.forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });

  // Allow next scroll
  setTimeout(() => {
    currPageIdx = index;
    isScrolling = false;
  }, 300);

  setTimeout(() => {
    pages.forEach((page, i) => {
      if (i === index) {
        page.classList.toggle('current', true)
      }
    });
  }, 400);
}

// Event callback
document.addEventListener('wheel', (event) => {
  if (event.deltaY > 0) {
    scrollToPage(currPageIdx + 1);
  } else {
    scrollToPage(currPageIdx - 1);
  }
});