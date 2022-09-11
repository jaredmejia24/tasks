//import bcrypt
const bcrypt = require("bcryptjs");

const { Task } = require("../Models/tasks.model");
const { User } = require("../Models/users.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { status: "active" },
      attributes: { exclude: "password" },
      include: Task,
    });

    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Encrypt the password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Remove password from response
    newUser.password = undefined;

    res.status(201).json({
      status: "success",
      data: {
        newUser,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { user } = req;
    const { name, email } = req.body;

    const updatedUser = await user.update({ name, email });

    user.password = undefined;

    res.status(200).json({
      status: "success",
      data: {
        updatedUser,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user } = req;
    await user.update({ status: "disabled" });

    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
