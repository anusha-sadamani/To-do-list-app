const inputBox=document.getElementById("field");
const task=document.getElementById("task-list");

// function for adding the task
function addTask(){
    if(inputBox.value==''){
        alert("Please, enter the task!");
    }
     else {
        let li=document.createElement("li");
        li.innerHTML=inputBox.value;
        task.appendChild(li);
        let span=document.createElement("span");
        span.innerHTML="x";
        li.appendChild(span);

     }   
    
  inputBox.value="";
    save();
}

// for checking and removing the task
//When set to true, options's capture prevents callback from being invoked when the event's eventPhase attribute value is BUBBLING_PHASE. When false (or not present), callback will not be invoked when event's eventPhase attribute value is CAPTURING_PHASE. Either way, callback will be invoked if event's eventPhase attribute value is AT_TARGET.



task.addEventListener("click", function(e){
    if(e.target.tagName=== "LI"){
        e.target.classList.toggle("checked");
        save();
    }
    else if(e.target.tagName==="SPAN"){
        e.target.parentElement.remove();
        save();
    }
},false);



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
