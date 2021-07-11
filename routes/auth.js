const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require("bcryptjs"); 
const { registerValidation, loginValidation } = require("../validation")

router.post('/register', async(req, res)=>{

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

router.post('/login',async(req,res)=>{
    
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Email is not registered');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid Passowrd');

    res.send('Logged in!');
});

module.exports = router;