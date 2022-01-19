// Create error messages when creating new item. These can be send to handlebars and shown to user
function getErrorMessagesFromValidation (err) {
    return {
        name: getErrorMessages(err, 'name'),
        animal: getErrorMessages(err, 'animal'),
        size: getErrorMessages(err, 'size'),
        color: getErrorMessages(err, 'color'),
        price: getErrorMessages(err, 'price'),
        numberInStock: getErrorMessages(err, 'numberInStock'),
    }
}

function getErrorMessages (errors, itemName) {
    return errors.map(item => item.param === itemName ? item.msg : '')
}

module.exports = getErrorMessagesFromValidation;
