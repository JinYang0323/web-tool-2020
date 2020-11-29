const ul = document.querySelector('ul');
const status = document.querySelector('.status');

fetch('/people/', {
    method: 'GET',
    headers:{
        'content-type': 'application/json'
    }
})
.catch(err => status.innerText = err)
.then(response => {
    if(response.ok) {
        return response.json();
    }
    return response.json().then(err => Promise.reject(err));
})
.then( people => {
    const names = people.map(
        name => `<li key="${name}">${name}<button class="btn ${name}">X</button></li>`
    ).join('')
    ul.innerHTML = names;
})
.catch( err => status.innerText = err.error);

ul.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn')) {
        const name = e.target.classList[1]
        fetch(`/people/${name}/`, {method: 'DELETE'})
        .then(response => {
            if(response) {
                console.log("delete successfully", response);
            }
        })
    }
})