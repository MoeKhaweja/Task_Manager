let userInput = document.getElementById("userInput");
let submitInput = document.getElementById("submitInput");
let allTasks = document.getElementById("allTasks");

submitInput.addEventListener("click", addTask);

function addTask() {
  console.log(userInput.value);
}
let tasks = [];
