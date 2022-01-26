const express = require("express");
const router = express.Router();

const {logout_get} = require("../../controlles/loginControllers");

router.get('/', (req, res) => {
    logout_get(req, res);
})

module.exports = router;
