const { Task } = require("../Models/tasks.model");
const { User } = require("../Models/users.model");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ include: User });

    res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getGivenStatus = async (req, res) => {
  try {
    const { status } = req.params;

    const tasks = await Task.findAll({ where: { status }, include: User });

    res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const createTask = async (req, res) => {
  try {
    const { title, userId, startDate, limitDate } = req.body;

    const newTask = await Task.create({ title, userId, startDate, limitDate });

    res.status(201).json({
      status: "success",
      data: {
        newTask,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async (req, res) => {
  try {
    const { task } = req;
    const { finishDate } = req.body;
    let isOnTime = false;

    if (new Date(finishDate).getTime() <= new Date(task.limitDate).getTime()) {
      isOnTime = true;
    }

    const updatedTask = await task.update({
      finishDate,
      status: isOnTime ? "completed" : "late",
    });

    res.status(200).json({
      status: "success",
      data: {
        updatedTask,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { task } = req;
    await task.update({ status: "cancelled" });

    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllTasks,
  getGivenStatus,
  createTask,
  updateTask,
  deleteTask,
};
