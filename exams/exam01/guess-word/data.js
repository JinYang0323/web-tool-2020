// a map key: session id, value: { username }
const userinfo = {};
const secretWords = {};
const guessHistory = {};

const addUserinfo = (uuid, info) => {
    userinfo[uuid] = info;
};

const isValid = (sid) => {
    if(userinfo[sid]) {
        return true;
    }
    return false;
};

const getUserinfo = (sid) => {
    return userinfo[sid];
};

const saveSecret = ({ username, secret }) => {
    secretWords[username] = secret;
};

const updateSecret = ({ username, secret }) => {
    secretWords[username] = secret;
};

const getGuessHistory = ({ username }) => {
    if(!guessHistory[username]) {
        guessHistory[username] = [];
    }
    return guessHistory[username];
}

const addGuessHistory = ({ username, guess, count }) => {
    guessHistory[username].push({ guess, count });
}

const clearGuessHistory = ({ username }) => {
    guessHistory[username].splice(0, guessHistory[username].length);
}

const getLastCompare = ({ username }) => {
    return guessHistory[username].length === 0 ? null : guessHistory[username][guessHistory[username].length - 1].count;
}

const compare = ({ username, userGuess, validWords }) => {
    const guess = userGuess.toUpperCase();
    const word = secretWords[username].toUpperCase();
    if(!validWords.includes(guess)) return -1;
    if(guess === word) return guess.length + 1;
    let count = 0;
    let wordMap = {};
    word.split('').forEach((chr) => {
        wordMap[chr] ? wordMap[chr]++ : (wordMap[chr] = 1);
    });
    guess.split('').forEach((chr) => {
        if (wordMap[chr]) {
        wordMap[chr]--;
        count++;
        if (wordMap[chr] == 0) delete wordMap[chr];
        }
    });
    return count;
}

const data = {
    addUserinfo,
    saveSecret,
    updateSecret,
    isValid,
    getUserinfo,
    getGuessHistory,
    addGuessHistory,
    clearGuessHistory,
    getLastCompare,
    compare
}
module.exports = data;