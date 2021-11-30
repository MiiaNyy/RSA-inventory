const {validationResult} = require("express-validator");
const User = require("../modules/users");
const jwt = require("jsonwebtoken");

const maxTokenAge = 60 * 60 * 24 * 3 * 1000; // s * min * day * 3 * ms = three days in milliseconds

function createToken (id) {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    });
}

// handle errors
const handleDuplicateEmailError = (err) => {
    
    // duplicate email error
    if ( err.code === 11000 ) {
        return {email: 'That email is already registered. Please login.'};
        
    }
    
}

function signup_get (req, res) {
    try {
        res.render('signUp')
    } catch (err) {
        console.log(err);
    }
}

// Create error messages that can be send to handlebars
function createErrorMsg(err) {
    return err.map(errItem => {
    
    })
    
}

function signup_post (req, res) {
    const errors = validationResult(req);
    // Error happened during validation
    if ( !errors.isEmpty() ) {
        console.log('error happened during validation', errors);
        /*res.render('signup', {errors})*/
        return res.status(400).json({errors: errors.array()});
    } else {
        // Data from form is valid.
        signupUser(req, res)
            .then(() => console.log('user is signing up...'));
    }
}

async function signupUser (req, res) {
    try {
        const newUser = await User.create({
            username: `${ req.body.firstName } ${ req.body.lastName }`,
            email: req.body.email,
            password: req.body.password,
        });
        
        console.log('signing new user success!', newUser);
        
        const token = createToken(newUser._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxTokenAge});
        res.redirect('/');
    } catch (err) {
        res.render("signup", {
            errors: handleDuplicateEmailError(err),
            firstName: req.body.firstName, // Put this values to input fields so user don't have fill every field
            lastName: req.body.lastName,
        })
        console.log(err)
    }
}

function login_get (req, res) {
    try {
        res.render('login');
    } catch (e) {
        console.log(e);
    }
}

function login_post (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    
    try {
        User.findOne({email}).exec(function (error, user) {
            if ( error ) {
                res.render('login', {
                    errors: {
                        defaultError: 'Error occurred. Please try again.'
                    }
                })
            } else if ( !user ) {
                res.render('login', {
                    errors: {
                        user: 'Could not find user by that email. Try again or register if you are not signed in yet.'
                    }
                })
            } else {
                user.comparePassword(password, (matchError, isMatch) => {
                    if ( matchError ) {
                        res.render('login', {
                            errors: {
                                defaultError: 'Match error happened. Please try again.'
                            }
                        })
                    } else if ( !isMatch ) {
                        res.render('login', {
                            errors: {password: 'Wrong password. Please try again.'},
                            user: email,
                        })
                    } else {
                        res.cookie('currentUser', user.username);
                        res.redirect('/');
                    }
                })
            }
        })
    } catch (e) {
        console.log(e);
    }
    
}

module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post
}
