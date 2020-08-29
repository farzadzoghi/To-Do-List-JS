let tasks = [];     //array to save tasks                                                                           
const addButton = document.querySelector(".new-input__submit");     //get add button element
addButton.addEventListener("click", addNewText);        //on-click event for add button

// ##################################################################### //
// ############################ functions ############################## //
// ##################################################################### //

// call when add button is clicked
function addNewText(event){
    event.preventDefault();     //page doesn't refresh
    let newInput = document.querySelector(".new-input__text");      //input text of new task
    createNewTask(newInput);       //creates a new task in the array and displays it on the page
    newInput.value = "";        //clear the input 
}

//creates a new task in the array and displays it on the page
function createNewTask(input){
    if(input.value){                    //check if the input is not null
        task = {                        //a task object with 3 properties
            id: tasks.length + 1,
            name: input.value,
            completed: false
        };
        tasks.push(task);       //add to the array          
        displayInList(task);    //display the task on the page
    }
}

//display the task on the page
function displayInList(task){
    let li =                                                                                        //a list item for the new task with unique id
    `<li class="tasks__item row mt-3" id="item-${task.id}">                                         
        <span class="tasks__item-id col-2">${task.id}</span> 
        <span class="tasks__item-name col-6">${task.name}</span>
        <input type="checkbox" id="task-${task.id}-done" name="task-${task.id}-done" value="task-${task.id}-done" class="tasks__item-done col-2">
        <a href="#" class="tasks__item-delete col-2"><i class="fas fa-trash-alt"></i></a>
    </li>`;

    document.querySelector(".tasks__list").innerHTML += li;     //add the task to the list
    setTimeout(() => {fadeItem(task.id)}, 200);     //wait 200ms then call the fadeItem function to add fade-in to the new task
    addDeleteEvent();       //add event for all the trash icons in the task cards                         
    addDoneEvent();     //add event for all the checkbox inputs in the task cards
}

//add fade-in to the new task
function fadeItem(id){
    let newItem = document.querySelector(`#item-${id}`);        //get the task list element
    newItem.style.transition = "all 0.5s ease-in";          //set transition
    newItem.style.opacity = 1;      //set opacity to 1 to show the task
}

//add event for all the trash icons in the task cards 
function addDeleteEvent(){
    for(let k = 0; k < tasks.length; k++){
        let newItem = document.querySelector(`#item-${k+1} i`); //select icon elements in the task card
        newItem.addEventListener("click", deleteItem);      //add on-click event for delete icon
    }
}

//gets element id of the task and removes it
function deleteItem(event){
    const itemId = Number(event.target.parentElement.parentElement.id.slice(5));    //a task's id is like "item-1". it gets the id and removes the first 5 character (item-) to get the id number
    let selectedItem = document.querySelector(`#item-${itemId}`);       //select the task element
    deleteAnimation(itemId);        //add animation before removing the html element
    setTimeout(() => {deleteItemFromList(selectedItem, itemId)}, 500);  //wait 500ms then delete the item from tasks array and html 
    addDeleteEvent();       //add event for all the trash icons in the task cards  
    addDoneEvent();     //add event for all the checkbox inputs in the task cards
}

//delete the item from tasks array and html
function deleteItemFromList(selectedItem, id){
    selectedItem.parentElement.removeChild(selectedItem);       //remove the li tag of the task
    tasks.splice(id-1, 1);      //remove the task object from the array
    rearrangeItems(id);     //rearrange the items added after the task and change their ids 
}
//081288//

//rearrange the items added after the task and change their ids 
function rearrangeItems(fromId){
    for(let k = fromId-1; k < tasks.length; k++){
        tasks[k].id --;     //correct the task id in the array
        document.querySelector(`#item-${k+2}`).id = `item-${k+1}`;  //correct the task id in the li tag
        document.querySelector(`#item-${k+1} .tasks__item-id`).textContent = k+1;   //change the task id on the task card
    }
}

//add animation before removing the html element
function deleteAnimation(id){
    let selectedItem = document.querySelector(`#item-${id}`);       //select the item by id
    selectedItem.style.transform = "translateX(-200px)";        //move the task to the left
    selectedItem.style.opacity = 0;     //set opacity to 0
}

//add event for all the checkbox inputs in the task cards
function addDoneEvent(){
    for(let k = 0; k < tasks.length; k++){
        let newItem = document.querySelector(`#item-${k+1} input`);     //select checkbox input elements
        newItem.addEventListener("change", toggleDone);     //on-change event for the done checkbox
        newItem.checked = tasks[k].completed;       //if the task completed is true the checkbox element gets checked, otherwise it is unchecked.
    }
}

//toggle the state of the task to completed/uncompleted state
function toggleDone(event){
    event.preventDefault();     //the page doesn't refresh
    const itemId = Number(event.target.parentElement.id.slice(5));      //a task's id is like "item-1". it gets the id and removes the first 5 character (item-) to get the id number
    let selectedItem = document.querySelector(`#item-${itemId}`);       //select the li element of the task
    tasks[itemId-1].completed = !tasks[itemId-1].completed;         //toggle the completed property in the task object
    if(tasks[itemId-1].completed){                                  //set style for a completed task
        selectedItem.style.textDecoration = "line-through";
        selectedItem.style.textDecorationThickness = "2px";
        selectedItem.style.backgroundColor = "gray";
    }
    else{                                                          //set style for unfinished task
        selectedItem.style.textDecoration = "none";
        selectedItem.style.backgroundColor = "#7bfac3";
    }
}
//F.Zoghi - August 28 2020
