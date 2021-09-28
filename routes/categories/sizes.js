const express = require("express");
const router = express.Router();

const StuffedAnimal = require("../../modules/stuffedAnimal");

const {animals, sizes} = require("../../helpers/animalsAndSizes");
router.get('/', (req, res) => {
    res.send('<h1>Sizes page</h1>')
})

router.get('/:id', (req, res) => {
    const size = req.params.id;
    
    StuffedAnimal.find({size}).sort({createdAt: -1}).lean()
                 .then(result => {
                     res.render('inventoryTable', {
                         title: `Sizes`,
                         info:
                             {title: `Size: ${ size }`},
                         animals,
                         sizes,
                         items: result,
                     })
                 })
                 .catch(e => console.log(e))
})

module.exports = router;