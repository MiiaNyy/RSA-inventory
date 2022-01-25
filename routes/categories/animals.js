const express = require("express");
const router = express.Router();

const {animal_category_get} = require("../../controlles/categoriesController");
const Category = require("../../modules/categories");

router.get('/', async (req, res) => {
    try {
        const animals = await Category.find({name: 'Animals'}).lean();
        console.log(animals.url);
        res.render('categoryList', {
            title: "RSA - inventory",
            category: animals,
            currentUser: req.currentUser,
        })
    } catch (e) {
        console.log('Error happened:', e)
    }
})

router.get('/:id', (req, res) => {
    animal_category_get(req, res)
        .then(() => console.log('animal category get'))
})

module.exports = router;
