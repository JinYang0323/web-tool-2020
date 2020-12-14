const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 5000;
const session = require('./session');
const chat = require('./chat');

app.use(cookieParser());
app.use(express.json());
app.use(express.static('./build'));

app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'session-required' });
        return;
    }
    if (!session.isValid(sid)) {
        res.status(403).json({ error: 'session-invalid' });
        return;
    }
    res.json(session.sessions[sid]);
});

app.post('/api/session', (req, res) => {
    const username = req.body.username;
    const { sid, error } = session.create({ username });
    if (error) {
        res.status(400).json(error);
        return;
    }
    res.cookie('sid', sid);
    res.json(session.users);
});

app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    session.remove(sid);
    res.clearCookie('sid');
    res.json(session.users);
});

app.get('/api/users', (req, res) => {
    res.json(session.users);
});

app.get('/api/messages', (req, res) => {
    res.json(chat.messages);
});

app.post('/api/messages', (req, res) => {
    const text = req.body.text;
    const sid = req.cookies.sid;
    chat.addMessage({ sender: session.getUsername(sid), text });
    res.json(chat.messages);
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
});
