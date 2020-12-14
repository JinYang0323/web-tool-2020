import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { performLogin } from "../services";
import { useHistory } from "react-router-dom";
import { errorMessages } from "../errorMessages";
import logo from "../components/logo.png";

const LoginPage = (props) => {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState("");

    const onChange = (e) => {
        setStatus("");
        setUsername(e.target.value);
        setIsDisabled(!e.target.value);
    };

    const onKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            login();
        }
    };

    const login = () => {
        setIsLoading(true);
        performLogin({ username })
            .then(() => {
                setStatus("");
                history.push("/");
            })
            .catch((err) => {
                setUsername("");
                setStatus(`${errorMessages[err] || "Please try again"}`);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    return (
        <div className="login-page">
            <div className="login-page-logo-panel">
                <img src={logo} />
                <span className="login-page-logo-panel-label">PetDiary</span>
            </div>
            <div className="login-page-prompt-panel">
                Sign in to PetDiary with username
            </div>
            <div className="login-page-input-panel">
                <input
                    className="login-page-input"
                    placeholder="username"
                    disabled={isLoading}
                    onChange={onChange}
                    value={username}
                    onKeyPress={onKeyPress}
                />
            </div>
            <div className="login-page-login-panel">
                <button onClick={login} disabled={isDisabled || isLoading}>
                    {isLoading ? "..." : "login"}
                </button>
            </div>
            {status && <div class="error-panel">{status}</div>}
        </div>
    );
};

export default withRouter(LoginPage);
