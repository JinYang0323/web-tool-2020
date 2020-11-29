const express = require('express');
const app = express();
const PORT = 3000;
const uuidv4 = require('uuid').v4;
const cookieParser = require('cookie-parser');

const validWords = require('./word');
const data = require('./data');
const loginWeb = require('./login-web');
const guessWordWeb = require('./guess-word-web');

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public'));

function generateSecret() {
    const secret = validWords[Math.floor(Math.random() * validWords.length)];
    console.log("secret", secret);
    return secret;
}

app.get('/', (req, res) => {
    
    const sid = req.cookies.sid;

    if(!sid || !data.isValid(sid)) {
        // ask for login
        res.send(loginWeb.loginPage());
        return;
    }
    const username = data.getUserinfo(sid).username;
    // go to guess page
    res.send(guessWordWeb.guessWordPage({ 
        username, 
        guessHistory: data.getGuessHistory({ username }),
        validWords,
        compare: data.getLastCompare({ username })
    }));

});

app.post('/login', (req, res) => {
    const { username } = req.body;

    if(username) {
        // generate secret word
        const secret = generateSecret();
        const uuid = uuidv4();
        data.addUserinfo(uuid, { username });
        data.saveSecret({ username, secret });
        res.cookie('sid', uuid);
        res.redirect('/');
    }
});

app.post('/', (req, res) => {
    const { username, userGuess } = req.body;
    const compare = data.compare({ username, userGuess, validWords });
    if(compare === userGuess.length + 1) {
        // generate new secret word and clear guess history
        const secret = generateSecret();
        data.updateSecret({ username, secret });
        data.clearGuessHistory({username});
        // Display that the user has correctly guessed the word and allow them to start a new game
        res.send( `
        <div>
            You have correctly guessed the word! Please start a new game
            <form action='/' method="GET"> 
                <button type="submit">Start new Game</button>
            </form>
        </div>`);
        return;
    }
    else if(compare !== -1) {
        // add to history
        data.addGuessHistory({ username, guess: userGuess, count: compare });
    }
    res.redirect('/');
    // res.send(guessWordWeb.guessWordPage({ 
    //     username, 
    //     guessHistory: data.getGuessHistory({username}),
    //     validWords,
    //     compare
    // }));
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`));