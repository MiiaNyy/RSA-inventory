const express = require("express");
const router = express.Router();

const {login_get, login_post} = require('../../controlles/authController');

router.get('/', (req, res) => {
    login_get(req, res);
})

router.post('/', (req, res) => {
    login_post(req, res);
    
})

module.exports = router;
