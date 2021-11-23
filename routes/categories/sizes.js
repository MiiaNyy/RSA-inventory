const express = require("express");
const router = express.Router();

const StuffedAnimal = require("../../modules/stuffedAnimal");
const Category = require("../../modules/categories");

router.get('/', (req, res) => {
    res.send('<h1>Sizes page</h1>')
})

router.get('/:id', async (req, res) => {
    try {
        const size = req.params.id;
        const items = await StuffedAnimal.find({size}).sort({createdAt: -1}).lean();
        const categories = await Category.find({}).lean();
        
        res.render('inventoryTable', {
            title: `Sizes`,
            info:
                {title: `Size: ${ size.toUpperCase() }`},
            categories,
            items: items,
            sidebarIsNeeded: true,
            moveElementToRight: 'margin-left',
        })
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;
