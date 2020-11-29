export const checkLoginStatus = () => {
	return fetch('/session', {
		method: 'GET',
		headers: new Headers({
			'content-type': 'application/json',
		}),
	})
		.catch((err) => Promise.reject({ err: 'network-error' }))
		.then((response) => {
			if (response.ok) return response.json();
			return response.json().then((err) => Promise.reject(err.recipes));
		});
};

export const performLogin = (username) => {
	return fetch('/session', {
		method: 'POST',
		headers: new Headers({
			'content-type': 'application/json',
		}),
		body: JSON.stringify({ username }),
	})
		.catch(() => {
			return Promise.reject({ error: 'network-error' });
		})
		.then((response) => {
			if (response.ok) return response.json();
			return response.json().then((err) => Promise.reject(err));
		});
};

export const performLogout = () => {
	return fetch('/session', {
		method: 'DELETE',
		headers: new Headers({
			'content-type': 'application/json',
		}),
	})
		.catch(() => {
			return Promise.reject({ error: 'network-error' });
		})
		.then((response) => {
			if (response.ok) return response.json();
			return response.json().then((err) => Promise.reject(err));
		});
};

export const performGetRecipeList = () => {
	return fetch('/recipes', {
		method: 'GET',
		headers: new Headers({
			'content-type': 'application/json',
		}),
	})
		.catch((err) => Promise.reject({ err: 'network-error' }))
		.then((response) => {
			if (response.ok) return response.json();
			return response.json().then((err) => Promise.reject(err));
		});
};

export const performGetRecipe = (recipeId) => {
	return fetch(`/recipe/${recipeId}`, {
		method: 'GET',
		headers: new Headers({
			'content-type': 'application/json',
		}),
	})
		.catch((err) => Promise.reject({ err: 'network-error' }))
		.then((response) => {
			if (response.ok) return response.json();
			return response.json().then((err) => Promise.reject(err));
		});
};

export const performAddRecipe = ({ recipeName, ingredients, instructions }) => {
	return fetch(`/recipe/${recipeName}`, {
		method: 'POST',
		headers: new Headers({
			'content-type': 'application/json',
		}),
		body: JSON.stringify({ ingredients, instructions }),
	})
		.catch(() => Promise.reject({ error: 'network-error' }))
		.then((response) => {
			if (response.ok) return response.json();
			return response.json().then((err) => Promise.reject(err));
		});
};
