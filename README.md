# Tavreni

Tavreni is a full-stack task management web application written for learning purposes. Users can add, view, modify, manage and delete their tasks within the application. It is built with a Reach frontend and Express API on the backend, which uses SQLite as a database.

## Features

* Create tasks with a title, description, priority, status, and optional due date
* Edit existing tasks
* Delete tasks
* View all saved tasks
* Filter tasks by status
* Persist task data in SQLite
* Validate task data on the backend
* Return consistent API error responses
* Display loading and error states in the frontend
* Run automated API tests with Jest and Supertest

## Technology Stack

### Frontend

* React
* Vite
* JavaScript
* HTML
* CSS

### Backend

* Node.js
* Express
* SQLite
* CORS

### Testing

* Jest
* Supertest

### Development Tools

* Jira
* Git
* GitHub
* Visual Studio Code
* Postman

## Project Structure

```text
tavreni/
├── backend/
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   ├── validateTask.js
│   │   └── validateTaskId.js
│   ├── models/
│   │   └── taskModel.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── tests/
│   │   └── taskRoutes.test.js
│   ├── app.js
│   ├── database.js
│   ├── server.js
│   ├── tavreni.db
│   └── package.json
├── public/
├── src/
├── index.html
├── package.json
└── README.md
```

## Task Fields

| Field        | Description                                      |
| ------------ | ------------------------------------------------ |
| Title        | Required name of the task                        |
| Description  | Optional additional details                      |
| Priority     | Low, Medium, or High                             |
| Status       | To Do, In Progress, or Completed                 |
| Due Date     | Optional deadline                                |
| Date Created | Automatically generated when the task is created |

## Installation

### Prerequisites

Install the following before running Tavreni:

* Node.js
* npm
* Git

### Clone the Repository

```bash
git clone <repository-url>
cd tavreni
```

## Run the Backend

Open a terminal and move into the backend directory:

```bash
cd backend
```

Install the backend dependencies:

```bash
npm install
```

Start the Express server:

```bash
node server.js
```

The backend will run at:

```text
http://localhost:3000
```

## Run the Frontend

Open another terminal from the project root.

Install the frontend dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the local address shown by Vite, typically:

```text
http://localhost:5173
```

Both the frontend and backend must be running for Tavreni to work correctly.

## API Endpoints

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| GET    | `/api/tasks`     | Return all tasks |
| GET    | `/api/tasks/:id` | Return one task  |
| POST   | `/api/tasks`     | Create a task    |
| PUT    | `/api/tasks/:id` | Update a task    |
| DELETE | `/api/tasks/:id` | Delete a task    |

## Example Task

```json
{
  "title": "Finish Tavreni README",
  "description": "Document the application setup and features",
  "priority": "medium",
  "status": "in-progress",
  "dueDate": "",
  "dateCreated": "2026-07-31T15:00:00.000Z"
}
```

## API Error Responses

Tavreni returns consistent JSON error responses.

### Invalid Request

```json
{
  "error": "Bad Request",
  "message": "Task ID must be a positive integer"
}
```

### Missing Task

```json
{
  "error": "Not Found",
  "message": "Task not found"
}
```

### Unknown API Route

```json
{
  "error": "Not Found",
  "message": "API route not found"
}
```

### Unexpected Server Error

```json
{
  "error": "Internal Server Error",
  "message": "Something went wrong"
}
```

## Automated Tests

The backend includes automated API tests for:

* Backend status route
* Loading all tasks
* Creating tasks
* Updating tasks
* Deleting tasks
* Invalid task IDs
* Missing tasks
* Invalid task data
* Unknown API routes

Run the tests from the backend directory:

```bash
npm test
```

The test suite uses a separate SQLite database:

```text
tavreni.test.db
```

This protects the normal development database from test data.

## Database

Tavreni uses SQLite for persistent task storage.

The development database is located at:

```text
backend/tavreni.db
```

The database and `tasks` table are created automatically when the backend starts.

## Current Status

Tavreni currently supports:

* Full task CRUD functionality
* SQLite persistence
* Backend validation
* Consistent API error responses
* Centralized error handling
* Automated API testing
* Separate development and testing databases

## Purpose

Tavreni is my first full-stack web application. It's a learning project that's helping me practice tools like React, JavaScript (back-end) and REST API. The backend I use is Express framework with a SQLite database to store tasks.

## Author

Created by Chadley Tonniges.

