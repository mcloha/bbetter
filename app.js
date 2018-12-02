const express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser');
    flash = require('connect-flash'),
    app = express(),
    port = 4000,
    passport = require('./controllers/passport');

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
