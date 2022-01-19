const express = require("express");
const router = express.Router();

const {size_category_get} = require("../../controlles/categoriesController");

router.get('/', (req, res) => {
    res.send('<h1>Sizes page</h1>')
})

router.get('/:id', (req, res) => {
    size_category_get(req, res)
        .then(() => console.log('success'))
})

module.exports = router;
