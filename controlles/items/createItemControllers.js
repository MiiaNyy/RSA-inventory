const {validationResult} = require("express-validator");
const querystring = require("querystring");

const getErrorMessagesFromValidation = require("../../helpers/authentication/handleNewItemValidation");
const StuffedAnimal = require("../../modules/stuffedAnimal");

async function create_item_get (req, res) {
    try {
        res.render('createItem', {
            title: "RSA - New item",
            categories: req.itemCategories,
            currentUser: req.currentUser,
        })
    } catch (e) {
        console.log(e);
    }
}

async function create_item_post (req, res) {
    const errors = validationResult(req); // Extract the validation errors from a request.
    
    if ( !errors.isEmpty() ) {
        // There are errors. Render form again with sanitized values/errors messages.
        res.render('createItem', {
            title: "RSA - New item",
            errors: getErrorMessagesFromValidation(errors.array()),
            values: req.body, // values for input fields
            currentUser: req.currentUser,
            categories: req.itemCategories,
        })
    } else {
        // Data from form is valid.
        try {
            const newStuffedAnimal = new StuffedAnimal(req.body)
            await newStuffedAnimal.save();
            
            const query = querystring.stringify({
                "popUpMessage": true,
                "newItemCreated": true,
            });
            res.redirect('/?' + query);
        } catch (e) {
            console.log(e)
        }
    }
}
module.exports = {
    create_item_get,
    create_item_post,
}
