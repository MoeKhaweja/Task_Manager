let userInput = document.getElementById("userInput");
let submitInput = document.getElementById("submitInput");
let allTasks = document.getElementById("allTasks");
let getTasks = document.getElementById("clearTasks");

let tasks = [1, 2, 3, 4];

submitInput.addEventListener("click", addTask);
getTasks.addEventListener("click", loadTasks);

function loadTasks() {
  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(task));
    allTasks.appendChild(li);
  });
}

function addTask() {
  if (userInput.value == "") {
    alert("please add a valid task");
    return;
  }
  storeTask(userInput.value);
  const li = document.createElement("li");
  li.textContent = userInput.value;
  addDeleteButton(li);
  addCompleteTask(li);
  editTaskName(li);
  allTasks.appendChild(li);
}

function storeTask(task) {
  tasks.push(task);
}

function addDeleteButton(element) {
  const deleteButton = document.createElement("button");
  deleteButton.className = "deleteTask";
  deleteButton.textContent = "delete";
  deleteButton.addEventListener("click", deleteTask);
  element.appendChild(deleteButton);
}
function deleteTask(button) {
  button.target.parentElement.remove();
}

function addCompleteTask(element) {
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "active";
  checkBox.textContent = "active";
  checkBox.addEventListener("click", toggleActivity);
  element.appendChild(checkBox);
}
function toggleActivity(checkBox) {
  if (checkBox.target.classList.contains("completed")) {
    checkBox.target.classList.remove("completed");
    checkBox.target.classList.add("active");
  } else if (checkBox.target.classList.contains("active")) {
    checkBox.target.classList.remove("active");
    checkBox.target.classList.add("completed");
  }
}

function editTaskName(element) {
  const editTaskbutton = document.createElement("button");
  editTaskbutton.className = "edit";
  editTaskbutton.textContent = "edit";
  editTaskbutton.addEventListener("click", editTask);
  element.appendChild(editTaskbutton);
}
function editTask(button) {
  button.target.setAttribute("class", "done");
  let taskItem = button.target.parentNode;
  taskList = taskItem.parentNode;
  let editMode = document.createElement("input");
  editMode.setAttribute("type", "text");
  editMode.setAttribute("value", taskItem.textContent);
  taskList.replaceChild(editMode, taskItem);
}
