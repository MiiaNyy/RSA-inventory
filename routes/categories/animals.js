const express = require("express");
const router = express.Router();

const {animal_category_get, category_get} = require("../../controlles/categoriesController");

router.get('/',  (req, res) => {
    req.categoryName = 'Animal';
    category_get(req, res);
})

router.get('/:id', (req, res) => {
    animal_category_get(req, res)
        .then(() => console.log('animal category get'))
})

module.exports = router;
