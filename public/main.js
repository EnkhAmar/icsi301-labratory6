const updateBtns = document.querySelectorAll(".update");
const container = document.querySelector(".employee-table");
const updateForm = document.querySelector("#update-form");

const employees = []


window.addEventListener("load", e => {
    fetch("/employee", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "GET"
    })
        .then(data => data.json())
        .then(res => {
            res.forEach(item => {
                container.innerHTML += addTodoElement(item.name, item.email, item.phone);
            })
        })
        .catch(err => {
            console.log(err);
        })
})

const updateEmployee = e => {
    const input = document.createElement("input")
    input.type = "hidden";
    input.name = "oldName";
    input.value = e.parentNode.parentNode.parentNode.childNodes[1].textContent
    updateForm.append(input)
}

const deleteEmployee = e => {
    fetch(`/employee/delete/${e.id}`, {
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
        <tr class="employee-item">
            <td>${name}</td>
            <td>${email}</td>
            <td>${phone}</td>
            <td>
                <div class="action">
                    <button class="action-btn" id=${name} data-bs-toggle="modal" data-bs-target="#editModal" onClick="updateEmployee(this)"><img src="pencil-square.svg" alt="edit"></button>
                    <button class="action-btn" id=${name} onClick="deleteEmployee(this)"><img src="trash.svg" alt="trash icon"></button>
                </div>
            </td>
        </tr>
    `
}