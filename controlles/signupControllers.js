const {validationResult} = require("express-validator");

const User = require("../modules/users");

const {handleSignupErrors} = require("../helpers/formValidation/handleUserAuthErros");
const createTokenAndRedirect = require("../helpers/createToken");

function signup_get (req, res) {
    try {
        res.render('signUp', {
            title: "RSA - Sign up"
        })
    } catch (err) {
        console.log(err);
    }
}

function signup_post (req, res) {
    const errors = validationResult(req);
    // Error happened during validation
    if ( !errors.isEmpty() ) {
        res.render('signup', {
            title: "RSA - Sign up",
            errors: handleSignupErrors(errors.array()),
            values: req.body, // values for input fields
        })
    } else {
        // Data from form is valid.
        signUserUpAndCreateToken(req, res)
            .then(() => console.log('user signup successful!'))
    }
}

async function signUserUpAndCreateToken (req, res) {
    try {
        const formValues = req.body;
        
        const user = await User.create({
            username: `${ formValues.firstName } ${ formValues.lastName }`,
            email: formValues.email,
            password: formValues.password,
        });
        // Creating user successful
        createTokenAndRedirect(user.username, res);
    } catch (err) {
        res.render("signup", {
            title: "RSA - Sign up",
            errors: handleSignupErrors('loginError'),
            values: formValues,
        })
    }
}

module.exports = {
    signup_get,
    signup_post,
}
