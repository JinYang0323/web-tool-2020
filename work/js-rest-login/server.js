const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid').v4;
const app = express();
const PORT = 3000;

//  ************************ session info ************************
const sessions = {};

const isValidSession = function (sid) {
	return sessions[sid];
};

const removeFromSession = (sid) => {
	delete sessions[sid];
};

const validateUsername = function (username) {
	let errorCode = '200';
	if (!username) {
		errorCode = '401';
	} else if (username.indexOf('dog') !== -1) {
		errorCode = '403';
	}
	return errorCode;
};

const createSession = function (username) {
	const sid = uuid();
	sessions[sid] = {
		username,
	};
	return sid;
};

// ************************ user info ************************
const userInfo = {
	test: {
		todos: [
			{
				task: 'task1',
				done: false,
			},
		],
	},
};

const getUserInfo = (username) => {
	if (!userInfo[username]) {
		userInfo[username] = {
			todos: [],
		};
	}
	return userInfo[username];
};

const changeTaskStatus = (username, index) => {
	userInfo[username].todos[index].done = !userInfo[username].todos[index]
		.done;
};

const addTask = (username, task) => {
	for (let i = 0; i < userInfo[username].todos.length; i++) {
		if (userInfo[username].todos[i].task === task) {
			return;
		}
	}
	userInfo[username].todos.push({
		task,
		done: false,
	});
};

const deleteTask = (username, index) => {
	userInfo[username].todos.splice(index, 1);
};

app.use(express.static('./public'));
app.use(cookieParser());

app.get('/session', (req, res) => {
	// check cookie from request
	const sid = req.cookies.sid;
	if (!sid) {
		res.status(401).json({ error: 'login required' });
		return;
	}
	if (isValidSession(sid)) {
		res.status(200).json(sessions[sid]);
		return;
	}

	res.status(403).json({ error: 'login invalid' });
});

app.post('/session', express.json(), (req, res) => {
	const { username } = req.body;
	const errorCode = validateUsername(username);
	if (errorCode === '401') {
		res.status(401).json({ error: 'username required' });
		return;
	} else if (errorCode === '403') {
		res.status(403).json({ error: 'username invalid' });
		return;
	}
	const sid = createSession(username);
	res.cookie('sid', sid);
	res.status(200).json({ userInfo: getUserInfo(username), sid });
});

app.delete('/session', express.json(), (req, res) => {
	const { sid } = req.body;
	res.cookie.remove('sid');
	removeFromSession(sid);
	res.status(200);
});

// change complete status of task
app.put('/user/:username/task/:task', (req, res) => {
	const { username, task } = req.params;
	changeTaskStatus(username, task);
	res.status(200).json(getUserInfo(username).todos);
});

// add new task
app.post('/user/:username/task/:task', (req, res) => {
	const { username, task } = req.params;
	if (!task) {
		res.status(400).json({ error: 'missing-task' });
		return;
	}
	addTask(username, task);
	res.status(200).json(getUserInfo(username).todos);
});

app.delete('/user/:username/task/:task', (req, res) => {
	const { username, task } = req.params;
	deleteTask(username, task);
	res.status(200).json(getUserInfo(username).todos);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
