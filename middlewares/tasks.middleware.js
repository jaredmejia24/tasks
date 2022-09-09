const { Task } = require("../Models/tasks.model");

const statusExist = (req, res, next) => {
  const { status } = req.params;

  if (
    status !== "active" &&
    status !== "completed" &&
    status !== "late" &&
    status !== "cancelled"
  ) {
    return res.status(404).json({
      status: "success",
      message: `${status} is not a valid status`,
    });
  }

  next();
};

const taskExist = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ where: { id } });

    if (!task) {
      return res.status(204).json({
        status: "success",
        message: "Task not found",
      });
    }

    req.task = task;
    next();
  } catch (error) {
    console.log(error);
  }
};

const isTaskActive = async (req, res, next) => {
  try {
    const { task } = req;

    if (task.status !== "active") {
      return res.status(400).json({
        status: "error",
        message: "status must be active",
      });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};


module.exports = { statusExist, taskExist, isTaskActive };
