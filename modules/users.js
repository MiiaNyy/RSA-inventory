const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 40,
    },
    date: {
        type: Date,
        default: Date.now(),
    }
});

// If user document is saved or updated, run decryption to the password and return that has psw to database
userSchema.pre("save", function (next) {
    const user = this;
    
    if ( this.isModified("password") || this.isNew ) {
        // Generates salt to the hash so it is more secure
        bcrypt.genSalt(10, (saltError, salt) => {
            if ( saltError ) {
                return next(saltError)
            } else {
                bcrypt.hash(user.password, salt, (hashError, hash) => {
                    if ( hashError ) {
                        return next(hashError)
                    }
                    user.password = hash;
                    next()
                })
            }
        })
    } else {
        return next()
    }
})

userSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, (error, isMatch) => {
        if ( error ) {
            return callback(error)
        } else {
            callback(null, isMatch)
        }
    })
}

const User = mongoose.model("User", userSchema);

module.exports = User;
