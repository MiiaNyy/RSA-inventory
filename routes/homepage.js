const express = require("express");
const router = express.Router();

const requireAuth = require('../middleware/authMiddleware');
const homepage_get = require("../controlles/homepageController");

router.get('/', requireAuth, (req, res) => {
    homepage_get(req, res);
})


module.exports = router;
