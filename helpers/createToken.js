const jwt = require("jsonwebtoken");

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

module.exports = createTokenAndRedirect;
