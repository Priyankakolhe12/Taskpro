// API Base URL
const API_URL = 'http://localhost:5000/api';

// Show message function
function showMessage(message, type = 'error') {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = message;
  messageDiv.className = `message ${type} show`;
  
  setTimeout(() => {
    messageDiv.classList.remove('show');
  }, 5000);
}

// Handle Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Store token and user info
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        showMessage('Login successful! Redirecting...', 'success');
        
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1000);
      } else {
        showMessage(data.message || 'Login failed');
      }
    } catch (error) {
      showMessage('An error occurred. Please try again.');
      console.error('Login error:', error);
    }
  });
}

// Handle Registration
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showMessage('Registration successful! Redirecting to login...', 'success');
        
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1500);
      } else {
        showMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      showMessage('An error occurred. Please try again.');
      console.error('Registration error:', error);
    }
  });
}
