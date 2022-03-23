const express = require('express');
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const fu = require('../middleware/fetch-user');

const JWT_SECRET = "AtharavaUmbarkar20";


//* Route 1: Create a user. POST "/api/auth/createuser". Login NOT Required.

router.post("/createuser", [
    body('name', "enter a valid name").isLength({ min: 5 }),
    body('email', "enter a valid email").isEmail(),
    body('password', "enter a valid password").isLength({ min: 8 }),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).json({ success, errors: "This email is already registered" });

        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
        })

        const data = {
            user: {
                id: user.id,
            },
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        
        res.send({ success, authToken });
        console.log(authToken);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//* Route 2: Login user. POST "/api/auth/loginuser" Login NOT Required.

router.post("/loginuser", async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ success, errors: errors.array() });
    }

    const email = req.body.email;
    const password = req.body.password;

    try {
        let user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ success, errors: "Please login with correct credentials" });
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) return res.status(400).json({ success, errors: "Please login with correct credentials" });

        const data = {
            user: {
                id: user.id,
            }
        }
        success = true;
        const authToken = jwt.sign(data, JWT_SECRET);
        res.send({ success, authToken, name: user.name });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});

//* Route 3: Get user details. POST "/api/auth/getuser". Login Required.

router.post("/getuser", fu.fetchUser, async (req, res) => {
    try {
        const userId = req.user;
        const user = await User.findById(userId).select("-password");
        res.json(user);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});


module.exports = router;
