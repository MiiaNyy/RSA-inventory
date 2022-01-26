const express = require("express");
const router = express.Router();

const {category_get} = require("../../controlles/categoriesController");
const {price_category_get} = require("../../controlles/inventoryTable/categoryTableControllers");

router.get('/', (req, res) => {
    category_get(req, res)
})

router.get('/:id', (req, res) => {
    price_category_get(req, res)
        .then(() => console.log("price category"));
})


module.exports = router;
