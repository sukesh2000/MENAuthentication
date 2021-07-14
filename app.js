const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv')
const passport = require('passport');
const flash = require('express-flash')
const session = require('express-session')
const port = process.env.PORT || 5000;

dotenv.config()

const authRoute = require('./routes/auth');
const homeRoute = require('./routes/homeRoute'); 

const initializePassport = require('./config/passport-config');
initializePassport(passport)

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {httpOnly: true,  maxAge: 10800000},
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/user', authRoute);
app.use('/api/pvtspace', homeRoute);

mongoose.connect(process.env.DB_CONNECT, {useUnifiedTopology: true, useNewUrlParser: true}).then(()=>{

    console.log('Database is connected');
    })
    .catch(err => {
        console.log(err.message);
}); 

app.listen(port, ()=>{
    console.log('Server is running on port %s', port);
})