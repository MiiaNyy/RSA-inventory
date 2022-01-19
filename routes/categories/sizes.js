const express = require("express");
const router = express.Router();

const requireAuth = require("../../middleware/authMiddleware");
const {size_category_get} = require("../../controlles/categoriesController");

router.get('/', (req, res) => {
    res.send('<h1>Sizes page</h1>')
})

router.get('/:id', requireAuth, async (req, res) => {
    size_category_get(req, res)
        .then(() => console.log('success'))
})

module.exports = router;
