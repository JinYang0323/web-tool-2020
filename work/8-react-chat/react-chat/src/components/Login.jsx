import { useState } from 'react';
import { createSession } from '../services';
import { errorMessages } from '../errorMessages';

const Login = function (props) {
    const [username, setUsername] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [isPending, setIsPending] = useState(false);
    const [status, setStatus] = useState('');

    const onChange = (e) => {
        setStatus('');
        setUsername(e.target.value);
        setIsDisabled(!e.target.value);
    };

    const login = () => {
        setIsPending(true);
        createSession({ username })
            .then((users) => {
                props.onLogin({ username });
                setStatus('');
                setIsPending(false);
                props.setUsers(users);
            })
            .catch((err) => {
                setUsername('');
                setStatus(errorMessages[err]);
                setIsPending(false);
            });
    };

    return (
        <div className='login-panel'>
            {status && <div class='status'>{status}</div>}
            <label>
                Username:
                <input
                    disabled={isPending}
                    onChange={onChange}
                    value={username}
                />
            </label>
            <button onClick={login} disabled={isDisabled || isPending}>
                {isPending ? '...' : 'Login'}
            </button>
        </div>
    );
};
export default Login;
