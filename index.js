let taskInputList = [];
let taskInput = document.getElementById("taskInput");
let submitBtn = document.getElementById("btn");
let ulList = document.getElementById("list");
let taskDetails = document.createElement('p');

submitBtn.addEventListener('click', handleClick);

function handleClick() {
    taskInputList.push(taskInput.value);
    taskInput.value = ''; // Clear the input field

    ulList.innerHTML = '';

    showList();
}
function handleSwiperight(taskItem, index) {
    let touchStartX = 0;
    let touchEndX = 0;
  
    taskItem.addEventListener('touchstart', function (event) {
      touchStartX = event.touches[0].clientX;
    });
  
    taskItem.addEventListener('touchend', function (event) {
      touchEndX = event.changedTouches[0].clientX;
      if (touchEndX > touchStartX) {
        taskDetails.textContent=taskInputList[index];
      }
    });
   
  }
  
function handleDelete(index) {
    taskInputList.splice(index, 1);
    ulList.innerHTML = '';
    showList();
}

function handleUpdate(index) {
    let updateMsg = prompt('Enter the updated message:', taskInputList[index]);
    if (updateMsg) {
        taskInputList[index] = updateMsg;
        ulList.innerHTML = '';
        showList();
    }
}

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}
function handleSwipeLeft(taskItem, index) {
    let touchStartX = 0;
    let touchEndX = 0;

    taskItem.addEventListener('touchstart', function(event) {
        touchStartX = event.touches[0].clientX;
    });

    taskItem.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].clientX;
        if (touchEndX < touchStartX) {
            handleDelete(index);
        }
    });
}

function showList() {
    const maxLines = 1; // Maximum number of lines to display
    const maxCharsPerLine = 15; // Maximum number of characters per line
    for (let i = 0; i < taskInputList.length; i++) {
        let newLi = document.createElement('li');
        let newDel = document.createElement('button');
        let newUpdate = document.createElement('button');
        let taskHeading = document.createElement('h3');
        let taskName = document.createElement('label');
        taskHeading.textContent = `Task ${i + 1} :`;
        taskName.textContent = taskInputList[i];
        
        taskDetails.textContent = truncateText(taskInputList[i], maxCharsPerLine * maxLines);

        newDel.textContent = 'Delete';
        newUpdate.textContent = 'Update';

        ulList.appendChild(newLi);
        newLi.appendChild(taskHeading);
       // newLi.appendChild(taskName);
        newLi.appendChild(taskDetails);
        newLi.appendChild(newDel);
        newLi.appendChild(newUpdate);

        newDel.addEventListener('click', function() {
            handleDelete(i);
        });

        newUpdate.addEventListener('click', function() {
            handleUpdate(i);
        });
        
        // Swipe left gesture to delete task
        // Swipe left gesture to delete task
           handleSwipeLeft(newLi, i);
            handleSwiperight(newLi,i);
        // Click to expand/collapse task details
        let isExpanded = false;
        taskHeading.addEventListener('click', function() {
            if (isExpanded) {
                taskDetails.textContent = truncateText(taskInputList[i], maxCharsPerLine * maxLines);
                taskDetails.style.height = 'auto';
                isExpanded = false;
            } else {
                taskDetails.textContent = taskInputList[i];
                taskDetails.style.height = '5em';
                isExpanded = true;
            }
        });
    }
}
