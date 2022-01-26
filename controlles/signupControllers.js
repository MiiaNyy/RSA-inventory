const {validationResult} = require("express-validator");

const User = require("../modules/users");

const handleLoginErrors = require("../helpers/authentication/handleLoginErrors");
const handleErrors = require("../helpers/authentication/handleErrors");
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
            errors: handleErrors(errors.array()),
            values: req.body, // values for input fields
        })
    } else {
        // Data from form is valid.
        signUserUpAndCreateToken(req, res)
            .then(r => console.log('user signup successful!'))
    }
}


async function signUserUpAndCreateToken(req, res) {
    try {
        const user = await User.create({
            username: `${ req.body.firstName } ${ req.body.lastName }`,
            email: req.body.email,
            password: req.body.password,
        });
        // Creating user successful
        createTokenAndRedirect(user.username, res);
    } catch (err) {
        res.render("signup", {
            title: "RSA - Sign up",
            errors: handleLoginErrors('loginError'),
            values: req.body,
        })
    }
}

module.exports = {
    signup_get,
    signup_post,
}
