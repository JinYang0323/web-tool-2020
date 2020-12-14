import React, { useState, useEffect } from 'react';

import {
    endSession,
    checkSession,
    getUserList,
    getMessageList,
} from './services';
import Login from './components/Login';
import SendMessage from './components/SendMessage';
import './App.css';

function App() {
    const [userState, setUserState] = useState({
        isLoggedIn: false,
        isPending: true,
    });
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState({});

    useEffect(() => {
        Promise.allSettled([
            getUserList(),
            getMessageList(),
            checkSession(),
        ]).then((resultArr) => {
            if (resultArr[0].status === 'fulfilled') {
                setUsers(resultArr[0].value);
            }
            if (resultArr[1].status === 'fulfilled') {
                setMessages(resultArr[1].value);
            }
            if (resultArr[2].status === 'fulfilled') {
                setUserState({
                    isLoggedIn: true,
                    isPending: false,
                    username: resultArr[2].value.username,
                });
            } else {
                setUserState({
                    isLoggedIn: false,
                    isPending: false,
                });
            }
        });
    }, []);

    const login = function ({ username }) {
        setUserState({
            isLoggedIn: true,
            isPending: false,
            username,
        });
    };

    const logout = function (users) {
        setUserState({
            isLoggedIn: false,
            isPending: false,
        });
        setUsers(users);
    };

    if (userState.isPending) {
        return <div className='app'>Loading...</div>;
    }

    const messageList = () => {
        return (
            <ol className='messages'>
                {messages.map((message, index) => (
                    <li key={index}>
                        <div className='message'>
                            <div className='meta-info'>
                                <div className='sender-info'>
                                    <span className='username'>
                                        {message.sender}
                                    </span>
                                </div>
                                <div className='message-info'>
                                    <span className='timestamp'>
                                        {message.timestamp}
                                    </span>
                                </div>
                            </div>
                            <p className='message-text'>{message.text}</p>
                        </div>
                    </li>
                ))}
            </ol>
        );
    };

    const userList = () => {
        return (
            <ul className='users'>
                {Object.values(users).map((user) => (
                    <li key={user.username}>
                        <div className='user'>
                            <span className='username'>{user.username}</span>
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    const getOutgoing = () => {
        if (userState.isLoggedIn) {
            return (
                <SendMessage
                    username={userState.username}
                    onLogout={logout}
                    setMessages={setMessages}
                />
            );
        }
        return <Login onLogin={login} setUsers={setUsers} />;
    };

    return (
        <div id='chat-app'>
            <div className='display-panel'>
                {userList()}
                {messageList()}
            </div>
            {getOutgoing()}
        </div>
    );
}

export default App;
