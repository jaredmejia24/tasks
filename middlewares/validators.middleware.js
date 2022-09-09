const { body, validationResult } = require("express-validator");

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);

    const message = errorMessages.join(". ");

    return res.status(400).json({
      status: "error",
      message,
    });
  }

  next();
};

const createUserValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("email").isEmail().withMessage("Must provide a valid email"),
  body("password")
    .isString()
    .withMessage("password must be a string")
    .notEmpty()
    .withMessage("password cannot be empty")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
  checkValidations,
];

const updateUserValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("email").isEmail().withMessage("Must provide a valid email"),
  checkValidations,
];

const createTasksValidators = [
  body("title")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),
  body("userId")
    .isInt()
    .withMessage("userId must be an integer")
    .notEmpty()
    .withMessage("userId must not be empty"),
  body("startDate")
    .isDate()
    .withMessage("startDate must be a date")
    .notEmpty()
    .withMessage("startDate must be not empty"),
  body("limitDate")
    .isDate()
    .withMessage("limitDate must be a date")
    .notEmpty()
    .withMessage("limitDate must be not empty"),
  checkValidations,
];

const updateTasksValidators = [
  body("finishDate")
    .isDate()
    .withMessage("finishDate must be a date")
    .notEmpty()
    .withMessage("finishDate must be not empty"),
  checkValidations,
];

module.exports = {
  createUserValidators,
  createTasksValidators,
  updateUserValidators,
  updateTasksValidators
};
