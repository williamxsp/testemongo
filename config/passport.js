var localStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport){
  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function(err, user){

      done(err, user);
    })
  });

  passport.use('local-login', new localStrategy({usernameField:'email'}, function(username, password, done){
    User.findOne({email:username, password:password}, function(err, user){
      if(err){
          done(err, null);
      }else{

        done(null, user);
      }
    });
  }))
}
