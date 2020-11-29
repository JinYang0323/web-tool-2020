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

export const getUserInfo = (username) => {
	return userInfo[username];
};

export const deleteTask = (username, task) => {
	console.log('delete task', username, task);
	delete userInfo[username].todos[task];
	// for (let i = 0; i < userInfo[username].todos.length; i++) {
	// 	if (userInfo[username].todos[i].task === task) {
	// 		delete userInfo[username].todos[i];
	// 		break;
	// 	}
};
