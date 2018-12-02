const express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser');
    flash = require('connect-flash'),
    app = express(),
    port = 4000,
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

const { createUser, Users } = require('./mongo.js');

//createUser('timbo', '12345');

app.use(express.static('public'));
app.use(session({ 
    secret: 'cat', 
    resave: true, 
    saveUninitialized: true 
}));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    (username, password, done) => {
        Users.findOne({ username, password }, (err, user) => {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorect username or password.' });
            }
            return done(null, user);
        });
    }
))
passport.serializeUser((user, done) => {
    done(null, user);
});
  
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.post('/login',
    passport.authenticate('local', { 
        successRedirect: '/main',
        failureRedirect: '/',
        failureFlash: true 
    })
);

app.get('/main', (req, res) => {
    res.send('you are logged in!!!');
})

app.listen(port, () => {
    console.log('the app is running on port %d', port);
});
