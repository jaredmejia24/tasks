const { User } = require("../Models/users.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ where: { status: "active" } });

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

    const newUser = await User.create({ name, email, password });

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
