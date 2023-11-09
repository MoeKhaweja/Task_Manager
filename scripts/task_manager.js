// get elements
const userInput = document.getElementById("userInput");
const userDate = document.getElementById("userDate");
const submitInput = document.getElementById("submitInput");
const allTasks = document.getElementById("allTasks");
const clearTasks = document.getElementById("clearTasks");
const userPriority = document.getElementById("priority");
const filterDate = document.getElementById("filterDate");
const filterPriority = document.getElementById("filterPriority");
const filterActive = document.getElementById("filterActive");
const filterCompleted = document.getElementById("filterCompleted");
const filterAll = document.getElementById("filterAll");

// add event listners
clearTasks.addEventListener("click", deleteAll);
filterDate.addEventListener("click", filterByDate);
filterPriority.addEventListener("click", filterByPriority);
submitInput.addEventListener("click", addTask);
filterActive.addEventListener("click", filterByActiveTasks);
filterCompleted.addEventListener("click", filterByCompletedTasks);
filterAll.addEventListener("click", filterByAllTasks);

// initialize arrays for sorting
let tasks = [];
let sortedDate = [];
let sortedPriority = [];

// function to add a task
function addTask() {
  // check if empty inputs or if active filters
  if (userInput.value == "" || userDate.value == "") {
    alert("please add a valid task");
    return;
  }
  if (!filterDate.classList.contains("notFiltered")) {
    rearrangeTasks(tasks);
    filterDate.textContent = "Filter by Date";
    sortedDate = [];
  }
  if (!filterPriority.classList.contains("noPriority")) {
    rearrangeTasks(tasks);
    filterPriority.textContent = "Filter by Priority";
    sortedPriority = [];
  }
  // create child for text display
  const taskText = document.createElement("div");
  taskText.innerHTML = `<div>${userInput.value}</div>`;

  // logic for list objects
  const uniqueId = new Date().getTime();
  tasks.push({
    id: uniqueId,
    active: true,
    content: userInput.value,
    date: userDate.value,
    priority: userPriority.value,
  });

  // child for buttons and task options
  const taskOptions = document.createElement("div");
  dateNode = document.createElement("div");
  dateNode.textContent = userDate.value;
  taskOptions.appendChild(dateNode);

  addDeleteButton(taskOptions);
  editTaskName(taskOptions);
  addCompleteTask(taskOptions);

  // append children to parent
  taskOptions.classList.add("taskOptions");
  taskText.classList.add("taskText");

  const task = document.createElement("div");
  task.setAttribute("id", uniqueId);
  task.appendChild(taskText);
  task.appendChild(taskOptions);

  task.classList.add("taskItem");

  allTasks.appendChild(task);
  userInput.value = "";
}

// same logic as add task but it can take a list and display it according to sorting
function rearrangeTasks(tasks) {
  allTasks.textContent = "";
  tasks.forEach(function (task) {
    const taskText = document.createElement("div");
    taskText.innerHTML = `<div>${task.content}</div>`;
    const taskOptions = document.createElement("div");
    taskOptions.classList.add("taskOptions");
    taskText.classList.add("taskText");

    dateNode = document.createElement("div");
    dateNode.textContent = task.date;
    taskOptions.appendChild(dateNode);

    addDeleteButton(taskOptions);
    editTaskName(taskOptions);
    addCompleteTask(taskOptions);

    const wholetask = document.createElement("div");
    wholetask.classList.add("taskItem");

    wholetask.appendChild(taskText);
    wholetask.appendChild(taskOptions);

    allTasks.appendChild(wholetask);
  });
}

function addDeleteButton(element) {
  const deleteButton = document.createElement("button");
  deleteButton.className = "deleteTask";
  deleteButton.textContent = "delete";
  deleteButton.addEventListener("click", deleteTask);
  element.appendChild(deleteButton);
}
function deleteTask(button) {
  button.target.parentElement.parentElement.remove();
  removeObjectWithId(
    tasks,
    button.target.parentElement.parentElement.getAttribute("id")
  );
}
function deleteAll() {
  tasks = [];
  allTasks.textContent = "";
}

function removeObjectWithId(arr, id) {
  const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
  arr.splice(objWithIdIndex, 1);
  console.log(arr);
}
function addCompleteTask(element) {
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "active";
  checkBox.addEventListener("click", toggleActivity);
  element.appendChild(checkBox);
}
function toggleActivity(checkBox) {
  if (checkBox.target.classList.contains("completed")) {
    checkBox.target.classList.remove("completed");
    checkBox.target.classList.add("active");
    updateActivity(
      checkBox.target.parentElement.parentElement.getAttribute("id")
    );
  } else if (checkBox.target.classList.contains("active")) {
    checkBox.target.classList.remove("active");
    checkBox.target.classList.add("completed");
    updateActivity(
      checkBox.target.parentElement.parentElement.getAttribute("id")
    );
  }
}

function updateActivity(id) {
  index = tasks.findIndex((x) => x.id == id);
  tasks[index].active = !tasks[index].active;
}
function editTaskName(element) {
  const editTaskbutton = document.createElement("button");
  editTaskbutton.className = "edit";
  editTaskbutton.textContent = "edit";
  editTaskbutton.addEventListener("click", editTask);
  element.appendChild(editTaskbutton);
}
function editTask(button) {
  if (button.target.classList.contains("edit")) {
    button.target.setAttribute("class", "done");
    button.target.textContent = "confirm";
    let taskItem = button.target.parentNode.parentNode.firstChild;
    let taskList = taskItem.parentNode;
    let editMode = document.createElement("input");
    editMode.setAttribute("type", "text");
    editMode.setAttribute("value", taskItem.textContent);
    taskList.replaceChild(editMode, taskItem);
  } else if (button.target.classList.contains("done")) {
    button.target.classList.remove("done");
    button.target.setAttribute("class", "edit");
    button.target.textContent = "edit";
    let taskItem = button.target.parentNode.parentNode.firstChild;
    let taskList = taskItem.parentNode;
    let editMode = document.createElement("div");
    editMode.classList.add("taskText");
    editMode.textContent = taskItem.value;
    taskList.replaceChild(editMode, taskItem);
  }
}

function filterByDate() {
  sortedDate = [...tasks];
  sortedDate.sort(function (a, b) {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  if (filterDate.classList.contains("notFiltered")) {
    rearrangeTasks(sortedDate);
    filterPriority.classList.add("noPriority");
    filterPriority.textContent = "Filter by Priority";
    filterDate.classList.toggle("notFiltered");
    filterDate.textContent = "Filter by Order";
  } else {
    rearrangeTasks(tasks);
    filterDate.classList.toggle("notFiltered");
    filterDate.textContent = "Filter by Date";
    sortedDate = [];
  }
}

function filterByPriority() {
  sortedPriority = [...tasks];
  sortedPriority.sort(function (a, b) {
    const A = a.priority;
    const B = b.priority;
    return A - B;
  });

  if (filterPriority.classList.contains("noPriority")) {
    rearrangeTasks(sortedPriority);
    filterDate.classList.add("notFiltered");
    filterDate.textContent = "Filter by Date";
    filterPriority.classList.toggle("noPriority");
    filterPriority.textContent = "Filter by Order";
  } else {
    rearrangeTasks(tasks);
    filterPriority.classList.toggle("noPriority");
    filterPriority.textContent = "Filter by Priority";
    sortedPriority = [];
  }
}

function filterByCompletedTasks() {
  elements = document.getElementsByClassName("active");
  for (let i = 0; i < elements.length; i++) {
    elements[i].parentElement.parentElement.style.display = "none";
  }
  elementsCompleted = document.getElementsByClassName("completed");
  for (let i = 0; i < elementsCompleted.length; i++) {
    elementsCompleted[i].parentElement.parentElement.style.display = "";
  }
}

function filterByActiveTasks() {
  elements = document.getElementsByClassName("completed");
  for (let i = 0; i < elements.length; i++) {
    elements[i].parentElement.parentElement.style.display = "none";
  }
  elementsCompleted = document.getElementsByClassName("active");
  for (let i = 0; i < elementsCompleted.length; i++) {
    elementsCompleted[i].parentElement.parentElement.style.display = "";
  }
}

function filterByAllTasks() {
  elementsCompleted = document.getElementsByClassName("completed");
  for (let i = 0; i < elementsCompleted.length; i++) {
    elementsCompleted[i].parentElement.parentElement.style.display = "";
  }
  elementsActive = document.getElementsByClassName("active");
  for (let i = 0; i < elementsActive.length; i++) {
    elementsActive[i].parentElement.parentElement.style.display = "";
  }
}
