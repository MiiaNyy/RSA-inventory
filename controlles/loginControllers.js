const User = require("../modules/users");

const handleLoginErrors = require("../helpers/authentication/handleLoginErrors");
const createTokenAndRedirect = require("../helpers/createToken");

function logout_get (req, res) {
    // Deletes json web token cookie from browser.
    res.cookie('jwt', '', {expires: new Date(0)});
    res.redirect('/');
}

function login_get (req, res) {
    try {
        res.render('login', {
            title: "RSA - Login",
        });
    } catch (e) {
        console.log(e);
    }
}

function login_post (req, res) {
    try {
        User.findOne({email: req.body.email}).exec(function (error, user) {
            if ( error || !user ) {
                // There is no user by that email
                const errorName = error ? 'loginError' : 'userError'
                renderErrorLoginPage(errorName, req, res);
            } else {
                user.comparePassword(req.body.password, (matchError, isMatch) => {
                    if ( matchError || !isMatch ) {
                        // If user found but passwords don't match
                        const errorName = matchError ? 'loginError' : 'passwordError';
                        renderErrorLoginPage(errorName, req, res)
                    } else {
                        // User and password matches
                        createTokenAndRedirect(user.username, res);
                    }
                })
            }
        })
    } catch (err) {
        console.log(e);
    }
}

function renderErrorLoginPage (errorsName, req, res) {
    res.render('login', {
        title: "RSA - Login",
        errors: handleLoginErrors(errorsName),
        values: req.body,
    })
}

module.exports = {
    login_get,
    login_post,
    logout_get,
}
