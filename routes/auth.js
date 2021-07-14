const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require("bcrypt"); 
const { registerValidation, loginValidation } = require("../models/validation")
const passport = require("passport")

let checkNotAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return res.status(200).send("Already Authenticated");
    }

    next();
}

router.post('/register', checkNotAuthenticated, async(req, res)=>{

    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await newUser.save();
        res.send(savedUser);
    }
    catch(err){
        res.status(400).send(err);
    }
})

router.post('/login', checkNotAuthenticated, async(req,res, next)=>{
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    passport.authenticate('local', (err, user, info)=>{
        if (err) { return res.status(400).send(err); }
        if (!user) { return res.status(400).send(info.message); }
        req.logIn(user, (err)=>{
          if (err) { return res.status(400).send(err); }
          return res.status(200).send("Login Successful");
        });
    })(req, res, next);
});

module.exports = router;