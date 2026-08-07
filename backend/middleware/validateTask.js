function validateTask(request, response, next) {
    const {
        title,
        description,
        priority,
        status,
        dueDate
    } = request.body;

    /*Validate required task fields are there*/
    if (!title?.trim() || !priority || !status) {
        return response.status(400).json({
            error: "Bad Request",
            message: "Title, priority, and status are required"
        });
    }

    /*Validate priority - only "low", "medium", "high" */
    const allowedPriorities = ["low", "medium", "high"];

    if (!allowedPriorities.includes(priority)) {
        return response.status(400).json({
            error: "Bad Request",
            message: "Priority must be low, medium, or high"
        });
    }

    /*Validate status - only "todo", "in-progress", "completed" */
    const allowedStatuses = ["todo", "in-progress", "completed"];

    if (!allowedStatuses.includes(status)) {
        return response.status(400).json({
            error: "Bad Request",
            message: "Status must be todo, in-progress, or completed"
        });
    }

    next();
}

module.exports = validateTask;