// API Base URL
const API_URL = 'http://localhost:5000/api';

// Get token and user from localStorage
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

// Check if user is logged in
if (!token || !user) {
  window.location.href = 'index.html';
}

// Display user name
document.getElementById('userName').textContent = `Welcome, ${user.name}`;

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'index.html';
});

// Show message function
function showMessage(message, type = 'error') {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = message;
  messageDiv.className = `message ${type} show`;
  
  setTimeout(() => {
    messageDiv.classList.remove('show');
  }, 5000);
}

// Fetch and display tasks
async function fetchTasks() {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    
    if (response.ok) {
      displayTasks(data.tasks);
      updateStats(data.tasks);
    } else {
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'index.html';
      }
      showMessage(data.message || 'Failed to fetch tasks');
    }
  } catch (error) {
    showMessage('An error occurred while fetching tasks');
    console.error('Fetch tasks error:', error);
  }
}

// Display tasks in the UI
function displayTasks(tasks) {
  const tasksList = document.getElementById('tasksList');
  
  if (tasks.length === 0) {
    tasksList.innerHTML = `
      <div class="empty-state">
        <h3>No tasks yet</h3>
        <p>Add your first task to get started!</p>
      </div>
    `;
    return;
  }
  
  tasksList.innerHTML = tasks.map(task => `
    <div class="task-item ${task.completed ? 'completed' : ''}">
      <div class="task-checkbox">
        <input type="checkbox" 
               ${task.completed ? 'checked' : ''} 
               onchange="toggleTask('${task._id}', ${!task.completed})">
      </div>
      <div class="task-content">
        <h3>${task.title}</h3>
        ${task.description ? `<p>${task.description}</p>` : ''}
      </div>
      <div class="task-actions">
        <button class="btn-delete" onclick="deleteTask('${task._id}')">Delete</button>
      </div>
    </div>
  `).join('');
}

// Update statistics
function updateStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;
  
  document.getElementById('totalTasks').textContent = total;
  document.getElementById('completedTasks').textContent = completed;
  document.getElementById('pendingTasks').textContent = pending;
}

// Add new task
document.getElementById('taskForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const title = document.getElementById('taskTitle').value;
  const description = document.getElementById('taskDescription').value;
  
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, description })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      showMessage('Task added successfully!', 'success');
      document.getElementById('taskForm').reset();
      fetchTasks();
    } else {
      showMessage(data.message || 'Failed to add task');
    }
  } catch (error) {
    showMessage('An error occurred while adding task');
    console.error('Add task error:', error);
  }
});

// Toggle task completion
async function toggleTask(taskId, completed) {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ completed })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      fetchTasks();
    } else {
      showMessage(data.message || 'Failed to update task');
    }
  } catch (error) {
    showMessage('An error occurred while updating task');
    console.error('Update task error:', error);
  }
}

// Delete task
async function deleteTask(taskId) {
  if (!confirm('Are you sure you want to delete this task?')) {
    return;
  }
  
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    
    if (response.ok) {
      showMessage('Task deleted successfully!', 'success');
      fetchTasks();
    } else {
      showMessage(data.message || 'Failed to delete task');
    }
  } catch (error) {
    showMessage('An error occurred while deleting task');
    console.error('Delete task error:', error);
  }
}

// Load tasks on page load
fetchTasks();
