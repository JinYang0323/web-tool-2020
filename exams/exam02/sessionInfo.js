const uuid = require('uuid').v4;

const sessions = {};

const isValidSession = (sid) => {
	return sessions[sid];
};

const validateUsername = (username) => {
	let errorCode = '200';
	if (!username) errorCode = '401';
	else if (username.indexOf('dog') !== -1) errorCode = '403';
	return errorCode;
};

const createSession = (username) => {
	const sid = uuid();
	sessions[sid] = { username };
	return sid;
};

const removeFromSession = (sid) => {
	delete sessions[sid];
};

module.exports = {
	isValidSession,
	validateUsername,
	createSession,
	removeFromSession,
};
