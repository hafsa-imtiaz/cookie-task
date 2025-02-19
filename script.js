window.onload = function () {
    let loggedIn = getCookie("loggedIn");
    if (!loggedIn) {
        window.location.href = "login.html";
    }
};

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username && password) { // TODO: Add real authentication later
        setCookie("loggedIn", "true", 1);
        window.location.href = "todo.html"; // Redirects to the To-Do page
    } else {
        alert("Please enter valid credentials!");
    }
}

// Helper function to set cookies
function setCookie(name, value, days) {
    let d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000)); // Cookie expiration time
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Helper function to get a cookie value
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
}

// Logout function
function logout() {
    document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    window.location.href = "login.html";
}

// Only call `displayTasks()` inside `todo.html`
if (window.location.pathname.includes("todo.html")) {
    document.addEventListener("DOMContentLoaded", displayTasks);
}

// Add a task to the list
function addTask() {
    let taskInput = document.getElementById("task");
    let task = taskInput.value.trim();
    if (task) {
        let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
        taskInput.value = '';  // Clear input field
    }
}

// Display tasks from localStorage
function displayTasks() {
    let todoList = document.getElementById("todo-list");
    if (!todoList) return; // Prevent errors if the element is missing
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    todoList.innerHTML = '';
    tasks.forEach(task => {
        let taskDiv = document.createElement("div");
        taskDiv.textContent = task;
        todoList.appendChild(taskDiv);
    });
}
