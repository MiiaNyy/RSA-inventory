const express = require("express");
const router = express.Router();

const StuffedAnimal = require("../../modules/stuffedAnimal");
const Category = require("../../modules/categories");

router.get('/', (req, res) => {
    res.send('<h1>Prices page</h1>')
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const [minPrice, maxPrice] = getPriceRange(id);
        const items = await StuffedAnimal.find({price: {$gte: minPrice, $lte: maxPrice}}).sort({price: 1}).lean();
        const categories = await Category.find({}).lean();
        
        res.render('inventoryTable', {
            title: `Category price`,
            info:
                {title: `Price: ${ minPrice }€ ${ id !== 'premium' ? '- ' + maxPrice + '€' : '>' }`},
            categories,
            items,
            sidebarIsNeeded: true,
            moveElementToRight: 'margin-left',
        })
    } catch (e) {
        console.log(e);
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
