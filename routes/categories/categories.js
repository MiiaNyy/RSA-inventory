const express = require("express");
const router = express.Router();

const sizesRouter = require("./sizes");
const pricesRouter = require("./prices");
const animalRouter = require("./animals");

const animals = require("../../helpers/speciesAndSizes").animals;
const sizes = require("../../helpers/speciesAndSizes").sizes;


router.get('/', (req, res) => {
    res.render('categories', {title: "Categories", animals, sizes})
})

router.use('/sizes', sizesRouter);
router.use('/price', pricesRouter);
router.use('/animal', animalRouter);


module.exports = router;