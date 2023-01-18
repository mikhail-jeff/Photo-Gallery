const btn = document.querySelector('#btn');
const errorMessage = document.querySelector('#errorMessage');
const gallery = document.querySelector('#gallery');

const fetchImage = async () => {
	const inputValue = document.querySelector('#input').value;

	if (inputValue > 10 || inputValue < 1) {
		errorMessage.style.display = 'block';
		errorMessage.innerText = 'Number should be between 0 and 11';
		return;
	}

	let images = '';

	try {
		btn.style.display = 'none';
		const loading = `<img src="spinner.svg"/>`;
		gallery.innerHTML = loading;

		await fetch(`https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(Math.random() * 1000)}&client_id=dhN-mSfKFKiRcVgeSBmHHzEUbIdDViNQIik3xbvE970`)
			.then((res) => res.json())
			.then((data) => {
				if (data) {
					data.forEach((picture) => {
						images += `
            <img src=${picture.urls.small} alt="images" />
            `;

						gallery.style.display = 'block';
						gallery.innerHTML = images;
						btn.style.display = 'block';
						errorMessage.style.display = 'none';
					});
				}
			});
	} catch (error) {
		console.log(error);
		errorMessage.style.display = 'block';
		errorMessage.innerText = 'An error happened, try again later';
		btn.style.display = 'block';
		gallery.style.display = 'none';
	}
};

btn.addEventListener('click', fetchImage);
