const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    { login, createUser } = require('./mongo.js');

passport.use(new LocalStrategy(
    (username, password, done) => login(username, password, done)
));

passport.serializeUser((user, done) => {
    done(null, user);
});
    
passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;