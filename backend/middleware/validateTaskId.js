function validateTaskId(request, response, next) {
    const taskId = Number(request.params.id);

    if (!Number.isInteger(taskId) || taskId <= 0) {
        return response.status(400).json({
            error: "Bad Request",
            message: "Task ID must be a positive integer"
        });
    }

    next();
};

module.exports = validateTaskId;