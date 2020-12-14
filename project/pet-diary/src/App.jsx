import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import MainPage from "./views/MainPage";
import LoginPage from "./views/LoginPage";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/profile">
                    <MainPage view="profile" />
                </Route>
                <Route path="/expenses">
                    <MainPage view="expenses" />
                </Route>
                <Route path="/encyclopedia">
                    <MainPage view="encyclopedia" />
                </Route>
                <Route>
                    <MainPage view="profile" />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
