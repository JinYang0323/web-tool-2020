const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 5000;
const session = require("./backend/session");
const expenses = require("./backend/expenses");
const profile = require("./backend/profile");
const breed = require("./backend/breed");
const vaccines = require("./backend/vaccines");

app.use(cookieParser());
app.use(express.json());
app.use(express.static("./build"));

app.get("/api/session", (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: "session-required" });
        return;
    }
    if (!session.isValidSession(sid)) {
        res.status(403).json({ error: "session-invalid" });
        return;
    }
    res.json(session.getSessionInfo(sid));
});

app.post("/api/session", (req, res) => {
    const username = req.body.username;
    const { sid, error } = session.createUser({ username });
    if (error) {
        res.status(400).json(error);
        return;
    }
    res.cookie("sid", sid);
    res.json("logged in");
});

app.delete("/api/session", (req, res) => {
    const sid = req.cookies.sid;
    session.removeSession(sid);
    res.clearCookie("sid");
    res.json("session deleted");
});

app.get("/api/profile", (req, res) => {
    const sid = req.cookies.sid;
    if (!sid || !session.isValidSession(sid)) {
        res.status(401).json({ error: "login-required" });
        return;
    }
    const username = session.getSessionInfo(sid).username;
    breed
        .getBreeds()
        .then((breeds) =>
            res.json({ breeds, profile: profile.getProfile(username) })
        );
});

app.post("/api/profile", (req, res) => {
    const { name, type, breed, gender, weight } = req.body;
    const sid = req.cookies.sid;
    if (!sid || !session.isValidSession(sid)) {
        res.status(401).json({ error: "login-required" });
        return;
    }
    const username = session.getSessionInfo(sid).username;
    profile.updateProfile({ username, name, type, breed, gender, weight });
    res.json(profile.getProfile(username));
});

app.get("/api/expenses", (req, res) => {
    const sid = req.cookies.sid;
    if (!sid || !session.isValidSession(sid)) {
        res.status(401).json({ error: "login-required" });
        return;
    }
    const username = session.getSessionInfo(sid).username;
    res.json(expenses.getExpenses(username));
});

app.post("/api/expenses", (req, res) => {
    const { date, cost, category, notes } = req.body;
    const sid = req.cookies.sid;
    if (!sid || !session.isValidSession(sid)) {
        res.status(401).json({ error: "login-required" });
        return;
    }
    const username = session.getSessionInfo(sid).username;

    res.json(expenses.addExpenses(username, date, cost, category, notes));
});

app.get("/api/encyclopedia", (req, res) => {
    const sid = req.cookies.sid;
    if (!sid || !session.isValidSession(sid)) {
        res.status(401).json({ error: "login-required" });
        return;
    }
    const username = session.getSessionInfo(sid).username;
    const userProfile = profile.getProfile(username);
    const vaccineInfo = vaccines.getVaccineInfo();
    breed
        .getBreedInfo(userProfile.breed, userProfile.type)
        .then((breedInfo) => {
            res.json({
                breedInfo,
                vaccineInfo,
            });
        });
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
});
