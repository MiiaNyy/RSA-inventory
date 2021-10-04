const express = require("express");
const router = express.Router();

const sizesRouter = require("./sizes");
const pricesRouter = require("./prices");
const animalRouter = require("./animals");
const colorRouter = require("./colors");
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

router.use('/sizes', sizesRouter);
router.use('/price', pricesRouter);
router.use('/animal', animalRouter);
router.use('/color', colorRouter);


module.exports = router;