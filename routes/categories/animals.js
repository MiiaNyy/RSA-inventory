const express = require("express");
const router = express.Router();

const StuffedAnimal = require("../../modules/stuffedAnimal");
const Category = require("../../modules/categories");
const requireAuth = require("../../middleware/authMiddleware");

router.get('/', (req, res) => {
    res.send('<h1>Animals page</h1>')
})

router.get('/:id', requireAuth, async (req, res) => {
    try {
        const id = req.params.id;
        const animal = await StuffedAnimal.find({animal: id}).sort({animal: 1}).lean()
        const categories = await Category.find({}).lean();
        
        res.render('inventoryTable', {
            title: `Animals`,
            info: {title: `Animals: ${ id.toUpperCase() }`},
            categories,
            items: animal,
            sidebarIsNeeded: true,
            moveElementToRight: 'margin-left',
            currentUser: req.currentUser,
        })
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;
