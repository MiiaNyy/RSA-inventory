const express = require("express");
const router = express.Router();

const requireAuth = require("../../middleware/authMiddleware");

const {animal_category_get} = require("../../controlles/categoriesController");

router.get('/', (req, res) => {
    res.send('<h1>Animals page</h1>')
})

router.get('/:id', requireAuth, (req, res) => {
    animal_category_get(req, res)
        .then(() => console.log('animal category get'))
})

module.exports = router;
