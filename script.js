const form1 = document.querySelector(".form");
const input1 = document.querySelector(".input");
const list1 = document.querySelector(".list");
const dateTimeEl = document.querySelector(".date-time");

// Load tasks from localStorage
window.addEventListener("load", () => {
  // Get saved tasks (if none, use empty list)
  let savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    savedTasks = JSON.parse(savedTasks);
  } else {
    savedTasks = [];
  }

  // Show all saved tasks
  savedTasks.forEach(function(task) {
    Addtask(task);
  });

  updateDateTime();
});

form1.addEventListener("submit", function(e) {
  e.preventDefault();

  if (input1.value !== "") {
    Addtask({ name: input1.value, completed: false });
  }
});

// Function to add task
function Addtask(task) {
  let newtask = task.name;
  
  const taskadd = document.createElement("li");
  taskadd.innerHTML = newtask;
  if (task.completed) taskadd.classList.add("checked");

  list1.appendChild(taskadd); 
  input1.value = "";

  // Check button
  const checkbutton = document.createElement("div");
  checkbutton.innerHTML = `<i class="fa-solid fa-square-check"></i>`;
  taskadd.appendChild(checkbutton);

  // Delete button
  const deletebutton = document.createElement("div");
  deletebutton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  taskadd.appendChild(deletebutton);

  // Event Listeners
  checkbutton.addEventListener("click", () => {
    taskadd.classList.toggle("checked");
    saveTasks();
  });

  deletebutton.addEventListener("click", () => {
    taskadd.remove();
    saveTasks();
  });

  saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".list li").forEach(li => {
    tasks.push({
      name: li.firstChild.textContent,
      completed: li.classList.contains("checked")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update date & time
function updateDateTime() {
  const now = new Date();
  dateTimeEl.textContent = now.toLocaleString();
  setTimeout(updateDateTime, 1000);
}
