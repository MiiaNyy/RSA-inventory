const express = require("express");
const router = express.Router();

const {price_category_get} = require("../../controlles/categoriesController");

router.get('/', (req, res) => {
    res.send('<h1>Prices page</h1>')
})

router.get('/:id', (req, res) => {
    price_category_get(req, res)
        .then(() => console.log("price category"));
})


module.exports = router;
