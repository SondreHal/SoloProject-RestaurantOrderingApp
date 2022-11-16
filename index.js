const menuArray = [
	{
		name: 'Pizza',
		ingredients: ['pepperoni', 'mushroom', 'mozzarella'],
		id: 0,
		price: 14,
		emoji: '🍕',
	},
	{
		name: 'Hamburger',
		ingredients: ['beef', 'cheese', 'lettuce'],
		price: 12,
		emoji: '🍔',
		id: 1,
	},
	{
		name: 'Beer',
		ingredients: ['grain, hops, yeast, water'],
		price: 12,
		emoji: '🍺',
		id: 2,
	},
];

let main = document.getElementById('main');

for (let i = 0; i < menuArray.length; i++) {
	const { name, ingredients, id, price, emoji } = menuArray[i];
	let dynamicFoodItem = '';

	dynamicFoodItem += `
    <div class="${name.toLowerCase()}">
		<div class="emoji">${emoji}</div>

		<div class="food__information">
			<h2 class="name">${name}</h2>

			<small class="ingredients">${ingredients}</small>

			<p class="price">$${price}</p>
        </div>

        <button id="${name.toLowerCase()}__button">+</button>
	</div>
    `;

	main.innerHTML += dynamicFoodItem;
}

let totalPrice = 0;
const addPizza = document.querySelector('#pizza__button');
const addHamburger = document.getElementById('hamburger__button');
const addBeer = document.getElementById('beer__button');
let foodArray = [];

addPizza.addEventListener('click', () => {
	foodArray.push(14);
	addFoodItem('Pizza', 14);
});

addHamburger.addEventListener('click', () => {
	foodArray.push(12);
	addFoodItem('Hamburger', 12);
});

addBeer.addEventListener('click', () => {
	foodArray.push(12);
	addFoodItem('Beer', 12);
});

function addFoodItem(food, price) {
	const orderContainer = document.querySelector('.order__container');
	const li = document.createElement('li');
	const foodName = document.createElement('h3');
	const removeBtn = document.createElement('button');
	const foodPrice = document.createElement('p');

	document.querySelector('ul').append(li);
	li.append(foodName, removeBtn, foodPrice);

	li.classList = 'food__item';

	foodName.textContent = food;

	removeBtn.textContent = 'remove';
	removeBtn.classList = `remove__btn remove__${food}`;

	foodPrice.textContent = '$' + price;

	removeBtn.addEventListener('click', () => {
		li.remove();
		checkIfFoodItem();
		const index = foodArray.indexOf(price);
		console.log(foodArray);
		console.log(price);
		foodArray.splice(index, 1);
		calcPrice();
	});

	function checkIfFoodItem() {
		if (document.querySelector('.food__items').hasChildNodes(li)) {
			orderContainer.setAttribute('style', 'display: initial');
		} else {
			orderContainer.setAttribute('style', 'display: none');
		}
	}

	function calcPrice() {
		const priceTag = document.querySelector('.total__price');

		totalPrice = foodArray.reduce((partialSum, a) => partialSum + a, 0);
		priceTag.textContent = '$' + totalPrice;
	}

	checkIfFoodItem();
	calcPrice();
}
