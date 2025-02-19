window.onload = function () {
    let loggedIn = getCookie("loggedIn");

    if (window.location.pathname.includes("login.html") || window.location.pathname.includes("signup.html")) {
        if (loggedIn) {
            window.location.href = "todo.html";
        }
    } else if (window.location.pathname.includes("todo.html")) {
        if (!loggedIn) {
            window.location.href = "login.html";
        }
    }
};

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username && password) {
        setCookie("loggedIn", "true", 1);
        window.location.href = "todo.html"; 
    } else {
        alert("Please enter valid credentials!");
    }
}

function SignUp() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username && password) {
        setCookie("loggedIn", "true", 1); 
        window.location.href = "todo.html";
    } else {
        alert("Please enter valid credentials!");
    }
}


function showSignUp() {
    window.location.href = "signup.html";
}

function showLogIn() {
    window.location.href = "login.html";
}

function logout() {
    document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    window.location.href = "login.html";
}


function setCookie(name, value, days) {
    let d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
}

let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

function addTask() {
    let taskName = document.getElementById("taskName").value.trim();
    let dueDate = document.getElementById("dueDate").value;
    let priority = document.getElementById("priority").value;

    if (taskName === "" || dueDate === "") {
        alert("Please fill in all fields.");
        return;
    }

    tasks.push({ name: taskName, due: dueDate, priority: priority });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();

    document.getElementById("taskName").value = "";
    document.getElementById("dueDate").value = "";
    document.getElementById("priority").value = "Low";
}

function displayTasks() {
    let todoList = document.getElementById("todo-list");
    if (!todoList) return;
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
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}
