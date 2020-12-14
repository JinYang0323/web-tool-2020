export const checkSession = () => {
    return fetch('/api/session', {
        method: 'GET',
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((json) => Promise.reject(json));
        });
};

export const createSession = ({ username }) => {
    return fetch('/api/session', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ username }),
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((json) => Promise.reject(json));
        });
};

export const endSession = () => {
    return fetch('/api/session', {
        method: 'DELETE',
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((json) => Promise.reject(json));
        });
};

export const getUserList = () => {
    return fetch('/api/users', {
        method: 'GET',
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (response.ok) return response.json();
            else return response.json().then((json) => Promise.reject(json));
        });
};

export const getMessageList = () => {
    return fetch('/api/messages', {
        method: 'GET',
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (response.ok) return response.json();
            else return response.json().then((json) => Promise.reject(json));
        });
};

export const sendNewMessage = ({ text }) => {
    return fetch('/api/messages', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ text }),
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then((response) => {
            if (response.ok) return response.json();
            else return response.json().then((json) => Promise.reject(json));
        });
};
