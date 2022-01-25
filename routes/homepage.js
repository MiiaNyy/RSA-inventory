const express = require("express");
const router = express.Router();

const homepage_get = require("../controlles/homepageController");

router.get('/',(req, res) => {
    homepage_get(req, res).then(r => console.log('homepage'));
})


module.exports = router;
