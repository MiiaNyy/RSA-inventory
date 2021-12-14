const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    // Deletes json web token cookie from browser.
    res.cookie('jwt', '', {expires: new Date(0)});
    res.redirect('/');
})

module.exports = router;
