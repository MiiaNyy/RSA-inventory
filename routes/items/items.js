const express = require("express");
const StuffedAnimal = require("../../modules/stuffedAnimal");
const Category = require("../../modules/categories");
const router = express.Router();

router.get('/create', async (req, res) => {
    try {
        const animalSizes = await Category.find({name: 'Sizes'}).lean();
        const animalBreeds = await Category.find({name: 'Animals'}).lean();
        res.render('createItem', {
            title: "Create new item to inventory",
            animalSizes,
            animalBreeds,
        })
    } catch (e) {
        console.log(e);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const item = await StuffedAnimal.findById(req.params.id).lean();
        const categories = await Category.find({}).lean();
        
        res.render('itemDetails', {
            title: "Rafael's stuffed animals",
            item,
            categories,
            sidebarIsNeeded: true,
        })
    } catch (e) {
        console.log(e);
    }
    
})

module.exports = router;