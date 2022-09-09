const express = require("express");
const { tasksRouter } = require("./Routes/tasks.routes");
const { usersRouter } = require("./Routes/users.routes");

//init express app
const app = express();

//enable to receive json
app.use(express.json());

// Define endpoints
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/tasks", tasksRouter);

// Catch non-existing endpoints
app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `${req.method} ${req.url} does not exists in our server`,
  });
});

module.exports = { app };
