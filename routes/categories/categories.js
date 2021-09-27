const express = require("express");
const router = express.Router();

const sizesRouter = require("./sizes");

const animals = require("../../helpers/speciesAndSizes").animals;
const sizes = require("../../helpers/speciesAndSizes").sizes;


router.get('/', (req, res) => {
    res.render('categories', {title: "Categories", animals, sizes})
})

router.use('/sizes', sizesRouter);


module.exports = router;