let tasks = JSON.parse(localStorage.getItem("tasks")) || {
  todo: [],
  inprogress: [],
  done: []
};


function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function renderTasks() {
  for (let board in tasks) {
    const list = document.getElementById(board + "List");
    if (list) {
      list.innerHTML = "";
      tasks[board].forEach((task, index) => {
        const div = document.createElement("div");
        div.className = "task";
        div.textContent = task;

       
        const delBtn = document.createElement("button");
        delBtn.textContent = "✖";
        delBtn.className = "delete-btn";
        delBtn.onclick = () => {
          tasks[board].splice(index, 1);
          saveTasks();
          renderTasks();
        };

        div.appendChild(delBtn);
        list.appendChild(div);
      });
    }
  }
}


function addTask(board) {
  const task = prompt("Enter task:");
  if (task) {
    tasks[board].push(task);
    saveTasks();
    renderTasks();
  }
}


function removeBoard(id) {
  if (confirm(`Delete the board "${id}" and all its tasks?`)) {
    delete tasks[id];
    saveTasks();
    document.getElementById(id).remove(); 
  }
}


document.getElementById("addBoard").addEventListener("click", () => {
  const name = prompt("Enter new board name:");
  if (!name) return;

  const id = name.toLowerCase().replace(/\s+/g, "");
  if (tasks[id]) {
    alert("Board already exists!");
    return;
  }


  tasks[id] = [];
  saveTasks();


  const boardContainer = document.getElementById("boardContainer");
  const boardDiv = document.createElement("div");
  boardDiv.className = "board";
  boardDiv.id = id;
  boardDiv.innerHTML = `
    <h2>${name}</h2>
    <button class="remove-board" onclick="removeBoard('${id}')">🗑 Delete Board</button>
    <div class="task-list" id="${id}List"></div>
    <button class="add-btn" onclick="addTask('${id}')">+ Add Task</button>
  `;
  boardContainer.appendChild(boardDiv);

  renderTasks();
});


document.getElementById("clearAll").addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = { todo: [], inprogress: [], done: [] };
    saveTasks();
    location.reload();
  }
});

renderTasks();
