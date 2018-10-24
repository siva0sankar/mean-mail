
var FacebookStrategy = require('passport-facebook').Strategy;
var User             = require('../models/user');
var session          = require('express-session');
var jwt              = require('jsonwebtoken');
var secret           = 'token_key_for';

module.exports = function(app,passport){
  
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({secret: 'keyboard cat',resave: false,saveUninitialized: true,cookie: { secure: false }}));

    passport.serializeUser(function(user, done) {
        token = jwt.sign({ username: user.username , email : user.email }, secret ,{expiresIn : '24h'} );
        done(null, user.id);
    });
      
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
        clientID: '508185833030086',
        clientSecret: 'eebffbdbbc58fe0b78c1c3323b4c78cc',
        callbackURL: "http://localhost:8080/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email']
      },
      function(accessToken, refreshToken, profile, done) {
          User.findOne({email : profile._json.email}).select('username password email').exec(function(err,user){
            if(err){
                done(err);
            }
            if(user && user != null){
                done(null,user);
            }else{
                done(err);
            }
          });
      }
    ));

    app.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/facebookerror' }),function(req,res){
        res.redireact('/facebook/' + token);
    });

    app.get('/auth/facebook',passport.authenticate('facebook', { scope: 'email' })
    );

    return passport;
};