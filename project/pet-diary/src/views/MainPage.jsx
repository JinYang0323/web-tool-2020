import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import logo from "../components/logo.png";
import ExpensePage from "./ExpensePage";
import ProfilePage from "./ProfilePage";
import EncyclopediaPage from "./EncyclopediaPage";
import Loader from "../components/Loader";
import { checkLoginStatus, performLogout } from "../services";
import { logout } from "../components/icons";

const MainPage = (props) => {
    const history = useHistory();
    const [view, setView] = useState(props.view);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        checkLoginStatus()
            .then(() => {
                setIsLoggedIn(true);
            })
            .catch(() => {
                setIsLoggedIn(false);
                history.push("/login");
            });
    });

    const onLogout = () => {
        performLogout().then(() => {
            setIsLoggedIn(false);
            history.push("/login");
        });
    };

    const goToView = (view) => {
        setView(view);
        history.push(`/${view}`);
    };

    if (!isLoggedIn) return <Loader />;

    return (
        <div>
            <div className="main-nav">
                <img className="main-nav-logo" src={logo} />
                <span className="main-nav-logo-label">PetDiary</span>
                <ul>
                    <li
                        className={
                            view === "profile"
                                ? "main-nav-title-selected"
                                : "main-nav-title"
                        }
                        onClick={() => goToView("profile")}
                    >
                        Profile
                    </li>
                    <li
                        className={
                            view === "expenses"
                                ? "main-nav-title-selected"
                                : "main-nav-title"
                        }
                        onClick={() => goToView("expenses")}
                    >
                        Expenses
                    </li>
                    <li
                        className={
                            view === "encyclopedia"
                                ? "main-nav-title-selected"
                                : "main-nav-title"
                        }
                        onClick={() => goToView("encyclopedia")}
                    >
                        Encyclopedia
                    </li>
                </ul>
                <span className="main-nav-logout" onClick={onLogout}>
                    Logout {logout}
                </span>
            </div>
            <div className="main-content">
                {view === "profile" ? (
                    <div>
                        <ProfilePage />
                    </div>
                ) : null}
                {view === "expenses" ? (
                    <div>
                        <ExpensePage />
                    </div>
                ) : null}
                {view === "encyclopedia" ? (
                    <div>
                        <EncyclopediaPage />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default MainPage;
