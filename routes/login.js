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

    User.findOne({email}).exec(function(error, user) {
        if (error) {
            console.log('Error happened!', error);
            //callback({error: true})
        } else if (!user) {
            console.log('Could not find user!', error);
            //callback({error: true})
        } else {
            user.comparePassword(password, (matchError, isMatch) => {
                if (matchError) {
                    console.log('Match error happened during password comparing!', error);
                    //callback({error: true})
                } else if (!isMatch) {
                    console.log('Passwords do not match', error);
                    //callback({error: true})
                } else {
                    console.log('Success!! User found and password match');
                    res.cookie('currentUser', signUpUser.username)
                    res.redirect('/');
                    //callback({success: true})
                }
            })
        }
    })
})

function loginUser(username, password, callback) {

}

module.exports = router;
