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

const initApp = () => {
	////////////////////////////////////////////////////////////////////////////////////////////
	//
	//    INITIALIZING DYNAMIC HTML
	//
	////////////////////////////////////////////////////////////////////////////////////////////
	let main = document.querySelector('main');
	const fragment = document.createDocumentFragment();

	for (let i = 0; i < menuArray.length; i++) {
		const { name, ingredients, price, emoji } = menuArray[i];
		const foodItemContainer = document.createElement('div');
		const foodItemEmoji = document.createElement('div');
		const foodItemInfo = document.createElement('div');
		const foodItemName = document.createElement('h2');
		const foodItemIngredients = document.createElement('small');
		const foodItemPrice = document.createElement('p');
		const foodItemAdd = document.createElement('button');

		fragment.append(foodItemContainer);
		foodItemContainer.append(foodItemEmoji, foodItemInfo, foodItemAdd);
		foodItemContainer.classList = name.toLocaleLowerCase();

		foodItemEmoji.classList = 'emoji';
		foodItemEmoji.textContent = emoji;

		foodItemInfo.append(foodItemName, foodItemIngredients, foodItemPrice);
		foodItemInfo.classList = 'food__information';
		foodItemName.classList = 'name';
		foodItemName.textContent = name;
		foodItemIngredients.classList = 'ingredients';
		foodItemIngredients.textContent = ingredients;
		foodItemPrice.classList = 'price';
		foodItemPrice.textContent = '$' + price;

		foodItemAdd.id = name.toLocaleLowerCase() + '__button';
		foodItemAdd.textContent = '+';
	}

	main.append(fragment);

	////////////////////////////////////////////////////////////////////////////////////////////
	//
	//    APP LOGIC
	//
	////////////////////////////////////////////////////////////////////////////////////////////
	let totalPrice = 0;
	const addPizza = document.querySelector('#pizza__button');
	const addHamburger = document.querySelector('#hamburger__button');
	const addBeer = document.querySelector('#beer__button');
	// empty array so i can push prices values into
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

	// DYNAMIC FINAL ORDER HTML
	function addFoodItem(food, price) {
		const orderContainer = document.querySelector('.order__container');
		const li = document.createElement('li');
		const foodName = document.createElement('h3');
		const removeBtn = document.createElement('button');
		const foodPrice = document.createElement('p');
		const orderFinished = document.querySelector('.order__finished');

		orderFinished.setAttribute('style', 'display: none');

		document.querySelector('ul').append(li);
		li.append(foodName, removeBtn, foodPrice);
		li.classList = 'food__item';

		foodName.textContent = food;

		removeBtn.textContent = 'remove';
		removeBtn.classList = `remove__btn remove__${food}`;

		foodPrice.textContent = '$' + price;

		removeBtn.addEventListener('click', () => {
			// finding index of the price of the li removed so i can remove the price from the array
			const index = foodArray.indexOf(price);

			li.remove();
			checkIfFoodItem();
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

	const CompleteOrderBtn = document.querySelector('#confirm__purchase');
	const form = document.querySelector('form');
	// const orderFinished = document.querySelector('.order__finished');

	CompleteOrderBtn.addEventListener('click', () => {
		const formElement = document.querySelector('.form');
		form.setAttribute('style', 'display: initial');

		document.addEventListener('click', (e) => {
			if (formElement.contains(e.target) || CompleteOrderBtn.contains(e.target)) {
				return;
			} else {
				form.setAttribute('style', 'display: none');
			}
		});
	});

	form.addEventListener('submit', () => {
		const orderContainer = document.querySelector('.order__container');
		const orderFinished = document.querySelector('.order__finished');
		const orderFinishedMessage = document.querySelector('.order__finished__message');
		const name = document.querySelector('#name').value;
		console.log(name);

		foodArray = [];
		document.querySelector('ul').textContent = '';

		orderFinishedMessage.textContent = `Thanks, ${name}! Your order is on its way!`;

		form.setAttribute('style', 'display: none');
		orderContainer.setAttribute('style', 'display: none');
		orderFinished.setAttribute('style', 'display: flex');
	});
};

document.addEventListener('DOMContentLoaded', initApp);
