const express = require("express");
const cors = require("cors");
const app = express();
const taskRoutes = require("./routes/taskRoutes");

app.use(cors())
app.use(express.json());

const PORT = 3000;

app.get("/", (request, response) => {
    response.send("Tavreni backend is running");
});

app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
    console.log(`Tavreni server is running on port ${PORT}`);
});