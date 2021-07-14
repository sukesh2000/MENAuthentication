const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (passport)=>{
    const authenticateUser = async (email, password, done) =>{
        const user = await User.findOne({email:email});
        if(user == null){
            return done(null, false, { message: 'Email is not registered'})
        }

        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user);
            } else {
                return done(null, false, {message: 'Invalid Passowrd'})
            }
        }catch(e){
            return done(e);
        }
    }
    passport.use(new localStrategy({usernameField: 'email'}, authenticateUser));
    passport.serializeUser((user, done)=>done(null, user._id))
    passport.deserializeUser( async (id, done)=>done(null, await (User.findOne({_id:id}))))
}