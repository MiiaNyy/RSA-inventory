const express = require("express");
const validateUser = require("../middleware/formValidation");
const {validationResult} = require("express-validator");
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.render('signUp')
    } catch (e) {
        console.log(e);
    }
})

router.post('/', validateUser(), async (req, res) => {
    const errors = validationResult(req);
    console.log('New user signing up:', req.body);
    
    if ( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array()});
    } else {
        // Data from form is valid.
        try {
            console.log('signing new user success!');
            res.redirect('/');
        } catch (e) {
            console.log(e)
        }
    }
})

module.exports = router;
