const {body} = require("express-validator");

const validateNewItemForm = [
    body('name', 'Name is too short').trim().isLength({min: 2}).escape(),
    body('animal', 'Must choose animal breed').trim(),
    body('size', 'Must choose size').trim(),
    body('color', 'Must be hex color').isHexColor(),
    body('price', 'Only numbers and must be over 0').isInt({min: 1, max: 100000},).escape(),
    body('numberInStock', 'Only numbers and must be over 0').isInt({min: 1}).escape(),
]

const validateUser = [
    body('firstName', 'First name is required')
        .trim()
        .isLength({min: 2, max: 50})
        .withMessage('Name has to be min 2 and max 50 characters long')
        .escape(),
    body('lastName', 'Last name is required')
        .trim()
        .isLength({min: 2, max: 50})
        .withMessage('Name has to be min 2 and max 50 characters long')
        .escape(),
    body('password')
        .isLength({min: 10, max: 40})
        .withMessage('Not good password. Min length 10 and max length 50 characters')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
        .withMessage('Must contain at least one uppercase and at least one lower case character.'),
    body('email', 'Not valid email')
        .isEmail()
]


module.exports = {validateNewItemForm, validateUser};
