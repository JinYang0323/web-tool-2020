let id = 1;
// recipes stored as object, key being the recipe_id
const recipes = {
	1: {
		title: 'title1',
		author: 'author1',
		ingredients: 'ingredients',
		instructions: 'instructions',
	},
	2: {
		title: 'title2',
		author: 'author2',
		ingredients: 'ingredients',
		instructions: 'instructions',
	},
	3: {
		title: 'title3',
		author: 'author3',
		ingredients: 'ingredients',
		instructions: 'instructions',
	},
	4: {
		title: 'title4',
		author: 'author2',
		ingredients: 'ingredients',
		instructions: 'instructions',
	},
};

const getRecipeList = () => {
	const recipeList = {};
	Object.keys(recipes).forEach((id) => {
		recipeList[id] = {
			title: recipes[id].title,
			author: recipes[id].author,
		};
	});
	return recipeList;
};

const getRecipe = (recipeId) => {
	return recipes[recipeId];
};

const addNewRecipe = ({ recipeName, author, ingredients, instructions }) => {
	recipes[id++] = { recipeName, author, ingredients, instructions };
	return recipes[id - 1];
};

module.exports = {
	getRecipeList,
	getRecipe,
	addNewRecipe,
};
