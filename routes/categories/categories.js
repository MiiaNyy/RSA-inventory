const express = require("express");
const router = express.Router();

const sizesRouter = require("./sizes");
const pricesRouter = require("./prices");
const animalRouter = require("./animals");
const Category = require("../../modules/categories");
const requireAuth = require("../../middleware/authMiddleware");

router.get('/', requireAuth, async (req, res) => {
    console.log('current user name:', req.currentUser)
    try {
        const categories = await Category.find({}).lean();
        res.render('categories', {
            title: "Categories",
            categories,
            currentUser: req.currentUser,
        })
    } catch (e) {
        console.log('Error happened:', e)
    }
})

router.get('/create', requireAuth, (req, res) => {
    res.send('<h2>create new category</h2>')
})

router.use('/size', sizesRouter);
router.use('/price', pricesRouter);
router.use('/animal', animalRouter);

module.exports = router;
