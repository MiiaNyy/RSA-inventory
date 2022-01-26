const {validationResult} = require("express-validator");
const StuffedAnimal = require("../modules/stuffedAnimal");

async function api_item_post(req, res) {
    const errors = validationResult(req);
    
    if ( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array()});
    } else {// Data from form is valid.
        try {
            const newStuffedAnimal = new StuffedAnimal(req.body)
            await newStuffedAnimal.save();
            res.send('Success!! Added new item to inventory!')
        } catch (e) {
            console.log(e);
        }
    }
}

async function api_item_delete(req, res) {
    try {
        StuffedAnimal.findByIdAndRemove(req.params.id, (err, docs) => {
            if ( err ) {
                console.log(err)
            } else {
                res.send('Item removed successfully!')
            }
        });
    } catch (e) {
        console.log(e);
    }
}

async function api_item_get(req, res) {
    try {
        const item = await StuffedAnimal.findById(req.params.id).lean();
        res.json(item);
    } catch (e) {
        res.status(404).send(`No item found by ID: ${ req.params.id }`);
    }
}

module.exports = {
    api_item_post,
    api_item_delete,
    api_item_get,
}
