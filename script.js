const inputBox=document.getElementById("field");
const task=document.getElementById("task-list");

//funtion for createTaskElement

function createTaskElement(taskValue){
     let li = document.createElement("li");
     li.textContent=taskValue;
     let span =document.createElement("span");
     span.textContent="x";
     li.appendChild(span);
     return li;
}

//function for addTask

function addTask(){
      let taskValue =inputBox.value;
      if(taskValue===""){
        alert("Please, Enter a Task!");
        return;
      }
      let existingTask=[...task.children].map(li=>li.firstChild.textContent.trim());
      if(existingTask.includes(taskValue)){
        alert("Task already exists!");
        inputBox.value="";
        return;
      }
     let li =createTaskElement(taskValue);
     task.appendChild(li);
     inputBox.value="";
     save();

}

// function for checking and removing

task.addEventListener("click",function(e){
    if(e.target.tagName==="LI"){
        e.target.classList.toggle("checked");
        save();
    }
    else if(e.target.tagName==="SPAN"){
        e.target.parentElement.remove();
        save()
    }
});

// function for saving the task

function save(){
    let tasks=[...task.children].map(li=>li.firstChild.textContent.trim());
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

// function for show items

function loadTasks(){
   let tasks=JSON.parse(localStorage.getItem("tasks")) || [];
   tasks.forEach(taskValue => { 
    let li=createTaskElement(taskValue);
    task.appendChild(li);
    
   });
}
loadTasks();