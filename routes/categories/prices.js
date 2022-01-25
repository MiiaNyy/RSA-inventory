const express = require("express");
const router = express.Router();

const {price_category_get, category_get} = require("../../controlles/categoriesController");

router.get('/', (req, res) => {
    req.categoryName = 'Price';
    category_get(req, res)
})

router.get('/:id', (req, res) => {
    price_category_get(req, res)
        .then(() => console.log("price category"));
})


module.exports = router;
