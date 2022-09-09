// Models
const { User } = require("./users.model");
const { Task } = require("./tasks.model");

const initModels = () => {
  //1 to many User <---> Task
  User.hasMany(Task, { foreignKey: "userId" });
  Task.belongsTo(User, { foreignKey: "userId" });
};

module.exports = { initModels };
