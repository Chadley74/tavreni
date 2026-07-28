const express = require("express");
const cors = require("cors");
const db = require("./database");
const app = express();

app.use(cors())
app.use(express.json());

const PORT = 3000;

app.get("/", (request, response) => {
    response.send("Tavreni backend is running");
});

app.get("/api/tasks", (request, response) => {
    db.all("SELECT * FROM tasks", [], (error, rows) => {
        if (error) {
            return response.status(500).json({
                message: "Unable to load tasks"
            });
        }

        response.json(rows);
    })
})

app.get("/api/tasks/:id", (request, response) => {
    const taskId = Number(request.params.id);
    /*Get one row. ? is a placeholder and replaced with taskId. Handling for errors and no row*/
    db.get(
        "SELECT * FROM tasks WHERE id = ?",
        [taskId],
        (error, row) => {
            if (error) {
                return response.status(500).json({
                    message: "Unable to load task"
                });
            }

            if (!row) {
                return response.status(404).json({
                    message: "Task not found"
                });
            }
            response.json(row);
        }
    )
});



app.put("/api/tasks/:id", (request, response) => {
    const taskId = Number(request.params.id);
    
    const {
        title,
        description,
        priority,
        status,
        dueDate,
        dateCreated
    } = request.body;

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
            return response.status(500).json({
                message: "Unable to update task"
            });
        }
        /* How many rows changed? 1 - task was found. 0 - no task matched that ID*/
        if (this.changes === 0) {
            return response.status(404).json({
                message: "Task not found"
            });
        }

        const updatedTask = {
            id: taskId,
            title,
            description,
            priority,
            status,
            dueDate,
            dateCreated
        };

        response.json(updatedTask);
    });
});


app.delete("/api/tasks/:id", (request, response) => {
    const taskId = Number(request.params.id);
    
    db.run(
        "DELETE FROM tasks WHERE id = ?",
        [taskId],
        function (error) {
            if (error) {
                return response.status(500).json({
                    message: "Unable to delete task"
                });
            }

            if (this.changes === 0) {
                return response.status(404).json({
                    message: "Task not found"
                });
            }
            response.json({
                message: "Task deleted"
            });
        }
    )
})

app.post("/api/tasks", (request, response) => {
    /*Pull the task fields from the JSON request */
    const {
        title,
        description,
        priority,
        status,
        dueDate,
        dateCreated
    } = request.body;
    
    /*SQL inserts a new row. Question marks are placeholders*/
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

    /* SQL insert, handle any database error, build task object, and send back to React. Regular function used versus arrow to use this.lastID*/
    db.run(sql, values, function(error) {
        if (error) {
            return response.status(500).json({
                message: "Unable to create task"
            });
        }

        const newTask = {
            id: this.lastID,
            title,
            description,
            priority,
            status,
            dueDate,
            dateCreated
        };
        response.status(201).json(newTask);
    })
})

app.listen(PORT, () => {
    console.log(`Tavreni server is running on port ${PORT}`);
});


