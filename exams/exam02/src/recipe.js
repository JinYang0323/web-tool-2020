import {
	checkLoginStatus,
	performLogin,
	performLogout,
	performGetRecipeList,
	performGetRecipe,
	performAddRecipe,
} from './services';

addLogin();
addLogout();
showRecipeListView();
addAbilityToAddRecipe();
addAbilityToViewRecipeDetail();
addAbilityToReturnHome();

checkLoginStatus()
	.then((recipes) => {
		showContent();
		renderRecipeList(recipes);
	})
	.catch((recipes) => {
		showLogin();
		renderRecipeList(recipes);
	});

function showContent() {
	document.querySelector('#recipe-app .login').classList.add('hidden');
	document.querySelector('#recipe-app .logout').classList.remove('hidden');
	document
		.querySelector('#recipe-app .add-recipe')
		.classList.remove('hidden');
	document
		.querySelector('#recipe-app .add-recipe')
		.classList.remove('hidden');
}

function showLogin() {
	document.querySelector('#recipe-app .login').classList.remove('hidden');
	document.querySelector('#recipe-app .logout').classList.add('hidden');
	document.querySelector('#recipe-app .add-recipe').classList.add('hidden');
	document.querySelector('#recipe-app .login button').disabled = true;
}

function showRecipeListView() {
	document
		.querySelector('#recipe-app .recipe-detail-view')
		.classList.add('hidden');
	document
		.querySelector('#recipe-app .recipe-list-view')
		.classList.remove('hidden');
	document
		.querySelector('#recipe-app .add-recipe-view')
		.classList.add('hidden');
}

function showRecipeDetailView() {
	document
		.querySelector('#recipe-app .recipe-detail-view')
		.classList.remove('hidden');
	document
		.querySelector('#recipe-app .recipe-list-view')
		.classList.add('hidden');
	document
		.querySelector('#recipe-app .add-recipe-view')
		.classList.add('hidden');
}

function showAddRecipeView() {
	document
		.querySelector('#recipe-app .recipe-detail-view')
		.classList.add('hidden');
	document
		.querySelector('#recipe-app .recipe-list-view')
		.classList.add('hidden');
	document
		.querySelector('#recipe-app .add-recipe-view')
		.classList.remove('hidden');
	disableButtonIfNoInputInAdd();
	addAbilityToAddRecipeToServer();
}

function disableButtonIfNoInputInlogin() {
	const inputEl = document.querySelector('#recipe-app .login input');
	const buttonEl = document.querySelector('#recipe-app .login button');
	inputEl.addEventListener('input', () => {
		buttonEl.disabled = !inputEl.value;
	});
}

function disableButtonIfNoInputInAdd() {
	const inputEl = document.querySelector(
		'#recipe-app .add-recipe-view input'
	);
	const ingredientsEl = document.querySelector(
		'#recipe-app .add-recipe-view .ingredients-to-add'
	);
	const instructionsEl = document.querySelector(
		'#recipe-app .add-recipe-view .instructions-to-add'
	);
	const buttonEl = document.querySelector(
		'#recipe-app .add-recipe-view .add-recipe-btn'
	);
	inputEl.addEventListener('input', () => {
		buttonEl.disabled = !(
			inputEl.value &&
			ingredientsEl.value &&
			instructionsEl.value
		);
	});
	ingredientsEl.addEventListener('input', () => {
		buttonEl.disabled = !(
			inputEl.value &&
			ingredientsEl.value &&
			instructionsEl.value
		);
	});
	instructionsEl.addEventListener('input', () => {
		buttonEl.disabled = !(
			inputEl.value &&
			ingredientsEl.value &&
			instructionsEl.value
		);
	});
}

function showLoginError(error) {
	document.querySelector('#recipe-app .login-status').innerText = error.error;
}

function addLogin() {
	disableButtonIfNoInputInlogin();
	document
		.querySelector('#recipe-app .login button')
		.addEventListener('click', () => {
			const usernameEl = document.querySelector(
				'#recipe-app .login input'
			);
			const username = usernameEl.value;
			performLogin(username)
				.then(({ recipes }) => {
					showContent(recipes);
				})
				.catch((err) => {
					showLoginError(err);
					usernameEl.value = '';
				});
		});
}

function addLogout() {
	document
		.querySelector('#recipe-app .logout button')
		.addEventListener('click', () => {
			performLogout().then(showLogin);
		});
}

function renderRecipeList(recipes) {
	const recipeListEl = document.querySelector('#recipe-app .recipes');
	const html = Object.keys(recipes)
		.map((recipeId) => {
			return `<li key=${recipeId} data-id=${recipeId} class='recipe'>
      ${recipes[recipeId].recipeName}    ${recipes[recipeId].author}
    </li>`;
		})
		.join('\n');
	recipeListEl.innerHTML = html;
}

function renderRecipeDetail(recipe) {
	const recipeDetailEl = document.querySelector('#recipe-app .recipe-detail');
	const html = `
  <div>Title: ${recipe.recipeName}</div>
  <div>Author: ${recipe.author}</div>
  <div>ingredients: ${recipe.ingredients}</div>
  <div>instructions: ${recipe.instructions}</div>`;
	recipeDetailEl.innerHTML = html;
}

function addAbilityToAddRecipe() {
	const addRecipebtnEl = document.querySelector('#recipe-app .add-recipe');
	addRecipebtnEl.addEventListener('click', () => {
		showAddRecipeView();
	});
}

function addAbilityToAddRecipeToServer() {
	const buttonEl = document.querySelector(
		'#recipe-app .add-recipe-view .add-recipe-btn'
	);
	buttonEl.addEventListener('click', () => {
		const recipeName = document.querySelector(
			'#recipe-app .add-recipe-view .title-to-add'
		).value;
		const ingredients = document.querySelector(
			'#recipe-app .add-recipe-view .ingredients-to-add'
		).value;
		const instructions = document.querySelector(
			'#recipe-app .add-recipe-view .instructions-to-add'
		).value;
		performAddRecipe({ recipeName, ingredients, instructions }).then(
			(response) => {
				showRecipeDetailView();
				renderRecipeDetail(response.recipe);
			}
		);
	});
}

function addAbilityToViewRecipeDetail() {
	const recipeListEl = document.querySelector('#recipe-app .recipes');
	recipeListEl.addEventListener('click', (e) => {
		if (!e.target.classList.contains('recipe')) {
			return;
		}
		performGetRecipe(e.target.dataset.id).then((response) => {
			showRecipeDetailView();
			renderRecipeDetail(response.recipe);
		});
	});
}

function addAbilityToReturnHome() {
	const returnHomeBtnInAdd = document.querySelector(
		'#recipe-app .recipe-detail-view .return-home'
	);
	returnHomeBtnInAdd.addEventListener('click', () => {
		showRecipeListView();
	});
	const returnHomeBtnInDetail = document.querySelector(
		'#recipe-app .recipe-detail-view .return-home'
	);
	returnHomeBtnInDetail.addEventListener('click', () => {
		showRecipeListView();
	});
}
