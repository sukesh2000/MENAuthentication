var mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:10
    }
})

module.exports = User = mongoose.model('UserSchema',UserSchema);