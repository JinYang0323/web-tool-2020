(function () {
    
    let input = "";
    let index = 3;
    
    const ul = document.querySelector('ul');
    ul.addEventListener('click', (e) => {
        let count = document.querySelector(`.data-${e.target.classList[1]}`);
        if(e.target.classList.contains('minusBtn')) {
            count.innerText = parseInt(count.innerText) - 1;
            if(parseInt(count.innerText) === 0) e.target.disabled = true;
        }

        if(e.target.classList.contains('addBtn')) {
            count.innerText = parseInt(count.innerText) + 1;
            if(parseInt(count.innerText) !== 0) document.getElementsByClassName(`minusBtn ${e.target.classList[1]}`)[0].disabled = false;
        }

        if(e.target.classList.contains('deleteBtn')) {
            let li = document.getElementById(parseInt(e.target.classList[1]));
            li.parentNode.removeChild(li);
        }
    });

    const addItemBtn = document.querySelector('.addItem');
    const inputField = document.querySelector('input');
    
    addItemBtn.addEventListener('click', (e) => {
        let newItem = document.createElement('li');
        newItem.innerHTML = `<li key=${index} id="${index}">${input}<button class="minusBtn ${index}">-</button><span class="count data-${index}">1</span><button class="addBtn ${index}">+</button> <button class="deleteBtn ${index}">X</button></li>`;
        index++;
        ul.appendChild(newItem);
        inputField.value = "";
    });

    if(!inputField.value) {
        addItemBtn.disabled = true;
    }
    inputField.addEventListener('input', (e) => {
        input = e.target.value;
        if(input) addItemBtn.disabled = false;
        else addItemBtn.disabled = true;
    });

    
})();