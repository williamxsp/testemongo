var express = require('express');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
module.exports = function (app, passport) {
  // app.post('/auth/local', function(req, res, next){
  //   passport.authenticate('local-login', function(err, user, info)
  //   {
  //     if (err) { return next(err); }
  //     if (!user) { return res.status(401).json({message:'Invalid Username or Password'}); }
  //     req.logIn(user, function(err) {
  //       if (err) { return next(err); }
  //       return res.redirect('/users/me');
  //     });
  //   })(req, res, next);
  // });

  app.post('/auth/token', function(req, res, next){

    User.findOne({
      name:req.body.name
    }, 'id name +password ', function(err, user){
      if(err) throw err;

      if(!user){
        res.json({sucess:false, message:'Authentication Failed'});
      }else{
        if(user.password != req.body.password){
          res.json({sucess:false, message: 'Invalid Password'});
        }else{

          var token = jwt.sign({id:user.id}, app.get('superSecret'), {expiresIn: 1440*60});
          user.token = token;
          user.save(function(err, user){
            res.json({sucess:true, message:'Happy Coding', user:user});
          });

        }
      }


    });
  });
}
