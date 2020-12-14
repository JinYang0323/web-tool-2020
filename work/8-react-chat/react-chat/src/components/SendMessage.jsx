import { useState } from 'react';
import { endSession, sendNewMessage } from '../services';

const SendMessage = function (props) {
    const [message, setMessage] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [isPending, setIsPending] = useState(false);

    const onChange = (e) => {
        setMessage(e.target.value);
        setIsDisabled(!e.target.value);
    };

    const logout = () => {
        endSession()
            .then((users) => {
                props.onLogout(users);
            })
            .catch((err) => {
                console.error('ERROR logging out', err);
            });
    };

    const sendMessage = () => {
        setIsPending(true);
        sendNewMessage({ text: message })
            .then((response) => {
                setIsPending(false);
                setMessage('');
                props.setMessages(response);
            })
            .catch((err) => {
                console.error('ERROR adding new message', err);
                setIsPending(false);
            });
    };

    return (
        <div className='outgoing'>
            <input
                disabled={isPending}
                onChange={onChange}
                value={message}
                placeholder='Enter message to send'
            />
            <button onClick={sendMessage} disabled={isDisabled}>
                Send
            </button>
            <button className='logout' onClick={logout}>
                Logout
            </button>
        </div>
    );
};
export default SendMessage;
