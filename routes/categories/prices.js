const express = require("express");
const router = express.Router();

const StuffedAnimal = require("../../modules/stuffedAnimal");

const {animals, sizes} = require("../../helpers/speciesAndSizes");

router.get('/', (req, res) => {
    res.send('<h1>Prices page</h1>')
})

router.get('/:id', (req, res) => {
    if ( req.params.id === 'premium' ) {
        StuffedAnimal.find({price: {$gte: 101}}).sort({price: 1}).lean()
                     .then(result => {
                         res.render('index', {
                             title: `Category price`,
                             info:
                                 {title: `Price: 101 € <`},
                             animals,
                             sizes,
                             items: result
                         })
                     })
                     .catch(e => console.log(e))
    
    } else {
        const [minPrice, maxPrice] = getPriceRange(req.params.id);
        StuffedAnimal.find({price: {$gte: minPrice, $lte: maxPrice}}).sort({price: 1}).lean()
                     .then(result => {
                         res.render('index', {
                             title: `Category price`,
                             info:
                                 {title: `Price: ${ minPrice } - ${ maxPrice }€`},
                             animals,
                             sizes,
                             items: result
                         })
                     })
                     .catch(e => console.log(e))
        
    }
})

function getPriceRange (query) {
    switch (query) {
        case 'budget':
            return [0, 20];
        case 'medium':
            return [21, 50];
        case 'high':
            return [51, 100]
        case 'premium':
            return [101, 520]
        default:
            break;
    }
}

module.exports = router;