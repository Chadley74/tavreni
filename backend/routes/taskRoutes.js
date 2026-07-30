const express = require("express");
const router = express.Router();
const validateTask = require("../middleware/vaildateTask");
const taskModel = require("../models/taskModel");
const validateTaskId = require("../middleware/validateTaskId");

router.get("/", (request, response, next) => {
    taskModel.getAllTasks((error, rows) => {
        if (error) {
            return next(error);
        };
        response.json(rows);
    });
});

router.get("/:id", validateTaskId, (request, response, next) => {
    const taskId = Number(request.params.id);

    taskModel.getTaskById(taskId, (error, row) => {
        if (error) {
            return next(error);
        };
        if (!row) {
            return response.status(404).json({
                error: "Not Found",
                message: "Task not found"
            });
        };
        response.json(row);
    });
});

router.put("/:id", validateTaskId, validateTask, (request, response, next) => {
    const taskId = Number(request.params.id);

    taskModel.updateTask(taskId, request.body, (error, updatedTask) => {
        if (error) {
            return next(error);
        };

        if (!updatedTask) {
            return response.status(404).json({
                error: "Not Found",
                message: "Task not found"
            });
        };

        response.json(updatedTask);
    });
});


router.delete("/:id", validateTaskId, (request, response, next) => {
    const taskId = Number(request.params.id);

    taskModel.deleteTask(taskId, (error, changes) => {
            if (error) {
                return next(error);
            }

            if (changes === 0) {
                return response.status(404).json({
                    error: "Not Found",
                    message: "Task not found"
                });
            }
            response.json({
                message: "Task deleted"
            });
    });
});

router.post("/", validateTask, (request, response, next) => {

    taskModel.createTask(request.body, (error, newTask) => {
        if (error) {
            return next(error);
        }

        response.status(201).json(newTask);
    });
});

module.exports = router;