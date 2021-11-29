const express = require("express");
const validateUser = require("../middleware/formValidation");
const UserTemplate = require("../modules/users");

const {validationResult} = require("express-validator");
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.render('signUp')
    } catch (e) {
        console.log(e);
    }
})

router.post('/', validateUser(), async (req, res) => {
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array()});
    } else {
        // Data from form is valid.
        try {
            const signUpUser = new UserTemplate({
                username: `${ req.body.firstName } ${ req.body.lastName }`,
                email: req.body.email,
                password: req.body.password,
            })
            signUpUser.save()
                      .then(data => {
                          console.log('signing new user success!', data);
                          res.cookie('currentUser', signUpUser.username)
                          res.redirect('/');
                      })
                      .catch(e => console.log(e))
            
        } catch (e) {
            console.log(e);
        }
    }
})

module.exports = router;
