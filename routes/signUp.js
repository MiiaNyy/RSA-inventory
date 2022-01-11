const express = require("express");
const router = express.Router();

const formValidation = require("../middleware/formValidation");

const authController = require('../controlles/authController');

router.get('/', (req, res) => {
    authController.signup_get(req, res);
})

router.post('/', formValidation.validateUser(), (req, res) => {
    authController.signup_post(req, res);
})

module.exports = router;
