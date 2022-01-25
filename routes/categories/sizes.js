const express = require("express");
const router = express.Router();

const {size_category_get, category_get} = require("../../controlles/categoriesController");

router.get('/', (req, res) => {
    req.categoryName = 'size';
    category_get(req, res);
})

router.get('/:id', (req, res) => {
    size_category_get(req, res)
        .then(() => console.log('success'))
})

module.exports = router;
