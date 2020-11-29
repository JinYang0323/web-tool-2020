"use strict";

(function iife() {
    // if log in success fully, do not show login class
    const loginEl = document.querySelector('.login');
    const loginBtn = document.querySelector('.login button');
    const loginStatusEl = document.querySelector('.login-status');
    const inventoryEl = document.querySelector('.inventory');
    const itemsListEl = document.querySelector('.items');
    const inventoryStatusEl = document.querySelector('.inventory-status'); 
    const logoutBtn = document.querySelector('.logout');

    function checkLoginStatus() {
        fetch('/', {
            method: 'GET',
            headers:{
                'content-type': 'application/json'
            }
        })
        .catch(err => loginStatusEl.innerText = 'bad login')
        .then(response => {
            if(response.ok) {
                loginEl.classList.add('hide');
                inventoryEl.classList.remove('hide');
            }
            else {
                loginEl.classList.remove('hide');
                inventoryEl.classList.add('hide');
                disableloginButtonIfNoInput();
            }
        })
    }

    function disableloginButtonIfNoInput() {
        const loginInputEl = document.querySelector('.login input');
        loginInputEl.addEventListener('input', () => {
            loginBtn.disabled = !loginInputEl.value;
        })
    }

    function renderList() {
        fetch('/items', {
            method: 'GET',
            headers:{
                'content-type': 'application/json'
            }
        })
        .catch(err => inventoryStatusEl.innerText = err)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            return response.json().then(err => Promise.reject(err));
        })
        .then( items => {
            const itemList = Object.keys(items).map(
                itemid => `
                <li key="${itemid}">
                    ${items[itemid].name}
                    <input class="input-${itemid}" value=${parseInt(items[itemid].quantity)}>
                    <button class="update-btn ${itemid}">update</button>
                    <button class="delete-btn ${itemid}">X</button>
                </li>`
            ).join('')
            itemsListEl.innerHTML = itemList;
        })
        .catch( err => inventoryStatusEl.innerText = err.error);
    }

    itemsListEl.addEventListener('click', (e) => {
        if(e.target.classList.contains('update-btn')) {
            const itemid = e.target.classList[1];
            const value = document.querySelector(`.input-${itemid}`).value;
            fetch(`/items/${itemid}`, {
                method: 'POST',
                headers:{
                    'content-type': 'application/json'
                },
                body:{
                    'quantity': JSON.stringify(value) 
                }
            })
            .then(response => {
                if(response.ok) {
                    renderList();
                    inventoryStatusEl.innerText = '';
                }
                else {
                    inventoryStatusEl.innerText = response.statusText;
                }
            })
            .catch(err => inventoryStatusEl.innerText = err)
        }
        else if(e.target.classList.contains('delete-btn')) {
            const itemid = e.target.classList[1];
            fetch(`/items/${itemid}`, {
                method: 'DELETE',
                headers:{
                    'content-type': 'application/json'
                }
            })
            .then(response => {
                if(response.ok) {
                    renderList();
                    inventoryStatusEl.innerText = '';
                }
                else {
                    inventoryStatusEl.innerText = response.statusText;
                }
            })
            .catch(err => inventoryStatusEl.innerText = err)
        }
    });

    logoutBtn.addEventListener('click', (e) => {
        fetch('/session', { 
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            }
        })
    })

    checkLoginStatus();
    disableloginButtonIfNoInput();
    renderList();
})();