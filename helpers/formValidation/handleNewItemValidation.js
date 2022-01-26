const mapErrorMessages = require("../mapErrorMessages");
// Create error messages when creating new item. These can be send to handlebars and shown to user
function handleNewItemValidation (err) {
    return {
        name: mapErrorMessages(err, 'name'),
        animal: mapErrorMessages(err, 'animal'),
        size: mapErrorMessages(err, 'size'),
        color: mapErrorMessages(err, 'color'),
        price: mapErrorMessages(err, 'price'),
        numberInStock: mapErrorMessages(err, 'numberInStock'),
    }
}
module.exports = handleNewItemValidation;
