const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username:{type: String, require: true},
    email:{type: String, require: true},
    password:{type: String, require: true},
    role: { type: String, default:["supervisor"], require: true},

},
{
    timeStamp:true
},

)
module.exports = mongoose.model('user', userSchema);