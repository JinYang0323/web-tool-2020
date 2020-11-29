import { checkLoginStatus, performLogin, performLogout } from './services.js';

let currentUser = '';
let currentSid = '';

addLogin();

// Check for login
checkLoginStatus()
	.then((userInfo) => {
		showContent();
	})
	.catch((error) => {
		showLogin();
	});

// TODO: Move these HTML-changing functions to an import from another file
function showContent() {
	document.querySelector('#todo-app .login').classList.add('hidden');
	document.querySelector('#todo-app .logged-in').classList.remove('hidden');
}

function showLogin() {
	document.querySelector('#todo-app .login').classList.remove('hidden');
	document.querySelector('#todo-app .logged-in').classList.add('hidden');
	document.querySelector('#todo-app .login button').disabled = true;
}

function showLoginError(error) {
	document.querySelector('#todo-app .login-status').innerText = error.error;
}

function addLogin() {
	disableButtonIfNoInput();
	document
		.querySelector('#todo-app .login button')
		.addEventListener('click', () => {
			const usernameEl = document.querySelector('#todo-app .login input');
			const username = usernameEl.value;
			// call service
			performLogin(username)
				.then(({ userInfo, sid }) => {
					currentUser = username;
					currentSid = sid;
					showContent();
					renderTodos(userInfo.todos);
					addAbilityToCompleteItems();
					addAbilityToAddItems();
					addAbilityToDeleteItems();
					addLogout();
				})
				.catch((err) => {
					showLoginError(err);
					usernameEl.value = '';
				});
		});
}

function renderTodos(todos) {
	const listEl = document.querySelector('#todo-app .todos');
	const html = todos
		.map((todo, index) => {
			return `
      <li>
          <span class="todo ${
				todo.done ? 'complete' : ''
			}" data-index="${index}">${todo.task}</span>
          <span class="delete" data-index="${index}">X</span>
        </li>`;
		})
		.join('\n');
	listEl.innerHTML = html;
}

function disableButtonIfNoInput() {
	const inputEl = document.querySelector('#todo-app .login input');
	const buttonEl = document.querySelector('#todo-app .login button');
	inputEl.addEventListener('input', () => {
		buttonEl.disabled = !inputEl.value;
	});
}

function convertError(response) {
	if (response.ok) {
		return response.json();
	}
	return response.json().then((err) => Promise.reject(err));
}

function addAbilityToCompleteItems() {
	const listEl = document.querySelector('#todo-app .todos');
	listEl.addEventListener('click', (e) => {
		if (!e.target.classList.contains('todo')) {
			return;
		}
		const index = e.target.dataset.index;
		fetch(`/user/${currentUser}/task/${index}`, {
			method: 'PUT',
		})
			.catch(() => Promise.reject({ error: 'network-error' }))
			.then(convertError)
			.then((todos) => {
				renderTodos(todos);
			});
	});
}

function addAbilityToAddItems() {
	const buttonEl = document.querySelector('#todo-app .add');
	const inputEl = document.querySelector('#todo-app .to-add');
	buttonEl.addEventListener('click', (e) => {
		fetch(`/user/${currentUser}/task/${inputEl.value}`, {
			method: 'POST',
		})
			.catch(() => Promise.reject({ error: 'network-error' }))
			.then(convertError)
			.then((todos) => {
				inputEl.value = '';
				renderTodos(todos);
			});
	});
}

function addAbilityToDeleteItems() {
	const listEl = document.querySelector('#todo-app .todos');
	listEl.addEventListener('click', (e) => {
		if (!e.target.classList.contains('delete')) {
			return;
		}
		const index = e.target.dataset.index; // read data-index from the element
		fetch(`/user/${currentUser}/task/${index}`, {
			method: 'DELETE',
		})
			.catch(() => Promise.reject({ error: 'network-error' }))
			.then(convertError)
			.then((todos) => {
				renderTodos(todos);
			});
	});
}

function addLogout() {
	document
		.querySelector('#todo-app .logout button')
		.addEventListener('click', () => {
			// call service
			performLogout(currentSid).then(() => {
				currentUser = '';
				showLogin();
			});
		});
	const usernameEl = document.querySelector('#todo-app .login input');
	usernameEl.value = '';
}
