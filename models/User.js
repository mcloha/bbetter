const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String },
    password: { type: String },
    created: { type: Date, default: Date.now }
},  { collection : 'users' });

module.exports =  mongoose.model('Users', UserSchema);