const express = require("express");
const router = express.Router();

const validateUser = require("../middleware/formValidation").validateUser;

const authController = require('../controlles/authController');

router.get('/', (req, res) => {
    authController.signup_get(req, res);
})

router.post('/', validateUser, (req, res) => {
    authController.signup_post(req, res);
})


module.exports = router;
