const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const secret = "mysecret";
const expiry_time = "3h";
const SALT_WORK_FACTOR = 10;


const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {
        console.log('new');
        const document = this;

        // generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) {
                console.log('error salt');
                return next(err);
            }

            // hash the password using our new salt
            bcrypt.hash(document.password, salt, null, function (err, hash) {
                if (err) return next(err);

                // override the cleartext password with the hashed one
                document.password = hash;
                next();
            });
        });
    } else {
        console.log('already registered');
        next();
    }
});

UserSchema.methods.isCorrectPassword = function (password, callback) {
    console.log(password);
    bcrypt.compare(password, this.password, function (err, same) {
        if (err) {
            callback(err);
        } else {
            console.log(same);
            callback(err, same);
        }
    });
};

UserSchema.methods.setToken = function () {
    const payload = { id: this.id };

    return jwt.sign(payload, secret, {
        expiresIn: expiry_time
    });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;