const express = require("express");
const router = express.Router();

const formValidation = require("../middleware/formValidation");

const authController = require('../controlles/authController');
const User = require("../modules/users");
const {validationResult} = require("express-validator");

router.get('/', (req, res) => {
    authController.signup_get(req, res);
})

router.post('/', formValidation.validateUser(), (req, res) => {
    authController.signup_post(req, res);
})
/*
router.post('/', formValidation.validateUser(), async (req, res) => {
    console.log('sign up post request detected!');
    
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    /*
    const errors = validationResult(req);
    
    // Error happened during validation
    if ( !errors.isEmpty() ) {
        console.log('Errors are not empty');
        res.render('signup', {
            errors: handleErrors(errors.array()),
            values: req.body, // values for input fields
        })
    }*//* else{
        try {
            const user = await User.create({
                username: `${ req.body.firstName } ${ req.body.lastName }`,
                email: req.body.email,
                password: req.body.password,
            });
            res.send(`post request detected. New user is: ${user}`);
        } catch (err) {
            res.render("signup", {
                errors: handleLoginErrors('loginError'),
                values: req.body,
            })
        }
    }
    
})
*/
module.exports = router;
