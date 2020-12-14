export const checkLoginStatus = () => {
    return fetch("/api/session", {
        method: "GET",
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((json) => Promise.reject(json));
        })
        .catch((err) => Promise.reject(err));
};

export const performLogin = ({ username }) => {
    return fetch("/api/session", {
        method: "POST",
        headers: new Headers({
            "content-type": "application/json",
        }),
        body: JSON.stringify({ username }),
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((json) => Promise.reject(json));
        })
        .catch((err) => Promise.reject(err));
};

export const performLogout = () => {
    return fetch("/api/session", {
        method: "DELETE",
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((json) => Promise.reject(json));
        })
        .catch((err) => Promise.reject(err));
};

export const performGetProfile = () => {
    return fetch("/api/profile")
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((json) => Promise.reject(json));
        })
        .catch((err) => Promise.reject(err));
};

export const performUpdateProfile = ({ name, type, breed, gender, weight }) => {
    return fetch("/api/profile", {
        method: "POST",
        headers: new Headers({
            "content-type": "application/json",
        }),
        body: JSON.stringify({ name, type, breed, gender, weight }),
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((json) => Promise.reject(json));
        });
};

export const performGetEncyclopedia = () => {
    return fetch("/api/encyclopedia")
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((json) => Promise.reject(json));
        })
        .catch((err) => Promise.reject(err));
};

export const performGetExpenses = () => {
    return fetch("/api/expenses")
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((json) => Promise.reject(json));
        })
        .catch((err) => Promise.reject(err));
};

export const performAddExpenses = ({ date, cost, category, notes }) => {
    return fetch("/api/expenses", {
        method: "POST",
        headers: new Headers({
            "content-type": "application/json",
        }),
        body: JSON.stringify({ date, cost, category, notes }),
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((json) => Promise.reject(json));
        })
        .catch((err) => Promise.reject(err));
};
