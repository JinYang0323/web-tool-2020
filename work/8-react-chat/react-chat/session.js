const uuid = require('uuid').v4;

const users = {
    Amit: {
        username: 'Amit',
    },
    Bao: {
        username: 'Bao',
    },
};
const sessions = {};

const isValidUsername = function (username) {
    if (!username || username === 'dog') {
        return false;
    }
    const cleanUsername = username.replace(/[^a-zA-Z0-9_\-]/g, '');
    if (!username === cleanUsername) {
        return false;
    }
    return true;
};

const create = function ({ username }) {
    if (!username) {
        return { error: 'username-required' };
    }
    if (!isValidUsername(username)) {
        return { error: 'username-invalid' };
    }
    const sid = uuid();
    users[username] = users[username] || {
        username,
    };
    sessions[sid] = {
        sid,
        username,
        startTime: Date.now(),
        info: users[username],
    };
    return { sid };
};

const remove = function (sid) {
    delete users[sessions[sid].username];
    delete sessions[sid];
};

const isValid = function (sid) {
    return !!sessions[sid];
};

const getUsername = (sid) => {
    return sessions[sid] ? sessions[sid].username : '';
};

module.exports = {
    users,
    sessions,
    create,
    remove,
    isValid,
    getUsername,
};
