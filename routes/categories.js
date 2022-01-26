const express = require("express");
const router = express.Router();

const sizesRouter = require("./inventoryTables/sizes");
const pricesRouter = require("./inventoryTables/prices");
const animalRouter = require("./inventoryTables/animals");

const {categories_get} = require("../controlles/categoriesController");

router.get('/', (req, res) => {
    categories_get(req, res);
})

router.use('/size', sizesRouter);
router.use('/price', pricesRouter);
router.use('/animal', animalRouter);

module.exports = router;
