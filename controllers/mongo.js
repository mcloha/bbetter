const mongoose = require('mongoose'),
    User = require('../models/User'),
    { MONGO_CONNECTION_STRING } = require('dotenv').load().parsed;

mongoConnect = async () => {
    await mongoose.connect(MONGO_CONNECTION_STRING,  { useNewUrlParser: true });
    console.log('connected to mongo');
}

mongoDisconnect = async () => {
    await mongoose.connection.close();
    console.log('disconnected from mongo');
}

login = async (username, password, done) => {
    mongoConnect();
    await User.findOne({ username, password }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorect username or password.' });
        }
        return done(null, user);
    });
    mongoDisconnect();
}

createUser = async (username, password) => {
    mongoConnect();
    await User.create({ username, password });
    console.log(`user: ${username} created`);
    await User.findOne({ username: 'test' }, (err, user) => {
        if (err) throw err;
        console.log(user);
    })
    mongoDisconnect();
}

module.exports = { login, createUser };







