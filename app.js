
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const work = $('input[type="text"]'),
    add = $('input[type="submit"]'), 
    num = $('p'),
    list = $('.list');
var id=0, storageKey = "toDoList";
var dataString = localStorage.getItem(storageKey);
var listData;
if(dataString) {
    listData = JSON.parse(dataString);
    if(listData.length !== 0)
        id = listData[listData.length-1].id;
} else {
    listData = [];
}


num.innerHTML = `Total: ${listData.length}`;

function handleDelete(id) {
    listData = listData.filter((item) => item.id!==id);
    localStorage.setItem(storageKey, JSON.stringify(listData));
    $(`.list-item-${id}`).remove();
    num.innerHTML = `Total: ${listData.length}`;
    console.log(listData);
}

function render() {
    let content = listData.map((item) => {
        return `
            <li class="list-item-${item.id}">
                <div>${item.value}</div>
                <button onclick="handleDelete(${item.id})"><i class="fa-regular fa-trash-can"></i></button>
            </li>
        `;
    });
    list.innerHTML = content.join('');
}

render();

add.onclick = function() {
    if(listData.length === 0)
        id=0;
    if(work.value.trim()==='')
        return;
    ++id;
    // list.innerHTML += `
    //     <li class="list-item-${id}">
    //         <div>${work.value}</div>
    //         <button onclick="$('.list-item-${id}').remove()"><i class="fa-regular fa-trash-can"></i></button>
    //     </li>
    // `;
    let data = {
        id,
        value: work.value
    }
    listData.push(data);
    render();
    work.value = '';
    num.innerHTML = `Total: ${listData.length}`;
    
    //Luu vao localStorage
    localStorage.setItem(storageKey, JSON.stringify(listData));
    console.log(listData);
}



