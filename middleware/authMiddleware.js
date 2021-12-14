const jwt = require('jsonwebtoken');

function requireAuth (req, res, next) {
    const token = req.cookies.jwt;
    // Check if json web token exists and is verified
    if ( token ) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if ( err ) {
                console.log('err occurred while verifying the token', err.message);
                next()
            } else {
                req.currentUser = decodedToken.id;
                next();
            }
        })
    } else {
        console.log('no token');
        next()
    }
}

module.exports = requireAuth;
