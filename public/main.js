const button = document.querySelector(".add-btn");
const updateBtns = document.querySelectorAll(".upd");
const todoContainer = document.querySelector(".todo-container");

const employees = []

window.addEventListener("load", e => {
    fetch("/todo", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "GET"
    })
        .then(data => data.json())
        .then(res => {
            res.forEach(item => {
                todoContainer.innerHTML += addTodoElement(item.name, item.email, item.phone);
            })
        })
        .catch(err => {
            console.log(err);
        })
})

button.addEventListener("click", e => {
    let name = prompt("Name");
    let email = prompt("Email");
    let phone = prompt("Phone");
    console.log({ name, email, phone });
    fetch("/todo/add", {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, phone }),
        method: "POST"
    })
        .then(data => data.json())
        .then(res => {
            todoContainer.innerHTML += addTodoElement(name, email, phone);
        })
        .catch(err => {
            console.log(err);
        })
})

const updateTodo = e => {
    let name = prompt("Name");
    let email = prompt("Email");
    let phone = prompt("Phone");
    fetch(`/todo/upd/${e.id}`, {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, phone }),
        method: "PUT"
    })
        .then(data => data.json())
        .then(res => {
            e.parentNode.parentNode.parentNode.childNodes[1].textContent = name
            e.parentNode.parentNode.parentNode.childNodes[3].textContent = email
            e.parentNode.parentNode.parentNode.childNodes[5].textContent = phone
        })
        .catch(err => {
            console.log(err);
        })
}

const deleteTodo = e => {
    fetch(`/todo/del/${e.id}`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "DELETE"
    })
        .then(data => data.json())
        .then(res => {
            e.parentNode.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode.parentNode)
        })
        .catch(err => {
            console.log(err);
        })
}

const addTodoElement = (name, email, phone) => {
    return `
        <tr class="todo-item">
            <td>${name}</td>
            <td>${email}</td>
            <td>${phone}</td>
            <td>
                <div class="action">
                    <button class="action-btn" id=${name} onClick="updateTodo(this)"><img src="edit.png" alt=""></button>
                    <button class="action-btn" id=${name} onClick="deleteTodo(this)"><img src="delete.png" alt=""></button>
                </div>
            </td>
        </tr>
    `
}