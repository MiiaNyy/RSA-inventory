const express = require("express");
const router = express.Router();

const sizesRouter = require("./sizes");
const pricesRouter = require("./prices");
const animalRouter = require("./animals");

const requireAuth = require("../../middleware/authMiddleware");
const {categories_get} = require("../../controlles/categoriesController");

router.get('/', requireAuth, (req, res) => {
    categories_get(req.res).then(r => console.log('categories get'));
})

router.get('/create', requireAuth, (req, res) => {
    res.send('<h2>create new category</h2>')
})

router.use('/size', sizesRouter);
router.use('/price', pricesRouter);
router.use('/animal', animalRouter);

module.exports = router;
