const pageSelections = document.querySelectorAll('#page_selection li i');
const pages = document.querySelectorAll('.showcase');

let currPage = 0;
let isFlipping = false;

// On load
pageSelections.forEach((item, i) => {
	item.addEventListener('click', () => { flipToPage(i); });
});

pages.forEach((page, i) => {
	page.style.zIndex = `${i === currPage ? 2 : 0}`;
});

function flipToPage(index) {
	if (index === currPage || isFlipping) return;

	console.log(`Flipping to page ${index}`);

	isFlipping = true;

	pages.forEach((page, i) => {
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
	
	setTimeout(() => {
		pages.forEach((page, i) => {
			if (i === currPage) {
				page.classList.toggle('next', true);
			}
		})

		pageSelections.forEach((item, i) => {
			item.classList.toggle('fa-solid', i === index);
			item.classList.toggle('fa-regular', i !== index);
		});
		
		currPage = index;
		isFlipping = false;
	  }, 1000);
}