const sessions = {};

export const isValidSession = function (sid) {
	return sessions[sid];
};

export const validateUsername = function (username) {
	let errorCode = '200';
	if (!username) {
		errorCode = '401';
	} else if (username.indexOf('dog') !== -1) {
		errorCode = '403';
	}
	return errorCode;
};

export const createSession = function (username) {
	const sid = uuid();
	sessions[sid] = {
		username,
	};
	return sid;
};
