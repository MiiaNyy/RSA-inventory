const express = require("express");
const router = express.Router();

const {category_get} = require("../../controlles/categoriesController");
const {animal_category_get} = require("../../controlles/inventoryTable/categoryTableControllers");

router.get('/', (req, res) => {
    category_get(req, res);
})

router.get('/:id', (req, res) => {
    animal_category_get(req, res)
        .then(() => console.log('animal category get'))
})

module.exports = router;
