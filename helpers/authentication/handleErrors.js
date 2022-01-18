// Create error messages that can be send to handlebars
function handleErrors (err) {
    if ( err.code === 11000 ) {// duplicate email error
        return {email: ['That email is already registered. Please login.']}
    } else if ( err ) {
        return {
            firstName: err.map(item => item.param === 'firstName' ? item.msg : ''),
            lastName: err.map(item => item.param === 'lastName' ? item.msg : ''),
            email: err.map(item => item.param === 'email' ? item.msg : ''),
            password: err.map(item => item.param === 'password' ? item.msg : ''),
        }
    }
}

module.exports = handleErrors;
