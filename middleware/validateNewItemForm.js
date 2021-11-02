const {body} = require("express-validator");

function validateNewItemForm () {
    return [
        body('name', 'Name is too short').trim().isLength({min: 2}).escape(),
        body('animal', 'Must choose animal breed').trim(),
        body('size', 'Must choose size').trim(),
        body('color', 'Must be hex color').isHexColor(),
        body('price', 'Only numbers and must be over 0').isInt({min: 1}).escape(),
        body('numberInStock', 'Only numbers and must be over 0').isInt({min: 1}).escape(),
    ]
}

module.exports = validateNewItemForm;
