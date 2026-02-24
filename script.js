// 🔹 Add Task
function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value;

    if (task === "") {
        alert("Enter a task");
        return;
    }

    createTask(task, false);
    saveTasks();

    input.value = "";
}


// 🔹 Create Task (Reusable)
function createTask(taskText, isCompleted) {
    let li = document.createElement("li");

    // checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isCompleted;

    // text
    let span = document.createElement("span");
    span.textContent = taskText;
    span.classList.add("task-text");

    // apply completed style
    if (isCompleted) {
        span.style.textDecoration = "line-through";
    }

    // delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");

    // delete logic
    deleteBtn.onclick = function () {
        li.remove();
        saveTasks();
    };

    // checkbox logic
    checkbox.onchange = function () {
        if (checkbox.checked) {
            span.style.textDecoration = "line-through";
        } else {
            span.style.textDecoration = "none";
        }

        saveTasks();
    };

    // append elements
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);
}


// 🔹 Save Tasks to localStorage
function saveTasks() {
    let tasks = [];

    let listItems = document.querySelectorAll("#taskList li");

    listItems.forEach(li => {
        let text = li.querySelector("span").textContent;
        let completed = li.querySelector("input").checked;

        tasks.push({
            text: text,
            completed: completed
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// 🔹 Load Tasks on Page Load
function loadTasks() {
    let saved = localStorage.getItem("tasks");

    if (saved) {
        let tasks = JSON.parse(saved);

        tasks.forEach(task => {
            createTask(task.text, task.completed);
        });
    }
}


// 🔹 Enter Key Support
document.getElementById("taskInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});


// 🔹 Run when page loads
loadTasks();