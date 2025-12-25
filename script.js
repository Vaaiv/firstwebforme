const addBtn = document.getElementById("addBtn");
const taskArea = document.getElementById("taskArea");

// 1) Read tasks from localStorage (or empty array if nothing saved)
function loadTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

// 2) Save tasks array into localStorage
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 3) Create a task box on the screen
function createTaskBox(taskObj) {
  const task = document.createElement("div");
  task.className = "task";
  task.dataset.id = taskObj.id; // store id in HTML

  const textarea = document.createElement("textarea");
  textarea.placeholder = "Write your task here...";
  textarea.value = taskObj.text; // load saved text

  const actions = document.createElement("div");
  actions.className = "actions";

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";

  // Auto-save whenever user types
  textarea.addEventListener("input", () => {
    const tasks = loadTasks();
    const index = tasks.findIndex(t => t.id === taskObj.id);
    if (index !== -1) {
      tasks[index].text = textarea.value;
      saveTasks(tasks);
    }
  });

  // Delete task
  deleteBtn.addEventListener("click", () => {
    // remove from screen
    task.remove();

    // remove from localStorage
    const tasks = loadTasks().filter(t => t.id !== taskObj.id);
    saveTasks(tasks);
  });

  actions.appendChild(deleteBtn);
  task.appendChild(textarea);
  task.appendChild(actions);
  taskArea.appendChild(task);

  textarea.focus();
}

// 4) When page loads, show saved tasks
window.addEventListener("DOMContentLoaded", () => {
  const tasks = loadTasks();
  tasks.forEach(taskObj => createTaskBox(taskObj));
});

// 5) When + is clicked, create new task and save it
addBtn.addEventListener("click", () => {
  const tasks = loadTasks();

  const newTask = {
    id: Date.now(), // unique id
    text: ""
  };

  tasks.push(newTask);
  saveTasks(tasks);

  createTaskBox(newTask);
});
