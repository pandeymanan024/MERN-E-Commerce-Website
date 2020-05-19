var express = require("express");
var router = express.Router();
const { check, validationResult } = require('express-validator');
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post("/signout", [
    check("name", "name should be at least 3 characters").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be 3 characters").isLength({ min: 3 }),
], signout);

router.post("/signin", [
    //check("name", "name should be at least 3 characters").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 1 }),
], signin);


router.post("/signup", signup);

router.get("/testroute", isSignedIn, (req, res) => {
    res.json(req.auth);
});

module.exports = router;