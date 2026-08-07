const taskRepository = require("../database/taskRepository");

async function getAllTasks() {
    return await taskRepository.getAllTasks();
};

async function getTaskById(taskId) {
    return await taskRepository.getTaskById(taskId);
};

async function createTask(task) {
    return await taskRepository.createTask(task);
};

async function updateTask(taskId, task) {
    return await taskRepository.updateTask(taskId, task);
};

async function deleteTask(taskId) {
    return await taskRepository.deleteTask(taskId);
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};
