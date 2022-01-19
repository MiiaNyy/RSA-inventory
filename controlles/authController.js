const {validationResult} = require("express-validator");
const User = require("../modules/users");
const jwt = require("jsonwebtoken");

const handleLoginErrors = require("../helpers/authentication/handleLoginErrors");
const handleErrors = require("../helpers/authentication/handleErrors");


function createToken (id) {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    });
}

// Create web token that you can save current user info securely
function createTokenAndRedirect (id, res) {
    const maxTokenAge = 60 * 60 * 24 * 3 * 1000; // s * min * day * 3 * ms = three days in milliseconds
    const token = createToken(id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxTokenAge});
    res.redirect('/');
}

function signup_get (req, res) {
    try {
        res.render('signUp')
    } catch (err) {
        console.log(err);
    }
}


function signup_post (req, res) {
    const errors = validationResult(req);
    // Error happened during validation
    if ( !errors.isEmpty() ) {
        console.log('Errors are not empty');
        res.render('signup', {
            errors: handleErrors(errors.array()),
            values: req.body, // values for input fields
        })
    } else {
        // Data from form is valid.
        console.log('Data from form is valid.')
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
            errors: handleLoginErrors('loginError'),
            values: req.body,
        })
    }
}

function login_get (req, res) {
    try {
        res.render('login');
    } catch (e) {
        console.log(e);
    }
}

function validateUserLogin (error, user, req, res) {
    if ( error ) {
        res.render('login', {
            errors: handleLoginErrors('loginError')
        })
        
    } else if ( !user ) {
        res.render('login', {
            errors: handleLoginErrors('userError'),
            values: req.body
        })
    } else {
        user.comparePassword(req.body.password, (matchError, isMatch) => {
            if ( matchError ) {
                res.render('login', {
                    errors: handleLoginErrors('loginError')
                })
            } else if ( !isMatch ) {
                res.render('login', {
                    errors: handleLoginErrors('passwordError'),
                    values: req.body,
                })
            } else {
                createTokenAndRedirect(user.username, res);
            }
        })
    }
}

async function login_post (req, res) {
    try {
        User.findOne({email: req.body.email}).exec(function (error, user) {
            validateUserLogin(error, user, req, res)
        })
    } catch (err) {
        console.log(e);
    }
}

function logout_get(req, res) {
    // Deletes json web token cookie from browser.
    res.cookie('jwt', '', {expires: new Date(0)});
    res.redirect('/');
}

module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post,
    logout_get,
}
