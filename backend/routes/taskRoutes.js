const express = require("express");
const router = express.Router();
const validateTask = require("../middleware/validateTask");
const taskModel = require("../models/taskModel");
const validateTaskId = require("../middleware/validateTaskId");

router.get("/", async (request, response, next) => {

    try {
        const rows = await taskModel.getAllTasks();
        response.json(rows);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", validateTaskId, async (request, response, next) => {

    try {
        const taskId = Number(request.params.id);
        const row = await taskModel.getTaskById(taskId);
        if (!row) {
            return response.status(404).json({
                error: "Not Found",
                message: "Task not found"
            });
        }
        response.json(row);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", validateTaskId, validateTask, async (request, response, next) => {
 
    try {
        const taskId = Number(request.params.id);
        const updatedTask = await taskModel.updateTask(
            taskId,
            request.body
        );
        if (!updatedTask) {
            return response.status(404).json({
                error: "Not Found",
                message: "Task not found"
            });
        }
        response.json(updatedTask);
    } catch (error) {
        next(error);
    }
});


router.delete("/:id", validateTaskId, async (request, response, next) => {

    try {
        const taskId = Number(request.params.id);
        const deleted = await taskModel.deleteTask(taskId);
        if (!deleted) {
            return response.status(404).json({
                error: "Not Found",
                message: "Task not found"
            });
        }
        response.json({
            message: "Task deleted"
        });
    } catch (error) {
        next(error);
    }
});

router.post("/", validateTask, async (request, response, next) => {

    try {
        const newTask = await taskModel.createTask(request.body);
        response.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
});

module.exports = router;