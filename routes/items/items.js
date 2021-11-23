const express = require("express");
const router = express.Router();
const {body, validationResult} = require('express-validator');

const StuffedAnimal = require("../../modules/stuffedAnimal");
const Category = require("../../modules/categories");
const validateNewItemForm = require("../../middleware/formValidation");

router.post('/', validateNewItemForm(), async (req, res) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    console.log('New post request! Body is: ', req.body)
    
    if ( !errors.isEmpty() ) {
        // There are errors. Render form again with sanitized values/errors messages.
        // Error messages can be returned in an array using `errors.array()`.
        return res.status(400).json({errors: errors.array()});
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

router.get('/create', async (req, res) => {
    try {
        const animalSizes = await Category.find({name: 'Sizes'}).lean();
        const animalBreeds = await Category.find({name: 'Animals'}).lean();
        res.render('createItem', {
            title: "Create new item to inventory",
            animalSizes,
            animalBreeds,
            moveElementToRight: '',
        })
    } catch (e) {
        console.log(e);
    }
})

router.get('/:id', async (req, res) => {
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
        })
    } catch (e) {
        console.log(e);
    }
    
})




module.exports = router;
