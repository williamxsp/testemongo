var express = require('express');
var passport = require('passport');
module.exports = function(app, router){
  var router = express.Router();
  require('../routes/users')(app, router);
  require('../routes/auth')(app, passport);
  app.use(router);
}
