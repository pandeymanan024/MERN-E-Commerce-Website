const User = require("../models/user");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signup = (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            err: errors.array()[0].param
        })
    }

    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to save user to DB"
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    })
};


exports.signout = (req, res) => {
    res.clearCookie(token);
    res.json({
        message: "User signout successfully"
    });
};


exports.signin = (req, res) => {
    const { email, password } = req.body;

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            err: errors.array()[0].param
        });
    }

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "USER email is not here"
            })
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and Password do not match"
            })
        }

        const token = jwt.sign({
            _id: user._id
        }, process.env.SECRET)
        res.cookie("token", token, { expire: new Date() + 9999 })
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, name, email, role } })

    });

};

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});


exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id === req.auth_id;
    if (!checker) {
        return res.status(403).json({
            error: "ACESS DENIED"
        })
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "YOU are not admin"
        })
    }
    next();
}