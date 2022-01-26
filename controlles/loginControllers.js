const User = require("../modules/users");

const {handleLoginErrors} = require("../helpers/formValidation/handleUserAuthErros");
const createTokenAndRedirect = require("../helpers/createToken");

// Deletes json web token cookie from browser.
function logout_get (req, res) {
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
        const formValues = req.body;
        User.findOne({email: formValues.email}).exec(function (error, user) {
            if ( error || !user ) {
                // There is no user by that email
                const errorName = error ? 'loginError' : 'userError'
                renderErrorLoginPage(errorName, formValues, res);
            } else {
                user.comparePassword(formValues.password, (matchError, isMatch) => {
                    if ( matchError || !isMatch ) {
                        // If user found but passwords don't match
                        const errorName = matchError ? 'loginError' : 'passwordError';
                        renderErrorLoginPage(errorName, formValues, res)
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

function renderErrorLoginPage (errorsName, formValues, res) {
    res.render('login', {
        title: "RSA - Login",
        errors: handleLoginErrors(errorsName),
        values: formValues,
    })
}

module.exports = {
    login_get,
    login_post,
    logout_get,
}
