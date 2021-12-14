const StuffedAnimal = require("../../modules/stuffedAnimal");

const express = require("express");
const router = express.Router();
const {validationResult} = require('express-validator');
const {validateNewItemForm} = require("../../middleware/formValidation")

router.post('/', validateNewItemForm(), async (req, res) => {
    const errors = validationResult(req);
    console.log('New post request! Body is: ', req.body)
    
    if ( !errors.isEmpty() ) {
        console.log('validation failed!:', errors);
        return res.status(400).json({errors: errors.array()});
    } else {
        // Data from form is valid.
        try {
            const stuffedAnimal = new StuffedAnimal(req.body)
            await stuffedAnimal.save();
            res.send('Success!! Added new item to inventory!')
        } catch (e) {
            console.log(e);
        }
    }
})

router.post('/delete/:id', async (req, res) => {
    console.log('Delete request received...');
    console.log('ID:', req.params.id);
    try {
        StuffedAnimal.findByIdAndRemove(req.params.id, (err, docs) => {
            if ( err ) {
                console.log(err)
            } else {
                console.log("Removed item : ", docs);
                res.send('Item removed successfully!')
            }
        });
    } catch (e) {
        console.log(e);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const item = await StuffedAnimal.findById(req.params.id).lean();
        console.log('item is: ', item);
        console.log('API get request detected! ID:', req.params.id);
        res.json(item);
    } catch (e) {
        res.status(404).send(`No item found by ID: ${req.params.id}`);
        
        console.log(e);
    }
})

module.exports = router;
