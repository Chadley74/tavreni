const db = require("../database");

function getAllTasks(callback) {
    db.all("SELECT * FROM tasks", [], callback);
}

function getTaskById(taskId, callback) {
    db.get("SELECT * FROM tasks WHERE id = ?", [taskId], callback);
}

function createTask(task, callback) {
    const {
        title,
        description,
        priority,
        status,
        dueDate,
        dateCreated
    } = task;

    const sql = `
    INSERT INTO tasks (
      title,
      description,
      priority,
      status,
      dueDate,
      dateCreated
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
        title,
        description,
        priority,
        status,
        dueDate,
        dateCreated
    ];

    db.run(sql, values, function(error) {
        if (error) {
            return callback(error);
        }

        callback(null, {
            id: this.lastID,
            title,
            description,
            priority,
            status,
            dueDate,
            dateCreated
        });
    });
}

function updateTask(taskId, task, callback) {
    const {
        title,
        description,
        priority,
        status,
        dueDate,
        dateCreated
    } = task;

    const sql = `
      UPDATE tasks
      SET
        title = ?,
        description = ?,
        priority = ?,
        status = ?,
        dueDate = ?,
        dateCreated = ?
      WHERE id = ?
    `;

    const values = [
        title,
        description,
        priority,
        status,
        dueDate,
        dateCreated,
        taskId
    ];

    db.run(sql, values, function (error) {
        if (error) {
            return callback(error);
        }

        if (this.changes === 0) {
            return callback(null, null);
        }

        callback(null, {
            id: taskId,
            title,
            description,
            priority,
            status,
            dueDate,
            dateCreated
        });
    });
}

function deleteTask(taskId, callback) {
    db.run(
        "DELETE FROM tasks WHERE id = ?",
        [taskId],
        function (error) {
            if (error) {
                return callback(error);
            }

            callback(null, this.changes);
        }
    );
}
module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};