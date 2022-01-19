const Category = require("../modules/categories");
const StuffedAnimal = require("../modules/stuffedAnimal");

const querystring = require("querystring");
const {validationResult} = require("express-validator");

const getErrorMessagesFromValidation = require("../helpers/authentication/handleNewItemValidation");

async function create_item_get (req, res) {
    try {
        res.render('createItem', {
            title: "Create new item to inventory",
            animalSizes: await Category.find({name: 'Sizes'}).lean(),
            animalBreeds: await Category.find({name: 'Animals'}).lean(),
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
            title: "Create new item",
            errors: getErrorMessagesFromValidation(errors.array()),
            values: req.body, // values for input fields
            currentUser: req.currentUser,
            animalSizes: await Category.find({name: 'Sizes'}).lean(),
            animalBreeds: await Category.find({name: 'Animals'}).lean(),
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

async function item_details_get (req, res) {
    try {
        res.render('itemDetails', {
            title: "Rafael's stuffed animals",
            item: await StuffedAnimal.findById(req.params.id).lean(),
            categories: await Category.find({}).lean(),
            sidebarIsNeeded: true,
            moveElementToRight: 'margin-left',
            currentUser: req.currentUser,
        })
    } catch (e) {
        console.log(e);
    }
}

async function item_details_post (req, res) {
    try {
        if ( req.currentUser ) { // Only if user is logged in, removing item is possible
            StuffedAnimal.findByIdAndRemove(req.params.id, (err) => {
                if ( !err ) { // Removing element from db successful
                    const query = querystring.stringify({
                        "popUpMessage": true,
                        "itemIsDeleted": true,
                    });
                    res.redirect('/?' + query);
                } else {
                    console.log(err)
                }
            })
        } else {
            res.send('Login required before deleting item!')
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    create_item_get,
    create_item_post,
    item_details_get,
    item_details_post,
}
