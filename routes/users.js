var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');

module.exports = function(app, router){
  router.route('/users')
  .get(function(req, res, next){
   User.find({}, function(err, data){
    if(err){
      return next({message:'Cannot list users'});
    }else{
       res.json(data);
    }
   });
  })
  .post(function(req, res, next){
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var user = new User();
    user.name = name;
    user.email = email;
    user.password = password;

    user.save(function(err, user){
      if(err){
        return next(err);
      }else{
        res.json(user);
      }
    });
  });

  router.route('/users/me')
  .get(passport.authenticate('bearer', {session: false}), function(req, res, next){
    console.log(req);
    res.json({legal:'legal'});
    // res.send('me');
  });


}
