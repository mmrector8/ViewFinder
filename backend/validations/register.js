const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateRegisterInput = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Email is invalid"),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 2, max: 30 })
    .withMessage("Username must be between 2 and 30 characters"),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6, max: 30 })
    .withMessage("Password must be between 6 and 30 characters"),
  check("bio")
    .isLength({min: 5, max: 150})
    .withMessage("Your user bio must be between 5 and 150 characters"),
  handleValidationErrors,
];

module.exports = validateRegisterInput;
