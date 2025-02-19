window.onload = function () {
    displayTasks();
    /*
    let loggedIn = getCookie("loggedIn");
    if (!loggedIn) {
        window.location.href = "login.html";
    } else {
        displayTasks();
    }*/
};

let tasks = [];

function addTask() {
    let taskName = document.getElementById("taskName").value.trim();
    let dueDate = document.getElementById("dueDate").value;
    let priority = document.getElementById("priority").value;

    if (taskName === "" || dueDate === "") {
        alert("Please fill in all fields.");
        return;
    }

    tasks.push({ name: taskName, due: dueDate, priority: priority });
    displayTasks();

    document.getElementById("taskName").value = "";
    document.getElementById("dueDate").value = "";
    document.getElementById("priority").value = "Low";  // Set default priority value
}

document.querySelector("button").addEventListener("click", addTask);  // Attach event listener to the button directly

function displayTasks() {
    let todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";

    tasks.forEach((task, index) => {
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("task-item", task.priority);
        taskDiv.innerHTML = `
            <p><strong>${task.name}</strong></p>
            <p>Due: ${task.due}</p>
            <p>Priority: <span class="${task.priority}">${task.priority}</span></p>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        todoList.appendChild(taskDiv);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

function logout() {
    document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    window.location.href = "login.html";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
