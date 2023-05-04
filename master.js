const form = document.getElementById("form");
const text = document.getElementById("text");
const main = document.getElementById("main");
let arr = [];

form.onsubmit = function (e) {
    e.preventDefault();
    let task = text.value;
    if (task) {
        getTask(task);
        text.value = "";
    }
}

main.addEventListener("click", function (e) {
    if (e.target.classList.contains("del")) {
        e.target.parentElement.remove();
        deletTasksfromLocal(e.target.parentElement.getAttribute("data-id"));
    }
    if (e.target.classList.contains("card")) {
        toggleLocal(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done"); 
    }
})

getElementfromLocal();

if (localStorage.getItem("task")) {
    arr=JSON.parse(localStorage.getItem("task"));
}
function getTask(task) {
    let tasks = {
        title: task,
        CompletionEvent: false,
        id:Date.now()
    };
    arr.push(tasks);
    addElementToBage(arr);
    addElementTOloacl(arr)
}

function addElementToBage(arr) {
    main.innerHTML = "";
    arr.forEach(task => {
        let div = document.createElement("div");
        div.classList.add("card");
        div.setAttribute("data-id",task.id)
    let p = document.createElement("p");
        let btn = document.createElement("button");
        if (task.CompletionEvent === true) {
            div.className = "card done";
        }
    btn.classList.add("del");
    p.classList.add("title");
    btn.textContent = "X";
    p.appendChild(document.createTextNode(task.title));
    div.appendChild(p);
    div.appendChild(btn);
    main.appendChild(div);
    });
    
    
}
// localStorage.clear()

function addElementTOloacl(task) {
    window.localStorage.setItem("task", JSON.stringify(task));
}

function getElementfromLocal() {
    let date = window.localStorage.getItem("task");
    if (date) {
        let newTasks = JSON.parse(date);
        addElementToBage(newTasks)
    }
}

function deletTasksfromLocal(taskId) {
    arr = arr.filter((task) => task.id != taskId);
    addElementTOloacl(arr);
}
function toggleLocal(taskId) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == taskId) {
            arr[i].CompletionEvent == false?(arr[i].CompletionEvent = true):(arr[i].CompletionEvent = false);
        }
        
    }
    addElementTOloacl(arr)
}









