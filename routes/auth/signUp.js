const express = require("express");
const router = express.Router();

const {validateUser} = require("../../middleware/formValidation");

const {signup_post, signup_get} = require('../../controlles/authController');

router.get('/', (req, res) => {
    signup_get(req, res);
})

router.post('/', validateUser, (req, res) => {
    console.log('signup post request!');
    signup_post(req, res);
})

module.exports = router;
