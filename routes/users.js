var express = require('express');
var router = express.Router();
var User = require('../models/user');

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
  .get(isLoggedIn, function(req, res, next){
    res.json(req.user.name);
    // res.send('me');
  });
  router.route('/users/logout')
  .get(isLoggedIn, function(req, res, next){
    req.logout();
    res.send('thcau');
    // res.send('me');
  });
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }else{
    return res.status(403).json({message:'é amiguinho, cipá ce não tem acesso ein'});
  }

  res.redirect('/');
}
