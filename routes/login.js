const express = require("express");
const router = express.Router();
const User = require("../modules/users");

router.get('/', async (req, res) => {
    try {
        res.render('login');
    } catch (e) {
        console.log(e);
    }
})

router.post('/', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        User.findOne({email}).exec(function(error, user) {
            if (error) {
                console.log('Error happened!');
                res.render('login', {
                    errors: {
                        defaultError: 'Please try again.'
                    }
                })
            } else if (!user) {
                console.log('Could not find user!');
                res.render('login', {
                    errors: {
                        user: 'Could not find user by that email. Try again or register if you are not signed in yet.'
                    }
                })
            } else {
                user.comparePassword(password, (matchError, isMatch) => {
                    if (matchError) {
                        console.log('Match error happened during password comparing!');
                        res.render('login', {
                            errors: {
                                defaultError: 'Please try again.'
                            }
                        })
                    } else if (!isMatch) {
                        console.log('Passwords do not match');
                        res.render('login', {
                            errors: {
                                password: 'Wrong password. Please try again.'
                            },
                            user: email,
                        })
                    } else {
                        console.log('Success!! User found and password match');
                        res.cookie('currentUser', user.username);
                        res.redirect('/');
                    }
                })
            }
        })
    } catch (e) {
        console.log(e);
    }
    
    
})

module.exports = router;
