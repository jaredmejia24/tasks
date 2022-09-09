const express = require("express");

// Controllers

// Middlewares

const tasksRouter = express.Router();

tasksRouter.get("/");

tasksRouter.get("/:status");

tasksRouter.post("/");

tasksRouter.patch("/:id");

tasksRouter.delete("/:id");

module.exports = { tasksRouter };