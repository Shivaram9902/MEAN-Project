var LocalStrategy = require('passport-local').Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../model/mongodb.js').users;
var db = require('../controller/adaptor/mongodb.js');
var jwt = require('jsonwebtoken');
var CONFIG = require('../config/config.js');


function jwtSign(payload) {
    var token = jwt.sign({ "data": payload} , CONFIG.SECRET_KEY,{ expiresIn: 60  });
    return token;
}


module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, { id: user.id });
    });

    passport.use("loginuser",new LocalStrategy(
        function(username, password, done) {
            console.log("username, password--->>>",username, password);
          // User.findOne({ username: username }, function (err, user) {
        db.GetOneDocument('users', { 'username': username }, {}, {}, function (err, user) {
            console.log("err, user",err, user);
            try {
                if (err) { return done(err); }
                console.log("data checkinfg....",user.password);
                if (!user || !user.validPassword(password)) {
                    return done(null, false, { message: 'You are not authorized to sign in. Verify that you are using valid credentials' });
                } else {
                    return done(null, {
                        "users":user,
                        "token":jwtSign(user.username+"userData"+user.password)
                    });
                }
            }
            catch(err) {
                console.log("sssssssssssssssssssssss",err);
                return done(err);
            }
            
          });
        
        }
      ));

      passport.use("registeruser",new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
        function(req,username, password,done) {
            console.log("username, password--->>>",username, password,req.body);
          // User.findOne({ username: username }, function (err, user) {
        db.GetOneDocument('users', { 'username': username }, {}, {}, function (err, user) {
            console.log("err, user",err, user);
            try {
                if (err) { return done(err); }
                //console.log("data checkinfg....",user.password);
               if(user){
                    return done(null, false, { message: 'username already exsist' });
               }

               var newUser = new User();
               newUser.username = req.body.username;
               newUser.email = req.body.email;
               newUser.password = newUser.generateHash(req.body.password);

               newUser.save(function (err) {
                   if (err) {
                       return done(null, false, req.flash('Error', 'That email or username is already taken.'));
                   }
                   //req.session.passport.header = authHeader;
                   return done(null, {
                        "users":newUser,
                        "token":jwtSign(newUser.username+"userData"+newUser.password)
                    });
               });               
               
            }
            catch(err) {
                console.log("sssssssssssssssssssssss",err);
                return done(err);
            }
            
          });
        
        }
      ));
}