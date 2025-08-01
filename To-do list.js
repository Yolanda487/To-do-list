// Select elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const clearAllBtn = document.getElementById('clearAllBtn');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') addTask();
});

// Clear all tasks
clearAllBtn.addEventListener('click', clearAllTasks);

// Functions
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');
  li.innerHTML = `
    <span>${taskText}</span>
    <button class="delete-btn">X</button>
  `;

  // Mark completed on click
  li.querySelector('span').addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  // Delete task
  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  taskList.appendChild(li);
  taskInput.value = '';
  saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    tasks.push({
      text: li.querySelector('span').innerText,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task.text}</span>
      <button class="delete-btn">X</button>
    `;
    if (task.completed) li.classList.add('completed');

    li.querySelector('span').addEventListener('click', () => {
      li.classList.toggle('completed');
      saveTasks();
    });

    li.querySelector('.delete-btn').addEventListener('click', () => {
      li.remove();
      saveTasks();
    });

    taskList.appendChild(li);
  });
}

// Clear all tasks
function clearAllTasks() {
  taskList.innerHTML = '';
  localStorage.removeItem('tasks');
}
