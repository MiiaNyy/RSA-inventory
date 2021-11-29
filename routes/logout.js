const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    // Deletes currentUser cookie from browser.
    res.cookie('currentUser', '', {expires: new Date(0)});
    console.log('logging out...')
    res.redirect('/');
})

module.exports = router;
