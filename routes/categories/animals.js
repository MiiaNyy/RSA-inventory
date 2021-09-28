const express = require("express");
const router = express.Router();

const StuffedAnimal = require("../../modules/stuffedAnimal");

const {animals, sizes} = require("../../helpers/animalsAndSizes");

router.get('/', (req, res) => {
    res.send('<h1>Animals page</h1>')
})

router.get('/:id', (req, res) => {
    StuffedAnimal.find({animal: req.params.id}).sort({animal: 1}).lean()
                 .then(result => {
                     res.render('inventoryTable', {
                         title: `Animals`,
                         info:
                             {title: `Animals: ${ req.params.id }`},
                         animals,
                         sizes,
                         items: result
                     })
                 })
                 .catch(e => console.log(e))
})

module.exports = router;