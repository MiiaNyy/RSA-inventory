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

module.exports = handleLoginErrors;
