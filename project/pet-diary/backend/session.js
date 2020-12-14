const uuid = require("uuid").v4;

const users = {
    test: { username: "test" },
    jin: { username: "jin" },
};

const sessions = {
    "b5478d2c-a8fc-4e04-b63d-ab74efc55e0b": {
        username: "test",
    },
};

const isValidSession = function (sid) {
    return sessions[sid];
};

const getSessionInfo = (sessionId) => {
    return sessions[sessionId];
};

const isValidUsername = (username) => {
    if (!username || username === "cat") {
        return false;
    }
    const cleanUsername = username.replace(/[^a-zA-Z0-9_\-]/g, "");
    if (!username === cleanUsername || username.trim().length === 0) {
        return false;
    }
    return true;
};

const createUser = function ({ username }) {
    if (!username) {
        return { error: "username-required" };
    }
    if (!isValidUsername(username)) {
        return { error: "username-invalid" };
    }
    const sid = uuid();
    users[username] = users[username] || { username };
    sessions[sid] = {
        username,
    };
    return { sid };
};

const removeSession = function (sid) {
    delete users[sessions[sid].username];
    delete sessions[sid];
};

module.exports = {
    isValidSession,
    getSessionInfo,
    createUser,
    removeSession,
    removeSession,
};
