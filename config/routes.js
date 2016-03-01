var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
module.exports = function(app, router){
  var router = express.Router();
  //
  // router.use(function(req, res, next){
  //
  //   var token = req.body.token || req.query.token || req.headers['x-access-token'];
  //   if(token){
  //     jwt.verify(token, app.get('superSecret'), function(err, decoded){
  //       if(err){
  //         return res.json({success:false, message:'Invalid Token'})
  //       }else{
  //         req.decoded = decoded;
  //         next();
  //       }
  //     });
  //   }else{
  //     return res.status(403).send({sucess:false, message:'No token provided'});
  //   }
  // });

  require('../routes/auth')(app, router, passport);
  require('../routes/restaurants')(app, router);
  /* AUTENTICAR ROTAS */
  app.all('/users', function(req, res, next) {
  //return next();
    passport.authenticate('bearer', function(err, user, info) {

      if (err) return next(err);
      if (user) {
        req.user = user;
        return next();
      } else {
        return res.status(401).json({ status: 'error', code: 'unauthorized' });
      }
    })(req, res, next);
  });

  /*  A PARTIR DAQUI TODAS AS ROTAS SÃO AUTENTICADAS */
  require('../routes/users')(app, router);

  app.use(router);

}
