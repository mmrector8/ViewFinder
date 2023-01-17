const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateCommentInput = [
    check('body')
        .exists({checkFalsy: true})
        .isLength({min: 5, max: 150})
        .withMessage('Comment must be between 5 and 150 characters'),
        handleValidationErrors
]
module.exports = validateCommentInput;