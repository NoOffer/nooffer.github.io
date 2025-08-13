const pageSelections = document.querySelectorAll('#page_selection li i');
const showcases = document.querySelectorAll('.showcase');
const descriptions = document.querySelectorAll('.showcase_desc');

let currPage = 0;
let isFlipping = false;

// On load
pageSelections.forEach((item, i) => {
	item.addEventListener('click', () => { flipToPage(i); });
});

showcases.forEach((page, i) => {
	page.classList.toggle('next', i > 0);
	page.style.zIndex = `${i === currPage ? 2 : 0}`;
});

descriptions.forEach((item, i) => {
	item.classList.toggle('next', i > 0);
});

document.getElementById('prev_page').addEventListener('click', () => { flip(-1); });
document.getElementById('next_page').addEventListener('click', () => { flip(1); });

function flip(offset) {
	flipToPage(currPage + offset);
}

function flipToPage(index) {	
	if (index === currPage || isFlipping) return;

	if (index < 0){
		index = showcases.length - 1;
	}
	else if (index >= showcases.length){
		index = 0;
	}

	isFlipping = true;

	pageSelections.forEach((item, i) => {
		item.classList.toggle('fa-solid', i === index);
		item.classList.toggle('fa-regular', i !== index);
	});

	showcases.forEach((page, i) => {
		if (i === index) {
			page.classList.toggle('next', false);
		}

		if (i === index) {
			page.style.zIndex = '2';
		}
		else {
			if (i === currPage) {
				page.style.zIndex = '1';
			}
			else {
				page.style.zIndex = '0';
			}
		}

	});

	descriptions.forEach((item, i) => {
		item.classList.toggle('next', i !== index);
	});
	
	setTimeout(() => {
		showcases.forEach((page, i) => {
			if (i === currPage) {
				page.classList.toggle('next', true);
			}
		})

		currPage = index;
		isFlipping = false;
	}, 1000);
}

// Event callback
document.addEventListener('wheel', (event) => {
  if (event.deltaY > 0) {
    flipToPage(currPage + 1);
  } else {
    flipToPage(currPage - 1);
  }
});