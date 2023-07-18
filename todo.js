document.addEventListener("DOMContentLoaded", () => {
    const ulList = document.getElementById("todoList");
    taskInputList = getTaskListFromStorage();

    showList();
});

let searchBtn=document.getElementById("searchBtn");

searchBtn.addEventListener('click',()=>{
    let searchInp=document.getElementById("searchInput");
    handleSearch(searchInp.value);
})
function handleSearch(searchText){
    let status=false;
    searchText = searchText.toLowerCase();

    for(let i=0;i<taskInputList.length;i++){
        const taskTitle = taskInputList[i].taskTitleInput.toLowerCase();
        if(taskTitle==searchText){
            showTaskDetails(i);
            status=true;
        }
    }
    if(!status){
       

    let errormsg=document.getElementById("search");
    errormsg.textContent="No Content Found"
   
    }
    
}
function getTaskListFromStorage() {
    const savedTaskList = localStorage.getItem('taskInputList');
    return savedTaskList ? JSON.parse(savedTaskList) : [];
}
function showTaskDetails(index) {
    // Store the selected task in LocalStorage (optional)
    localStorage.setItem('selectedTask', JSON.stringify(taskInputList[index]));

    // Open the taskDetails.html file in a new tab or window
    window.open('taskDetails.html', '_blank');
}
function saveTaskListToStorage() {
    localStorage.setItem('taskInputList', JSON.stringify(taskInputList));
}
function handleSwipeLeft(taskItem, index) {
    let touchStartX = 0;

    taskItem.addEventListener('touchstart', function (event) {
        touchStartX = event.touches[0].clientX;
    });

    taskItem.addEventListener('touchend', function (event) {
        let touchEndX = event.changedTouches[0].clientX;
        if (touchEndX < touchStartX) {
            // Swipe left action: Implement what you want to do when a swipe left occurs
            handleDelete(index);
        }
    });
}
function handleSwipeRight(taskItem, index) {
    let touchStartX = 0;

    taskItem.addEventListener('touchstart', function (event) {
        touchStartX = event.touches[0].clientX;
    });

    taskItem.addEventListener('touchend', function (event) {
        let touchEndX = event.changedTouches[0].clientX;
        if (touchEndX > touchStartX) {
            // Swipe right action: Implement what you want to do when a swipe right occurs
            // For example, you might want to show the full details of the task on a new page.
            showTaskDetails(index);
        }
    });
}


function handleDelete(index){
    taskInputList.splice(index, 1);
    saveTaskListToStorage();
    showList();



}
function handleUpdate(index){
    let newtaskinfo=prompt("Please Enter the msg",taskInputList[index]);
    if(newtaskinfo){
        taskInputList[index].taskInput=newtaskinfo;
    }
    saveTaskListToStorage();
    showList();
}
function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}
function showList() {
    let maxLines=1;
    let maxCharsPerLine=15;
    const ulList = document.getElementById("todoList");
    ulList.innerHTML='';

    for (let i = 0; i < taskInputList.length; i++) {
        const newLi = document.createElement('li');
        const heading=document.createElement('span');
        const Taskdiscription=document.createElement('p');
        const newdel=document.createElement('button');
        const newupdate=document.createElement('button');
        const arrow=document.createElement('span')
         newdel.textContent="Delete";
        newupdate.textContent="Update";
        arrow.textContent=">"
        arrow.classList.add('arr');
        heading.classList.add("head");
        Taskdiscription.classList.add('taskdics');
        heading.textContent=`${taskInputList[i].taskTitleInput}`;
        Taskdiscription.textContent=truncateText(taskInputList[i].taskInput, maxCharsPerLine * maxLines)
        ulList.appendChild(newLi);
        newLi.appendChild(heading);
        newLi.appendChild(arrow);
        newLi.appendChild(Taskdiscription);
        newLi.appendChild(newdel);
        newLi.appendChild(newupdate);
        heading.addEventListener('click', function() {
            showTaskDetails(i);
        });
        newdel.addEventListener('click',()=>{
            handleDelete(i);
        })
        newupdate.addEventListener('click',()=>{
            handleUpdate(i);
        })
        handleSwipeLeft(newLi, i);
        handleSwipeRight(newLi,i);
        arrow.addEventListener('click', function() {
            showTaskDetails(i);
        });
    }
}
