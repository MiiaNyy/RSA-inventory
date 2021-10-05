const express = require("express");
const router = express.Router();
const {body, validationResult} = require('express-validator');

const StuffedAnimal = require("../../modules/stuffedAnimal");
const Category = require("../../modules/categories");

function validateNewItemForm () {
    return [
        body('name', 'Name is too short').trim().isLength({min: 2}).escape(),
        body('animal', 'Must choose animal breed').trim(),
        body('size', 'Must choose size').trim(),
        body('color', 'Choose color').isHexColor(),
        body('price', 'Only numbers and must be over 0').isInt({min: 1}).escape(),
        body('stock', 'Only numbers and must be over 0').isInt({min: 1}).escape(),
    ]
}

router.post('/', validateNewItemForm(), (req, res) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    
    if ( !errors.isEmpty() ) {
        // There are errors. Render form again with sanitized values/errors messages.
        // Error messages can be returned in an array using `errors.array()`.
        return res.status(400).json({errors: errors.array()});
    } else {
        // Data from form is valid.
        res.json(req.body);
    }
})

router.get('/create', async (req, res) => {
    try {
        const animalSizes = await Category.find({name: 'Sizes'}).lean();
        const animalBreeds = await Category.find({name: 'Animals'}).lean();
        res.render('createItem', {
            title: "Create new item to inventory",
            animalSizes,
            animalBreeds,
        })
    } catch (e) {
        console.log(e);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const item = await StuffedAnimal.findById(req.params.id).lean();
        const categories = await Category.find({}).lean();
        
        res.render('itemDetails', {
            title: "Rafael's stuffed animals",
            item,
            categories,
            sidebarIsNeeded: true,
        })
    } catch (e) {
        console.log(e);
    }
    
})


module.exports = router;