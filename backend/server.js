const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors())
app.use(express.json());

const PORT = 3000;

const tasks = [
    {
        id: 1,
        title: "Finish backend setup",
        description: "Create the first Express API route",
        priority: "high",
        status: "in-progress",
        dueDate: "2026-07-30"
    },
    {
        id: 2,
        title: "Review JavaScript",
        description: "Practice arrays and objects",
        priority: "medium",
        status: "todo",
        dueDate: ""
    }
]

app.get("/", (request, response) => {
    response.send("Tavreni backend is running");
});

app.get("/api/tasks", (request, response) => {
    response.json(tasks);
})

app.get("/api/tasks/:id", (request, response) => {
    const taskId = Number(request.params.id);
    const task = tasks.find((task) => task.id === taskId);
    if (!task) {
        return response.status(400).json({message: "Task not found"});
    }
    response.json(task);
})



app.put("/api/tasks/:id", (request, response) => {
    const taskId = Number(request.params.id);
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
        return response.status(404).json({message: "Task not found"});
    }
    tasks[taskIndex] = request.body;
    response.json(tasks[taskIndex]);
})

app.delete("/api/tasks/:id", (request, response) => {
    const taskId = Number(request.params.id);
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
        return response.status(404).json({message: "Task not found"});
    }
    const deletedTask = tasks.splice(taskIndex, 1);
    response.json(deletedTask[0]);
})

app.post("/api/tasks", (request, response) => {
    const taskIds = tasks.map((task) => task.id);
    let newId;
    if (taskIds.length === 0) {
        newId = 1;
    } else {
        newId = Math.max(...taskIds) + 1;
    }

    const newTask = {
        id: newId,
        ...request.body
    };

    tasks.push(newTask);

    response.status(201).json(newTask);
})

app.listen(PORT, () => {
    console.log(`Tavreni server is running on port ${PORT}`);
});


