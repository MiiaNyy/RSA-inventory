const express = require("express");
const StuffedAnimal = require("../modules/stuffedAnimal");
const Category = require("../modules/categories");
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({}).lean();
        const inventory = await StuffedAnimal.find({}).sort({createdAt: -1}).lean();
        
        const cookies = req.cookies;
        
        res.render('inventoryTable', {
            title: "Rafael's stuffed animals",
            info: {
                title: 'Welcome to the stores inventory app',
                text: 'Below you can browse all of the items in the current store inventory. You can' +
                    ' search specific items by three different category: size, price or animal.'
            },
            categories,
            items: inventory,
            sidebarIsNeeded: true,
            moveElementToRight: 'margin-left',
            currentUser: cookies.currentUser
        })
    } catch (e) {
        console.log('Error happened during category and inventory fetching:', e)
    }
})


module.exports = router;
