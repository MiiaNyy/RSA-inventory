const express = require("express");
const StuffedAnimal = require("../modules/stuffedAnimal");
const Category = require("../modules/categories");
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({}).lean();
        const inventory = await StuffedAnimal.find({}).sort({createdAt: -1}).lean();
        
        res.render('inventoryTable', {
            title: "Rafael's stuffed animals",
            info: {
                title: 'Welcome to the stores inventory app',
                text: 'Below you can browse all of the items in the current store inventory. You can' +
                    ' also search specific items by category or price'
            },
            categories,
            items: inventory,
            sidebarIsNeeded: true,
        })
    } catch (e) {
        console.log('Error happened during category and inventory fetching:', e)
    }
})

module.exports = router;