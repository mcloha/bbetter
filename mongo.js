const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    { MONGO_CONNECTION_STRING } = require('dotenv').load().parsed;

mongoose.connect(MONGO_CONNECTION_STRING,  { useNewUrlParser: true });

const UsersSchema = new Schema({
    username: { type: String },
    password: { type: String },
    created: { type: Date, default: Date.now }
},  { collection : 'users' });

const Users = mongoose.model('Users', UsersSchema);

createUser = async (username, password) => {
    await Users.create({ username, password });
    console.log(`user: ${username} created`);
    await Users.findOne({ username: 'test' }, (err, user) => {
        if (err) throw err;
        console.log(user);
    })
    mongoose.connection.close();
}

module.exports = { createUser, Users };







