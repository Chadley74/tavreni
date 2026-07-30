const express = require("express");
const router = express.Router();
const validateTask = require("../middleware/vaildateTask");
const taskModel = require("../models/taskModel");

router.get("/", (request, response) => {
    taskModel.getAllTasks((error, rows) => {
        if (error) {
            return response.status(500).json({
                message: "Unable to load tasks"
            });
        };
        response.json(rows);
    });
});

router.get("/:id", (request, response) => {
    const taskId = Number(request.params.id);
    taskModel.getTaskById(taskId, (error, row) => {
        if (error) {
            return response.status(500).json({
                message: "Unable to load task"
            });
        };
        if (!row) {
            return response.status(404).json({
                message: "Task not found"
            });
        };
        response.json(row);
    });
});

router.put("/:id", validateTask, (request, response) => {
    const taskId = Number(request.params.id);

    taskModel.updateTask(taskId, request.body, (error, updatedTask) => {
        if (error) {
            return response.status(500).json({
                message: "Unable to update task"
            });
        };

        if (!updatedTask) {
            return response.status(404).json({
                message: "Task not found"
            });
        };

        response.json(updatedTask);
    });
});


router.delete("/:id", (request, response) => {
    const taskId = Number(request.params.id);
    
    taskModel.deleteTask(taskId, (error, changes) => {
            if (error) {
                return response.status(500).json({
                    message: "Unable to delete task"
                });
            }

            if (changes === 0) {
                return response.status(404).json({
                    message: "Task not found"
                });
            }
            response.json({
                message: "Task deleted"
            });
    });
});

router.post("/", validateTask, (request, response) => {

    taskModel.createTask(request.body, (error, newTask) => {
        if (error) {
            return response.status(500).json({
                message: "Unable to create task"
            });
        }

        response.status(201).json(newTask);
    });
});

module.exports = router;