const express = require('express');
const uuidv4 = require('uuid').v4;
const app = express();

// express "middleware", this time as an extra library
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const userinfo = {};

const isValid = (sid) => {
    if(userinfo[sid]) return true;
    return false;
}

// (skipping over other express stuff)
app.get("/", (req, res) => {

    const sid = req.cookies.sid;

    if(!sid || !isValid(sid)) {
        res.send(`
        <form action="/login" method="POST">
            <input name="username">
	    <button type="submit">Login</button>
        </form>
       `);
        return;
    }
    console.log(userinfo);
    res.send(`hello ${ userinfo[sid].username }`);
}); 


app.post('/login', (req, res) => {
    const { username } = req.body;

    if(username && username !== "dog") {
        const uuid = uuidv4();
        userinfo[uuid] = {
            username,
        };
        res.cookie('sid', uuid);
        res.redirect('/');
    }    
});

app.listen(3000, () => console.log(`http://localhost:3000`));
