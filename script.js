const inputBox = document.getElementById("field");
const task = document.getElementById("task-list");

// Function for adding the task
function addTask() {
    let taskValue = inputBox.value.trim(); // Trim to remove extra spaces

    if (taskValue === '') {
        alert("Please enter a task!");
        return;
    }

    // Get existing tasks
    let existingTasks = [...task.children].map(li => li.firstChild.textContent.trim());

    // Check for duplicate
    if (existingTasks.includes(taskValue)) {
        alert("Task already exists!");
        inputBox.value = ""; // Clear input box
        return;
    }

    // Create new task element
    let li = document.createElement("li");
    li.textContent = taskValue;
    
    let span = document.createElement("span");
    span.textContent = "x";
    span.onclick = function () {
        li.remove();
        save();
    };

    li.appendChild(span);
    task.appendChild(li);
    
    inputBox.value = ""; // Clear input box
    save();
}

// For checking and removing the task
task.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        save();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        save();
    }
}, false);

function save() {
    let tasks = [...task.children].map(li => li.firstChild.textContent.trim());
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(taskValue => {
        let li = document.createElement("li");
        li.textContent = taskValue;

        let span = document.createElement("span");
        span.textContent = "x";
        span.onclick = function () {
            li.remove();
            save();
        };

        li.appendChild(span);
        task.appendChild(li);
    });
}


// Load tasks on page load
loadTasks();
