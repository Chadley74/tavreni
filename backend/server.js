const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (request, response) => {
    response.send("Tavreni backend is running");
});

app.listen(PORT, () => {
    console.log(`Tavreni server is running on port ${PORT}`);
});

