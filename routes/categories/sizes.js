const express = require("express");
const router = express.Router();

const StuffedAnimal = require("../../modules/stuffedAnimal");

const {animals, sizes} = require("../../helpers/speciesAndSizes");
router.get('/', (req, res) => {
    res.send('<h1>Sizes page</h1>')
})

router.get('/:id', (req, res) => {
    StuffedAnimal.find({size: req.params.id}).sort({createdAt: -1}).lean()
                 .then(result => {
                     res.render('index', {
                         title: `Sizes`,
                         info:
                             {title: `Size: ${ req.params.id }`},
                         animals,
                         sizes,
                         items: result
                     })
                 })
                 .catch(e => console.log(e))
})

module.exports = router;