//BEARER STRATEGY
var BearerStrategy = require('passport-http-bearer').Strategy;
var Token = require('../models/token');
// JSON WEB TOKEN
var jwt = require('jsonwebtoken');




module.exports = function(passport, app){

  //CONFIGURAR BEARER
  passport.use(new BearerStrategy(function (token, cb) {
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) return cb(err);
      console.log(decoded);
      var userId = decoded.id ? decoded.id : false;
      if(userId){
        var user = Token.findById(userId, 'id name ', function(err, user){
          if(!err){
            return cb(null, user);
          }

        });
      }
      else{
        return cb(null, false);
      }
    });
  }));


  // passport.serializeUser(function(user, done){
  //   done(null, user.id);
  // });
  //
  // passport.deserializeUser(function (id, done) {
  //   User.findById(id, function(err, user){
  //
  //     done(err, user);
  //   })
  // });
  //
  // passport.use('local-login', new localStrategy({usernameField:'email'}, function(username, password, done){
  //   User.findOne({email:username, password:password}, function(err, user){
  //     if(err){
  //         done(err, null);
  //     }else{
  //
  //       done(null, user);
  //     }
  //   });
  // }))
}
