console.log("This is chat.js");

const list = document.querySelector('.todos');
list.addEventListener('click', (e) => {
    if(e.target.classList.contains('todo')) {
        console.log('toggle');
        e.target.classList.toggle('complete');
    }
});
