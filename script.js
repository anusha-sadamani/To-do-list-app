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

// For saving the data

function save(){
    localStorage.setItem("data",task.innerHTML);
}

// for showing the data

function show(){
    task.innerHTML=localStorage.getItem("data");
}

show();