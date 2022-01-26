const mapErrorMessages = require("../mapErrorMessages");

// Create error messages that can be send to handlebars
function handleSignupErrors (err) {
    if ( err === 'loginError' ) {
        return {loginError: ['Something went wrong in our end. Please try again.']}
    } else if ( err.code === 11000 ) {// duplicate email error
        return {email: ['That email is already registered. Please login.']}
    } else if ( err ) {
        return {
            firstName: mapErrorMessages(err, 'firstName'),
            lastName: mapErrorMessages(err, 'lastName'),
            email: mapErrorMessages(err, 'email'),
            password: mapErrorMessages(err, 'password'),
        }
    }
}

function handleLoginErrors (loginError) {
    switch (loginError) {
        case 'loginError':
            return {loginError: ['Something went wrong in our end. Please try again.']}
        case 'userError':
            return {email: ['Could not find user by that email. Try again or register if you are not registered yet.']}
        case 'passwordError':
            return {password: ['Wrong password. Please try again.']}
    }
}

module.exports = {handleLoginErrors, handleSignupErrors};
