const express = require("express");
const router = express.Router();

const sizesRouter = require("./sizes");
const pricesRouter = require("./prices");
const animalRouter = require("./animals");
const Category = require("../../modules/categories");

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({}).lean();
        res.render('categories', {
            title: "Categories",
            categories,
        })
    } catch (e) {
        console.log('Error happened:', e)
    }
})

router.get('/create', (req, res) => {
    res.send('<h2>create new category</h2>')
})

router.use('/size', sizesRouter);
router.use('/price', pricesRouter);
router.use('/animal', animalRouter);

module.exports = router;
