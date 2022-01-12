const express = require("express");
const router = express.Router();
const {validationResult} = require('express-validator');

const StuffedAnimal = require("../../modules/stuffedAnimal");
const Category = require("../../modules/categories");
const {validateNewItemForm} = require("../../middleware/formValidation");
const requireAuth = require("../../middleware/authMiddleware");

// Create error messages that can be send to handlebars
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

function getErrorMessages(errors, itemName) {
    return errors.map(item => item.param === itemName ? item.msg : '')
}

// {{#when this.name 'eq' values.size}}selected{{/when}}
router.post('/', validateNewItemForm(), async (req, res) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        // There are errors. Render form again with sanitized values/errors messages.
        // Error messages can be returned in an array using `errors.array()`.
        const animalSizes = await Category.find({name: 'Sizes'}).lean();
        const animalBreeds = await Category.find({name: 'Animals'}).lean();
        
        res.render('createItem', {
            title: "Create new item",
            errors: getErrorMessagesFromValidation(errors.array()),
            values: req.body, // values for input fields
            currentUser: req.currentUser,
            animalSizes,
            animalBreeds,
        })
    } else {
        // Data from form is valid.
        try {
            const stuffedAnimal = new StuffedAnimal(req.body)
            await stuffedAnimal.save();
            res.redirect('/');
        } catch (e) {
            console.log(e)
        }
    }
})

router.get('/create', requireAuth, async (req, res) => {
    try {
        const animalSizes = await Category.find({name: 'Sizes'}).lean();
        const animalBreeds = await Category.find({name: 'Animals'}).lean();
        res.render('createItem', {
            title: "Create new item to inventory",
            animalSizes,
            animalBreeds,
            currentUser: req.currentUser,
        })
    } catch (e) {
        console.log(e);
    }
})

router.get('/:id', requireAuth, async (req, res) => {
    try {
        const item = await StuffedAnimal.findById(req.params.id).lean();
        const categories = await Category.find({}).lean();
        console.log('Get request detected! ID:', req.params.id);
        
        res.render('itemDetails', {
            title: "Rafael's stuffed animals",
            item,
            categories,
            sidebarIsNeeded: true,
            moveElementToRight: 'margin-left',
            currentUser: req.currentUser,
        })
    } catch (e) {
        console.log(e);
    }
    
})


module.exports = router;
