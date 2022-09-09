const { app } = require("./app");
const { db } = require("./utils/database.utilis");

//import init models
const { initModels } = require('./Models/initModels');

const startServer = async () => {
  try {
    await db.authenticate();

    initModels();
    await db.sync();

    // Set server to listen
    const PORT = 4000;

    app.listen(PORT, () => {
      console.log("Express app running!");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
