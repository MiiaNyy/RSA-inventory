const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.render('login')
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;
