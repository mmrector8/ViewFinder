const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateLocationInput = [
  check("string") //check is wrong, needs to be a key/"column" name 
    .exists({ checkFalsy: true })
    .isLength({ min: 2, max: 50 })
    .withMessage("Location must be between 5 and 50 characters"),
  handleValidationErrors,
];

module.exports = validateLocationInput;