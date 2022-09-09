const express = require("express");

// Controllers
const {
  getAllTasks,
  createTask,
  getGivenStatus,
  updateTask,
} = require("../controllers/tasks.controller");

// Middlewares
const {
  statusExist,
  taskExist,
  isTaskActive,
} = require("../middlewares/tasks.middleware");

//validators
const {
  createTasksValidators,
  updateTasksValidators,
} = require("../middlewares/validators.middleware");

const tasksRouter = express.Router();

tasksRouter.get("/", getAllTasks);

tasksRouter.get("/:status", statusExist, getGivenStatus);

tasksRouter.post("/", createTasksValidators, createTask);

tasksRouter.patch(
  "/:id",
  taskExist,
  updateTasksValidators,
  isTaskActive,
  updateTask
);

tasksRouter.delete("/:id", taskExist);

module.exports = { tasksRouter };
