# TaskPro - Task Management Web App

A full-stack task management application enabling users to register, log in, and manage tasks with secure authentication and persistent storage.

## Tech Stack
- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: HTML, CSS, JavaScript
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

## Features
- User registration and login
- Secure JWT-based authentication
- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Persistent storage with MongoDB

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/taskpro
   JWT_SECRET=your_secret_key_here
   PORT=5000
   ```

4. Start MongoDB service

5. Run the application:
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5000`
