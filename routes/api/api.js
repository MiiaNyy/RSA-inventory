const StuffedAnimal = require("../../modules/stuffedAnimal");

const express = require("express");
const router = express.Router();
const {validationResult} = require('express-validator');
const validateNewItemForm = require("../../middleware/validateNewItemForm");

router.post('/', validateNewItemForm(), async (req, res) => {
    
    const errors = validationResult(req);
    console.log('New post request! Body is: ', req.body)
    
    if ( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array()});
    } else {
        // Data from form is valid.
        try {
            const stuffedAnimal = new StuffedAnimal(req.body)
            await stuffedAnimal.save();
            res.send('Success!! Added new item to inventory!')
        } catch (e) {
            console.log(e)
        }
    }
})

router.get('/:id', async (req, res) => {
    try {
        const item = await StuffedAnimal.findById(req.params.id).lean();
        console.log('item is: ', item);
        console.log('API get request detected! ID:', req.params.id);
        res.json(item);
        
    } catch (e) {
        console.log(e);
    }
    
})

module.exports = router;
