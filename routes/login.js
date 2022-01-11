const express = require("express");
const router = express.Router();

const authController = require('../controlles/authController');
const requireAuth = require("../middleware/authMiddleware");

router.get('/', (req, res) => {
    authController.login_get(req, res);
})

router.post('/', (req, res) => {
    authController.login_post(req, res).then(r => console.log('inside login post request...'));
    
})

module.exports = router;
