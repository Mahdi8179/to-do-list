// let inputbx = document.getElementById('inputBx');
// let list = document.getElementById('list');


// inputbx.addEventListener('keyup', function(event){
//     if(event.key == 'Enter'){
//         addItem(this.value);
//         this.value = '';
//     }
// });


// let addItem = (inputBx) => {
//     let listItem = document.createElement('li');
//     listItem.innerHTML = `${inputBx} <i></i>`;
//     listItem.addEventListener('click', function(){
//         this.classList.toggle('done');
//     });
//     listItem.querySelector('i').addEventListener('click', function(){
//         listItem.remove();
//     })

//     list.appendChild(listItem)
// }



let inputbx = document.getElementById('inputBx');
let list = document.getElementById('list');

inputbx.addEventListener('keyup', function(event){
    if(event.key == 'Enter'){
        addItem(this.value);
        saveItems();
        this.value = '';
    }
});

let addItem = (input) => {
    let listItem = document.createElement('li');
    listItem.innerHTML = `${input} <i></i>`;
    listItem.addEventListener('click', function(){
        this.classList.toggle('done');
        saveItems();
    });
    listItem.querySelector('i').addEventListener('click', function(){
        listItem.remove();
        saveItems();
    });

    list.appendChild(listItem);
}

let saveItems = () => {
    let items = [];
    document.querySelectorAll('#list li').forEach(item => {
        items.push({
            text: item.firstChild.textContent.trim(),
            done: item.classList.contains('done')
        });
    });
    localStorage.setItem('todoList', JSON.stringify(items));
}

let loadItems = () => {
    let items = JSON.parse(localStorage.getItem('todoList')) || [];
    items.forEach(item => {
        addItem(item.text);
        if (item.done) {
            list.lastChild.classList.add('done');
        }
    });
}

inputbx.addEventListener("input",() =>{
    const persianRegex = /[\u0600-\u06FF]+/g;
    if(persianRegex.test(inputbx.value)){
        inputbx.setAttribute("dir", "rtl");
    } else{
        inputbx.setAttribute("dir", "ltr")
    }
})

// Load items from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadItems);