const express = require('express');
const app = express();
const PORT = 3000;

const people = {
    amit: 'likes cat',
    bao:'loves cats',
    noone: 'prefers dogs',
};

app.use(express.static('./public'));

app.get('/people/', (req, res) => {
    res.json(Object.keys(people))
});

app.get('/people/:name/', (req, res) => {
    const name = req.params.name;
    if(people[name]) {
        res.json(people[name]);
    } else {
        res.status(404).json({ error: `Unknown user: ${name}`});
    }
});

app.post('/people/:name/', express.json(), (req, res) => {
    const name = req.body.name;
    if(!name) {
        res.status(400).json({ error: "'name' required"});
    }
    else if(people[name]) {
        res.status(409).json({ error: `duplicate: ${name}`});
    }
    else {
        people[name] = req.body;
        res.sendStatus(200);
    }
});

app.delete('/people/:name/', express.json(), (req, res) => {
    const name = req.body.name;
    if(!name) {
        res.status(400).json({ error: "'name' required"});
    }
    else {
        delete people[name];
        res.sendStatus(200);
    }
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
