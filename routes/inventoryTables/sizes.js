const express = require("express");
const router = express.Router();

const {category_get} = require("../../controlles/categoriesController");
const {size_category_get} = require("../../controlles/inventoryTable/categoryTableControllers");

router.get('/', (req, res) => {
    category_get(req, res);
})

router.get('/:id', (req, res) => {
    size_category_get(req, res)
        .then(() => console.log('success'))
})

module.exports = router;
