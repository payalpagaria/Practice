let taskInputList = [];
const storedTaskInputList = localStorage.getItem('taskInputList');
if (storedTaskInputList) {
    taskInputList = JSON.parse(storedTaskInputList);
}

const submitBtn = document.getElementById("btn");
let ulList = document.getElementById("list");
 
function onSubmit(){
    const taskTitleInput=document.getElementById("titleInput").value;
    const taskInput = document.getElementById("taskInput").value;
    console.log("title:",taskTitleInput);
    taskInputList.push({
        taskTitleInput,
        taskInput
    });
    taskInput.value = '';
    taskTitleInput.value=''; // Clear the input field
    saveTaskListToStorage();
    ulList.innerHTML='';


function saveTaskListToStorage() {
    localStorage.setItem('taskInputList', JSON.stringify(taskInputList));
}
}