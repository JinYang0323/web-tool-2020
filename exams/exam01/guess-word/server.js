const express = require("express");
const app = express();
const PORT = 3000;
const uuidv4 = require("uuid").v4;
const cookieParser = require("cookie-parser");

const { generateSecret } = require("./word");
const data = require("./data");
const loginWeb = require("./login-web");
const guessWordWeb = require("./guess-word-web");

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));

app.get("/", (req, res) => {
    const sid = req.cookies.sid;

    if (!sid || !data.isValid(sid)) {
        res.send(loginWeb.loginPage());
        return;
    }
    const username = data.getUserinfo(sid).username;
    res.send(
        guessWordWeb.guessWordPage({
            username,
            guessHistory: data.getGuessHistory({ username }),
            compare: data.getLastCompare({ username }),
        })
    );
});

app.post("/login", (req, res) => {
    const { username } = req.body;
    if (username) {
        const secret = generateSecret();
        const uuid = uuidv4();
        data.addUserinfo(uuid, { username });
        data.saveSecret({ username, secret });
        res.cookie("sid", uuid);
        res.redirect("/");
    }
});

app.post("/guess", (req, res) => {
    const { username, userGuess } = req.body;
    const compare = data.compare({ username, userGuess });
    if (compare === userGuess.length + 1) {
        const secret = generateSecret();
        data.updateSecret({ username, secret });
        res.send(guessWordWeb.startNewGame);
        return;
    } else if (compare !== -1) {
        data.addGuessHistory({ username, guess: userGuess, count: compare });
        res.send(
            guessWordWeb.guessWordPage({
                username,
                guessHistory: data.getGuessHistory({ username }),
                compare,
            })
        );
        return;
    }
    res.redirect("/");
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
