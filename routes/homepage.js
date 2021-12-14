const express = require("express");
const StuffedAnimal = require("../modules/stuffedAnimal");
const Category = require("../modules/categories");
const router = express.Router();

const requireAuth = require('../middleware/authMiddleware');

router.get('/', requireAuth, async (req, res) => {
    try {
        const categories = await Category.find({}).lean();
        const inventory = await StuffedAnimal.find({}).sort({createdAt: -1}).lean();
    
        res.render('inventoryTable', {
            title: "Rafael's Stuffed Animals",
            info: {
                title: 'Welcome to the stores inventory app',
                text: 'Below you can browse all of the items in the current store inventory. You can' +
                    ' search specific items by three different category: size, price or animal.'
            },
            categories,
            items: inventory,
            sidebarIsNeeded: true,
            moveElementToRight: 'margin-left',
            currentUser: req.currentUser,
        })
    } catch (e) {
        console.log('Error happened during category and inventory fetching:', e);
    }
})


module.exports = router;
