const inputBox = document.getElementById("field");
const task = document.getElementById("task-list");

// function to create task element
function createTaskElement(taskValue, Checked = false) {
  let li = document.createElement("li");
  li.textContent = taskValue;
  if (Checked === true) {
    li.classList.add("checked");
  }
  let span = document.createElement("span");
  span.textContent = "x";
  li.appendChild(span);
  return li;
}

// function to add task
function addTask() {
  let taskValue = inputBox.value;
  if (taskValue === "") {
    alert("Please, Enter a Task!");
  }

  let existingTask = [...task.children].map((li) => li.firstChild.textContent);
  if (existingTask.includes(taskValue)) {
    alert("Task already exists!");
    inputBox.value = "";
  }

  let li = createTaskElement(taskValue);
  task.appendChild(li);
  inputBox.value = "";
  save();
}

// function to check or remove
task.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    save();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    save();
  }
});

// function to save tasks
function save() {
  let tasks = [...task.children].map((li) => {
    return {
      text: li.firstChild.textContent,
      checked: li.classList.contains("checked"),
    };
  });
  //  let children = task.children;
  // //   //  let task = [];
  // //   //  for(i=0;i<=children.length;i++){
  // //   //   task.push(children[i].firstChild.textContent);
  // //   //  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// function to load tasks
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((taskValue) => {
    let li = createTaskElement(taskValue.text, taskValue.checked);
    task.appendChild(li);
  });
}

loadTasks();
