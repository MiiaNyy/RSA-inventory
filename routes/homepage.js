const express = require("express");
const StuffedAnimal = require("../modules/stuffedAnimal");
const Category = require("../modules/categories");
const router = express.Router();

const requireAuth = require('../middleware/authMiddleware');

router.get('/', requireAuth, async (req, res) => {
    try {
        const categories = await Category.find({}).lean();
        const inventory = await StuffedAnimal.find({}).sort({createdAt: -1}).lean();
        console.log('Homepage query is:', req.query)
        res.render('inventoryTable', {
            title: "Rafael's Stuffed Animals",
            info: {
                title: 'Welcome to the stores inventory.',
                text: 'Below you can browse all of the items in the store inventory. Click specific item to know' +
                    ' more information about it. If you like to create new or delete current items, please login first!'
            },
            categories,
            items: inventory,
            sidebarIsNeeded: true,
            moveElementToRight: 'margin-left',
            currentUser: req.currentUser,
            itemIsDeleted: req.query.itemIsDeleted,
        })
    } catch (e) {
        console.log('Error happened during category and inventory fetching:', e);
    }
})


module.exports = router;
