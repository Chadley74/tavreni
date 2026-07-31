const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
    response.send("Tavreni backend is running");
});

app.use("/api/tasks", taskRoutes);

app.use((request, response) => {
    response.status(400).json({
        error: "Not Found",
        message: "API route not found"
    });
});

app.use(errorHandler);

module.exports = app;