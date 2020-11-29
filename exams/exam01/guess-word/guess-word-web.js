const { compare } = require('./data')

const guessWordWeb = {
    
    guessWordPage: ({ username, guessHistory, validWords, compare }) => {
        return `
        <!doctype html>
        <html>
            <head>
                <title>Guess Word</title>
                <link type="text/css" rel="stylesheet" href="/guess-word-web.css" />
            </head>
            <body>
                <div>
                    <div class="greeting">Hello ${ username }</div>
                    <div class="displayPanel">
                        ${guessWordWeb.validWordList(validWords)}
                        ${guessWordWeb.guessHistoryList(guessHistory)} 
                    </div>
                    ${guessWordWeb.guessPanel(username)}
                    ${guessWordWeb.resultPanel(compare)}
                </div>
            </body>
        </html>`
    },

    validWordList: (validWords) => {
        return `
        <div>
            This is a list of valid words:
            <div class="validWordList"><ul>` +
            validWords.map(validWord => 
                `<li key=${validWord}>${validWord}</li>`
            ).join('')
        + `</ul></div></div>
        `
    },

    guessHistoryList: (guessHistory) => {
        return `
        <div class="guessHistoryList">
            You have guessed ${ guessHistory.length } times
            This is your guess history: 
            <ol>`+ 
            guessHistory.map(guess => 
                `<li>Your guess: ${ guess.guess } Matching letters: ${ guess.count }</li>`
            ).join('') +
        `</ol></div>`
    },

    guessPanel: (username) => {
        return`
        <div class="guessPanel">
            <form action="/" method="POST">
                <label>Please enter your guess</label>
                <input id="user" name="username" value=${username}>
                <input name="userGuess">
                <button type="submit">guess</button>
            </form>
        </div>
        `
    },

    resultPanel: (compare) => {
        if(!compare) return ``;
        return `
            <div class="resultPanel">
                ${ 
                    compare === -1 ? 
                        `The word is not one of the permitted words. Please enter a new word` : 
                        `There are ${ compare } letters the word has in common with the secret word`
                }
            </div>`;
    }
}

module.exports = guessWordWeb;