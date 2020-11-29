const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const uuidv4 = require('uuid').v4;
const cookieParser = require('cookie-parser');
const PORT = 3000;

const { checkSid, addUser, items, addItem, updateItem, deleteItem } = require('./inventory');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./public'));

app.get('/', (req, res) => {
    const sid = req.cookies.sid;
    if(!sid || checkSid(sid)) res.redirect('/session')
})

app.post('/session', (req, res) => {
    const { username } = req.body;
    if(!username || username.includes("dog") || username.includes(" ")) {
        res.status(404).json({ error: `bad username: ${username}`});
    }
    else {
        const uuid = uuidv4();
        addUser({ sid: uuid, username });
        res.cookie('sid', uuid);
        res.redirect('/');
    }
});

app.get('/items/', (req, res) => {
    res.json(items)
});

app.post('/items/:itemid', express.json(), (req, res) => {
    const itemid = req.params.itemid;
    const quantity = req.body.quantity;
    console.log("update", itemid, quantity)
    if(!itemid) {
        res.status(400).json({ error: "'item' required"});
    }
    else if(!items[itemid]) {
        res.status(404).json({ error: `Unknown item: ${itemid}`});
    }
    else {
        updateItem(itemid, quantity);
        res.sendStatus(200);
    }
});

app.delete('/items/:itemid', express.json(), (req, res) => {
    const itemid = req.params.itemid;
    if(!itemid) {
        res.status(400).json({ error: "'item' required"});
    }
    else {
        deleteItem(itemid);
        res.sendStatus(200);
    }
})


app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));