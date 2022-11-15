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

const addPizza = document.querySelector('#pizza__button');
const addHamburger = document.getElementById('hamburger__button');
const addBeer = document.getElementById('beer__button');

console.log(addPizza);

addPizza.addEventListener('click', () => {
	addFoodItem('Pizza', 14);
});

addHamburger.addEventListener('click', () => {
	addFoodItem('Hamburger', 14);
});

addBeer.addEventListener('click', () => {
	addFoodItem('Beer', 14);
});

function addFoodItem(food, price) {
	const li = document.createElement('li');
	const foodName = document.createElement('h3');
	const removeBtn = document.createElement('button');
	const foodPrice = document.createElement('p');

	document.querySelector('ul').append(li);
	li.append(foodName, removeBtn, foodPrice);

	foodName.textContent = food;
	removeBtn.textContent = 'remove';
	foodPrice.textContent = '$' + price;
}
