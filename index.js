const menuArray = [
	{
		emoji: 'images/img_pizza.png',
		id: 0,
		ingredients: ['Pepperoni', 'Mushroom', 'Mozzarella'],
		name: 'Pizza',
		price: 14,
	},
	{
		emoji: 'images/img_burger.png',
		id: 1,
		ingredients: ['Beef', 'Cheese', 'Lettuce'],
		name: 'Hamburger',
		price: 12,
	},
	{
		emoji: 'images/img_beer.png',
		id: 2,
		ingredients: ['Grain, Hops, Yeast, Water'],
		name: 'Beer',
		price: 12,
	},
];

const initApp = () => {
	// DYNAMIC LIST OF FOOD ITEMS
	const fragment = document.createDocumentFragment();
	let itemFoodContainer = document.getElementById('item_foods_container');
	let foodArray = [];

	for (let i = 0; i < menuArray.length; i++) {
		const { name, ingredients, price, emoji } = menuArray[i];

		const itemFood = document.createElement('li');
		const itemFoodEmoji = document.createElement('img');
		const itemFoodInfoContainer = document.createElement('div');
		const itemFoodName = document.createElement('p');
		const itemFoodIngredients = document.createElement('p');
		const itemFoodPrice = document.createElement('p');
		const itemFoodAddToCart = document.createElement('button');

		fragment.append(itemFood);
		itemFood.classList = 'item_food';
		itemFood.append(itemFoodEmoji, itemFoodInfoContainer, itemFoodAddToCart);

		// FOOD EMOJI
		itemFoodEmoji.src = emoji;
		itemFoodEmoji.alt = name + ' Emoji';
		itemFoodEmoji.width = '70';
		itemFoodEmoji.height = '70';

		// FOOD INFO
		itemFoodInfoContainer.classList = 'item_food_info';
		itemFoodInfoContainer.append(itemFoodName, itemFoodIngredients, itemFoodPrice);
		// FOOD NAME
		itemFoodName.textContent = name;
		// FOOD INGREDIENTS
		itemFoodIngredients.textContent = ingredients.join(', ');
		// FOOD PRICE
		itemFoodPrice.textContent = '$' + price;

		// BUTTON TO ADD FOOD TO CART
		itemFoodAddToCart.classList = 'btn_add_item';
		itemFoodAddToCart.textContent = '+';
		itemFoodAddToCart.onclick = function () {
			foodArray.push(price);
			addFoodItem(name, price);
		};
	}
	itemFoodContainer.append(fragment);

	// DYNAMIC ORDER HTML
	function addFoodItem(food, price) {
		const orderDetailsContainer = document.getElementById('order_details_container');
		const orderDetailsUl = document.getElementById('order_details_ul');
		const orderFinishedMessageContainer = document.getElementById('order_finished_message_container');
		const itemFoodInCart = document.createElement('li');
		const itemFoodName = document.createElement('p');
		const btnRemoveItem = document.createElement('button');
		const itemFoodPrice = document.createElement('p');

		// HIDE ORDER FINISHED MESSAGE
		orderFinishedMessageContainer.setAttribute('style', 'display: none');

		// HIDE FINISHED ORDER MESSAGE
		orderDetailsUl.append(itemFoodInCart);
		itemFoodInCart.append(itemFoodName, btnRemoveItem, itemFoodPrice);

		itemFoodName.textContent = food;
		btnRemoveItem.textContent = 'remove';
		btnRemoveItem.onclick = function () {
			// REMOVES PRICE OF FOOD FROM ARRAY
			foodArray.splice(foodArray.indexOf(price), 1);
			// REMOVES THE FOOD ITEM FROM LIST
			itemFoodInCart.remove();

			calcPrice();
			checkIfFoodItem();
		};
		itemFoodPrice.textContent = '$' + price;

		const checkIfFoodItem = () => {
			if (orderDetailsUl.hasChildNodes(itemFoodInCart)) {
				// SHOW ORDER DETAILS
				orderDetailsContainer.setAttribute('style', 'display: initial');
			} else {
				// HIDE ORDER DETAILS
				orderDetailsContainer.setAttribute('style', 'display: none');
			}
		};

		// CALCULATES PRICE OF CART ITEMS
		function calcPrice() {
			let totalPrice = 0;
			const orderPriceTotal = document.getElementById('order_price_total');

			foodArray.map((num) => (totalPrice += num));
			orderPriceTotal.textContent = '$' + totalPrice;
		}

		checkIfFoodItem();
		calcPrice();
	}

	// FORM PAYMENT
	const btnCompleteOrder = document.getElementById('btn_complete_order');
	const formCompleteOrder = document.querySelector('form');

	btnCompleteOrder.onclick = function () {
		// SHOW FORM
		formCompleteOrder.setAttribute('style', 'display: initial');

		document.addEventListener('click', (e) => {
			if (formCompleteOrder.contains(e.target) || btnCompleteOrder.contains(e.target)) {
				return;
			} else {
				// HIDE FORM
				formCompleteOrder.setAttribute('style', 'display: none');
			}
		});
	};

	formCompleteOrder.addEventListener('submit', () => {
		foodArray = [];
		const orderDetailsContainer = document.getElementById('order_details_container');
		const orderDetailsUl = document.getElementById('order_details_ul');
		const orderFinishedMessageContainer = document.getElementById('order_finished_message_container');
		const orderFinishedMessage1 = document.getElementById('order_finished_message_1');
		const orderFinishedMessage2 = document.getElementById('order_finished_message_2');
		const customerName = document.getElementById('customer_name').value;

		orderDetailsUl.textContent = '';
		// SHOW COMPLETED ORDER MESSAGE
		orderFinishedMessageContainer.setAttribute('style', 'display: flex');
		orderFinishedMessage1.textContent = `Thanks, ${customerName}!`;
		orderFinishedMessage2.textContent = `Your order is on its way!`;
		// HIDE FORM
		formCompleteOrder.setAttribute('style', 'display: none');
		// HIDE ORDER DETAILS
		orderDetailsContainer.setAttribute('style', 'display: none');
	});
};
document.addEventListener('DOMContentLoaded', initApp());
