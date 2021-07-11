const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require('dotenv')

dotenv.config()

const authRoute = require('./routes/auth');
const pvtRoute = require('./routes/privateRoute'); 

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api/user', authRoute);
app.use('/api/pvtspace', pvtRoute);

mongoose.connect(process.env.DB_CONNECT, {useUnifiedTopology: true, useNewUrlParser: true}).then(()=>{

    console.log('Database is connected');
    })
    .catch(err => {
        console.log(err.message);
}); 

app.listen(port, ()=>{
    console.log('Server is running on port %s', port);
})