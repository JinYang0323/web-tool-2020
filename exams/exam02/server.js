const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;
const recipes = require('./recipes');
const sessionInfo = require('./sessionInfo');

app.use(express.static('./public'));
app.use(cookieParser());

app.get('/session', (req, res) => {
	const sid = req.cookies.sid;
	if (!sid) {
		res.status(401).json({
			error: 'login-required',
			recipes: recipes.getRecipeList(),
		});
		return;
	}
	if (sessionInfo.isValidSession(sid)) {
		res.status(200).json(sessionInfo.isValidSession(sid));
		return;
	}
	res.status(403).json({
		error: 'login-invalid',
		recipes: recipes.getRecipeList(),
	});
});

app.post('/session', express.json(), (req, res) => {
	const { username } = req.body;
	const errorCode = sessionInfo.validateUsername(username);
	if (errorCode === '401') {
		res.status(401).json({
			error: 'username-required',
			recipes: recipes.getRecipeList(),
		});
		return;
	} else if (errorCode === '403') {
		res.status(403).json({
			error: 'username-invalid',
			recipes: recipes.getRecipeList(),
		});
		return;
	}
	const sid = sessionInfo.createSession(username);
	res.cookie('sid', sid);
	res.status(200).json({ recipes: recipes.getRecipeList() });
});

app.delete('/session', express.json(), (req, res) => {
	const { sid } = req.cookies.sid;
	sessionInfo.removeFromSession(sid);
	res.clearCookie('sid');
	res.status(200).json({ logout: 'success' });
});

app.get('/recipes', (req, res) => {
	res.json({ recipes: recipes.getRecipeList() });
});

app.get('/recipe/:id', (req, res) => {
	const recipeId = req.params.id;
	const recipe = recipes.getRecipe(recipeId);
	if (recipe) res.json({ recipe });
	else {
		res.status(404).json({ error: `Unknown recipe: ${recipeId}` });
	}
});

app.post('/recipe/:name', express.json(), (req, res) => {
	const sid = req.cookies.sid;
	const author = sessionInfo.isValidSession(sid);
	if (!author.username) {
		res.status(401).json({ error: 'login-required' });
		return;
	}
	const recipeName = req.params.name;
	const { ingredients, instructions } = req.body;
	const newRecipe = recipes.addNewRecipe({
		recipeName,
		author: author.username,
		ingredients,
		instructions,
	});
	res.json({ recipe: newRecipe });
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
