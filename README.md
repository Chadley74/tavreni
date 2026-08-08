# Tavreni

[![Tavreni CI](https://github.com/Chadley74/tavreni/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Chadley74/tavreni/actions/workflows/ci.yml)

Tavreni is a full-stack task management web application written for learning purposes. Users can add, view, modify, manage and delete their tasks within the application. It is built with a Reach frontend and Express API and MSSQL as the backend. Everything is setup to run on Microsoft Azure. The React frontend is hosted on Azure Static Web Apps, the Express backend runs in Azure Container Apps, and persistent task data is stored in Azure SQL Database.

## Features

* Create tasks with a title, description, priority, status, and optional due date
* Edit existing tasks
* Delete tasks
* View all saved tasks
* Filter tasks by status
* Persist task data in Azure SQL Database
* Validate task data on the backend
* Use parameterized SQL queries
* Return consistent API error responses
* Display loading and error states in the frontend
* Run automated API tests with Jest and Supertest
* Build and deploy through GitHub Actions
* Run the backend as a Docker container
* Automatically deploy the frontend to Azure Static Web Apps

## Technology Stack

### Frontend

* React
* Vite
* JavaScript
* HTML
* CSS
* Azure Static Web Apps

### Backend

* Node.js
* Express
* mssql
* CORS
* Docker
* Azure Container Apps

### Database

* Azure SQL Database
* Microsoft SQL Server / T-SQL
* Parameterized SQL queries
* SQL connection pooling

### Testing

* Jest
* Supertest
* Mocked database repository

### CI/CD
* GitHub Actions
* GitHub Container Registry
* Azure Static Web Apps deployment workflow

### Development Tools

* Jira
* Git
* GitHub
* Visual Studio Code
* Postman
* Docker Desktop
* Azure Portal

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

Install the following before running Tavreni locally:

* Node.js
* npm
* Git

Docker Desktop is optional for running the backend as a container.

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

Vite variables beginning with VITE_ are embedded into the compiled frontend and must never contain secrets

In Azure, the Static Web Apps workflow provides the production Container Apps URL as the value of VITE_API_BASE_URL.

### Backend Configuration

The backend requires both Express and Azure SQL variables.

Create:

backend/.env

| Variable      | Purpose                                   | Default                            |
| ------------- | ----------------------------------------- | ---------------------------------- |
| `PORT`        | Port on which the Express server listens  | `3000`                             |
| `CORS_ORIGIN` | Frontend origin permitted to call the API | `http://localhost:5173`            |
| `DB_SERVER`   | Azure SQL logical server hostname         | `your-server.database.windows.net` |
| `DB_NAME`     | Azure SQL database name                   | `your-database-name`               |
| `DB_USER`     | SQL database username                     | `your-database-user`               |
| `DB_PASSWORD` | SQL database password                     | `your-database-password`           |
| `DB_PORT`     | SQL Server port                           | `1433`                             |
| `DB_ENCRYPT`  | Enable encrypted SQL connections          | `true`                             |

The project includes a backend configuration template at:

```text
backend/.env.example
```

Its documents the required variables without containing real credentials:

```env
PORT=3000
CORS_ORIGIN=http://localhost:5173
DB_SERVER=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_PORT=1433
DB_ENCRYPT=true
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
npm start
```

The backend runs locally at:

```text
http://localhost:3000
```

The backend connects to Azure SQL using the values defined in backend/.env.

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
  "dueDate": ""
}
```
The client does not provide dateCreated.

Azure SQL automatically generates the creation timestamp using:

```text
SYSUTCDATETIME()
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
* Invalid titles
* Invalid priorities
* Invalid statuses
* Unknown API routes

The automated tests do not connect to the live Azure SQL database.

Instead, the task repository is mocked:

```text
Supertest
     |
     v
Express Routes
     |
     v
Task Model
     |
     v
Mocked Task Repository
```
This keeps the test fast, repeatable, and independent of Azure availability while preventing automated tests from modifying cloud database data.

Run the tests from the backend directory:

```bash
npm test
```

## Database

Tavreni uses Azure SQL Database for persistent task storage.

The Azure SQL `tasks` table stores:

```text
id
title
description
priority
status
dueDate
dateCreated
```

The `id` field is generated using a SQL Server identity column:

```sql
id INT IDENTITY(1,1) PRIMARY KEY
```

The `dateCreated` field is automatically generated by Azure SQL:

```sql
dateCreated DATETIME2(7) NOT NULL
DEFAULT (SYSUTCDATETIME())
```

The database also uses constraints to restrict valid priority and status values.

### Priority

```text
low
medium
high
```

### Status

```text
todo
in-progress
completed
```

## Parameterized Queries

Database operations are implemented in:

```text
backend/database/taskRepository.js
```

The backend uses parameterized SQL requests rather than inserting user-controlled values directly into SQL statements.

Example:

```javascript
.input("title", sql.NVarChar(255), title)
```

## SQL Connection Pooling

Azure SQL connections are managed through:

```text
backend/database/sqlServer.js
```

The backend creates and reuses a SQL connection pool rather than establishing a completely new database connection for every API request.

## Docker

The Express backend is containerized using Docker.

Build the backend image locally from the project root:

```bash
docker build -t tavreni-api:local ./backend
```

Run the container:

```bash
docker run --name tavreni-api-container -p 3000:3000 tavreni-api:local
```

When running the container against Azure SQL, the required database environment variables must also be supplied.

The production backend container image is published to GitHub Container Registry:

```text
ghcr.io/chadley74/tavreni-api
```

## Continuous Integration

Tavreni uses GitHub Actions for continuous integration.

The main CI workflow is:

```text
.github/workflows/ci.yml
```

The workflow validates:

```text
Backend Tests
Frontend Build
Backend Container Build
```

The CI workflow does not connect to the live Azure SQL database.

## Backend Container Publishing

Backend container images are published through:

```text
.github/workflows/publish-backend-image.yml
```

When backend code changes on the `main` branch, GitHub Actions:

```text
Checks out the repository
→ builds the backend Docker image
→ publishes the image to GitHub Container Registry
```

The workflow publishes image tags including:

```text
latest
sha-<commit-hash>
```

Azure Container Apps runs the published backend image.

## Azure Static Web Apps Deployment

The React frontend is deployed using Azure Static Web Apps.

Azure Static Web Apps uses a GitHub Actions workflow to automatically build and deploy changes pushed to `main`.

The frontend receives the Azure Container Apps API URL through:

```env
VITE_API_BASE_URL
```

The deployed request flow is:

```text
Browser
→ Azure Static Web Apps
→ Azure Container Apps
→ Azure SQL Database
```

## Azure Container Apps Deployment

The Express backend is hosted using Azure Container Apps.

Setting the minimum replica count to `0` allows the backend to scale down when idle.

The backend container receives Azure SQL configuration through Container App environment variables.

The password is not stored in the source repository.

## Azure SQL Deployment

The database uses persistent cloud storage, so task information survives Container App restarts, scaling events, and revision deployments.

## Current Status

Tavreni currently supports:

* Full task CRUD functionality
* Persistent Azure SQL storage
* React frontend hosted in Azure
* Express API hosted in Azure Container Apps
* Dockerized backend
* GitHub Container Registry image publishing
* Backend validation
* Parameterized SQL queries
* SQL connection pooling
* Centralized error handling
* Consistent API error responses
* Automated API testing
* GitHub Actions CI
* Automated Azure Static Web Apps deployment


## Purpose

Tavreni is my first full-stack web application. It's a learning project to provide hands-on experience with:

* React
* JavaScript
* Node.js
* Express
* REST APIs
* SQL databases
* Azure SQL Database
* Azure Static Web Apps
* Azure Container Apps
* Docker
* GitHub Actions
* CI/CD
* Cloud application configuration
* Cloud security
* Application testing

## Author

Created by Chadley Tonniges.

