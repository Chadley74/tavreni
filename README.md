# Tavreni

[![Tavreni CI](https://github.com/Chadley74/tavreni/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Chadley74/tavreni/actions/workflows/ci.yml)

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
git clone https://github.com/Chadley74/tavreni.git
cd tavreni
```
## Environment Configuration

Environment variables are used to enable execution of the same code in local development, automated tests and cloud environments.

### Frontend Configuration

Create a file named `.env.local` in the project root:

```env
VITE_API_BASE_URL=http://localhost:3000
```

The `VITE_API_BASE_URL` sets the API base URL for the React frontend to send API requests to.

The project includes `.env.example` as a configuration template:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Copy the example file when setting up a new local environment:

```bash
cp .env.example .env.local
```

Restart the Vite development server after changing frontend environment variables:

```bash
npm run dev
```

Limited to frontend only, production variables of the name VITE_ that get embedded into the compiled frontend application and should NEVER contain any secrets.

### Backend Configuration

The Express backend supports the following environment variables:

| Variable      | Purpose                                   | Local default           |
| ------------- | ----------------------------------------- | ----------------------- |
| `PORT`        | Port on which the Express server listens  | `3000`                  |
| `CORS_ORIGIN` | Frontend origin permitted to call the API | `http://localhost:5173` |

The project includes a backend configuration template at:

```text
backend/.env.example
```

Its contents are:

```env
PORT=3000
CORS_ORIGIN=http://localhost:5173
```

No backend .env file is needed for local development as the backend has already been set up to use local fallback values.

When Tavreni is deployed, the cloud platform will provide values similar to:

```env
PORT=3000
CORS_ORIGIN=https://your-tavreni-frontend.example
```

Do not add a trailing slash to `CORS_ORIGIN`.

Use:

```env
CORS_ORIGIN=http://localhost:5173
```

Not:

```env
CORS_ORIGIN=http://localhost:5173/
```

### Local Environment Files

Local environment files are excluded from Git because they may contain settings specific to a machine or secrets.

Files such as these should not be committed:

```text
.env
.env.local
.env.*.local
backend/.env
backend/.env.local
```

The example files should remain committed:

```text
.env.example
backend/.env.example
```

These files contain information about the required environment variables but do not store them.

### CI Configuration

GitHub Actions provides the frontend API address directly to the Vite build:

```yaml
- name: Build frontend
  run: npm run build
  env:
    VITE_API_BASE_URL: http://localhost:3000
```

The backend tests use the default local values for `PORT` and `CORS_ORIGIN`.

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

