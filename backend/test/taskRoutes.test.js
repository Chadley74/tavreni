const request = require("supertest");
const app = require("../app");
const db = require("../database");

describe("Tavreni API", () => {
    beforeAll((done) => {
        db.run(`
            CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            priority TEXT NOT NULL,
            status TEXT NOT NULL,
            dueDate TEXT,
            dateCreated TEXT NOT NULL
            )`,
        done
        );
    });

    beforeEach((done) => {
        db.run("DELETE FROM tasks", done);
    });

    test("GET / returns the backend status message", async () => {
        const response = await request(app).get("/");

        expect(response.status).toBe(201);
        expect(response.text).toBe("Tavreni backend is running");
    });

    test("GET /api/tasks returns an array", async () => {
        const response = await request(app).get("/api/tasks");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("POST /api/tasks create a task", async () => {
        const newTask = {
            title: "Automated test task",
            description: "Created by Jest and Supertest",
            priority: "medium",
            status: "todo",
            dueDate: "",
            dateCreated: new Date().toISOString()
        };

        const response = await request(app).post("/api/tasks").send(newTask);

        expect(response.status).toBe(201);
        expect(response.body.title).toBe(newTask.title);
        expect(response.body.priority).toBe("medium");
        expect(response.body.status).toBe("todo");
        expect(response.body.id).toBeDefined();
    });

    test("PUT /api/tasks/:id updates a task", async () => {
        const newTask = {
            title: "Task before update",
            description: "Original description",
            priority: "low",
            status: "todo",
            dueDate: "",
            dateCreated: new Date().toISOString()
        };

        const createResponse = await request(app).post("/api/tasks").send(newTask);

        const taskId = createResponse.body.id;

        const updatedTask = {
            title: "Task after update",
            description: "Updated description",
            priority: "high",
            status: "in-progress",
            dueDate: "",
            dateCreated: newTask.dateCreated
        };
        
        const updateResponse = await request(app).put(`/api/tasks/${taskId}`).send(updatedTask);

        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body.id).toBe(taskId);
        expect(updateResponse.body.title).toBe(updatedTask.title);
        expect(updateResponse.body.priority).toBe("high");
        expect(updateResponse.body.status).toBe("in-progress");
    });

    test("DELETE /api/tasks/:id deletes a task", async () => {
        const newTask = {
            title: "Task to delete",
            description: "Created for the delete test",
            priority: "medium",
            status: "todo",
            dueDate: "",
            dateCreated: new Date().toISOString()
        };

        const createResponse = await request(app).post("/api/tasks").send(newTask);

        const taskId = createResponse.body.id;

        const deleteResponse = await request(app).delete(`/api/tasks/${taskId}`);

        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse.body.message).toBe("Task deleted");

        const getResponse = await request(app).get(`/api/tasks/${taskId}`);

        expect(getResponse.status).toBe(404);
        expect(getResponse.body.error).toBe("Not Found");
        expect(getResponse.body.message).toBe("Task not found");
    });

    test("GET /api/tasks/:id rejects an invalid task ID", async () => {
        const response = await request(app).get("/api/tasks/abc");

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Bad Request");
        expect(response.body.message).toBe("Task ID must be a positive integer");
    });

    test("GET /api/tasks/:id returns 404 for a missing task", async () => {
        const response = await request(app).get("/api/tasks/99999999");

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Not Found");
        expect(response.body.message).toBe("Task not found");
    });

    test("POST /api/tasks rejects invalid title data", async () => {
        const invalidTask = {
            title: "",
            priority: "low",
            status: "todo",
            dateCreated: new Date().toISOString()
        };

        const response = await request(app).post("/api/tasks").send(invalidTask);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Bad Request");
        expect(response.body.message).toBe("Title, priority, status, and dateCreated are required");
    });

    test("POST /api/tasks rejects invalid priority data", async () => {
        const invalidTask = {
            title: "Task with invalid priority",
            priority: "urgent",
            status: "todo",
            dateCreated: new Date().toISOString()
        };

        const response = await request(app).post("/api/tasks").send(invalidTask);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Bad Request");
        expect(response.body.message).toBe("Priority must be low, medium, or high");
    });

        test("POST /api/tasks rejects invalid status data", async () => {
        const invalidTask = {
            title: "Task with invalid status",
            priority: "medium",
            status: "sometime",
            dateCreated: new Date().toISOString()
        };

        const response = await request(app).post("/api/tasks").send(invalidTask);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Bad Request");
        expect(response.body.message).toBe("Status must be todo, in-progress, or completed");
    });

    test("Unknown API routes return 404", async () => {
        const response = await request(app).get("/api/unknown");

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Not Found");
        expect(response.body.message).toBe("API route not found");
    });
});