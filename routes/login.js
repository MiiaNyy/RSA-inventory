const express = require("express");
const router = express.Router();

const authController = require('../controlles/authController');

router.get('/', (req, res) => {
    authController.login_get(req, res);
})

router.post('/', (req, res) => {
    authController.login_post(req, res);
    
})

module.exports = router;
