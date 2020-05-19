var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
const crypto = require('crypto');
const uuidv1 = require("uuid/v1");

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        require: true,
        unique: true
    },
    userinfo: {
        type: String,
        trim: true
    },
    //TODO : come back here
    encry_password: {
        require: true,
        type: String
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
}, { timestamps: true });


userSchema.virtual("password")
    .get(function() {
        return this._password
    })
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password);
    })

userSchema.methods = {
    authenticate: function(plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password
    },

    securePassword: function(plainpassword) {
        if (!plainpassword) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
                .update('I love u 3000')
                .digest('hex');
        } catch (err) {
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema)