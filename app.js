const taskInp = document.querySelector("#input-task");
const addTaskBtn = document.querySelector("#add-btn");
const taskContainer = document.querySelector(".tasks-container");

let arrayOfTasks = [];

// check if there is data in localeStorage
if (localStorage.getItem("task")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("task"));
}

getData();

addTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (taskInp.value !== "") {
    addToArray(taskInp.value);
    taskInp.value = "";
  }
});

deleteTask(taskContainer);

function addToArray(tasks) {
  const task = {
    id: Date.now(),
    subject: tasks,
    completed: false,
  };
  arrayOfTasks.push(task);

  // fill data in container of tasks to viwe
  addTasksToContainer(arrayOfTasks);

  // add task data to locale storage
  addTOlocaleStorage(arrayOfTasks);
}

function addTasksToContainer(arrayOfTasks) {
  taskContainer.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.className =
      "task d-flex justify-content-between align-items-center text-white";
    taskDiv.setAttribute("data-id", task.id);
    taskDiv.textContent = `${task.subject}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.className =
      "delate-task btn btn-danger text-white d-flex align-items-center";
    deleteBtn.textContent = "x";

    taskDiv.appendChild(deleteBtn);
    taskContainer.appendChild(taskDiv);
  });
}

function addTOlocaleStorage(arrayOfTasks) {
  window.localStorage.setItem("task", JSON.stringify(arrayOfTasks));
}

// get data in locale storage and store it
function getData() {
  const data = localStorage.getItem("task");
  if (data) {
    const task = JSON.parse(localStorage.getItem("task"));
    addTasksToContainer(task);
  }
}

// delete the task
function deleteTask(taskContainer) {
  taskContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delate-task")) {
      e.target.parentElement.remove();
      const taskId = e.target.parentElement.dataset.id;
      arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
      addTOlocaleStorage(arrayOfTasks);
    }
    // check of state of task
    if (e.target.classList.contains("task")) {
      e.target.classList.toggle("done");
      const taskId = e.target.dataset.id;
      for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
          arrayOfTasks[i].completed == false
            ? (arrayOfTasks[i].completed = true)
            : (arrayOfTasks[i].completed = false);
          addTOlocaleStorage(arrayOfTasks);
        }
      }
    }
  });
}
