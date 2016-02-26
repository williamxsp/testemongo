 //CONFIGURAÇÃO DO AMBIENTE .env
require('dotenv').load();

//REQUIRES
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var logger = require('morgan');

// var cookieParser = require('cookie-parser');
// var cookieSession = require('cookie-session');
// var expressSession = require('express-session');




mongoose.connect(process.env.MONGO_URI);


//CONFIGURAR BEARER
// passport.use(new BearerStrategy(function (token, cb) {
//   jwt.verify(token, app.get('superSecret'), function(err, decoded) {
//     if (err) return cb(err);
//     var user = decoded;
//     return cb(null, user ? user : false);
//   });
// }));


var app = express();
// app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));

// app.use(cookieParser());
// app.use(expressSession({secret:'lady-gaga', resave:false, saveUninitialized:false}));
// app.use(cookieSession({secret:'lady-gaga'}));
app.use(passport.initialize());
// app.use(passport.session());
app.set('superSecret', '109341031onakldlnad89hadash0dasopijda');
app.use(logger('dev'));

//ROTAS

require('./config/passport')(passport, app);



require('./config/routes')(app);



// app.use(cookieParser());
// app.use(bodyParser.urlencoded({
//   extended:true
// }));
// app.use(bodyParser.json());
// app.use(expressSession({ secret: 'keyboard cat' }));
// app.use(passport.initialize());
// app.use(passport.session());

// app.get('/zoei', require('./models/auth')());

// passport.use(new localStrategy(require('./models/user')(username, password, done)));

/*function(username, password, done){

}*/

//LOGGER
// console.log(app.get('env'));
if(app.get('env') === 'development'){
  app.use(function(err, req, res, next){
    console.log(err);
    res.status(err.status || 400);
    res.json({
      error:err,
      message: err.message || err.friendlyMessage,
      friendlyMessage:err.friendlyMessage
    });
  });
}

process.on('uncaughtException', function(err){
  console.log(err);
});



//INICIAR APLICAÇÃO
app.listen(process.env.APP_PORT);
console.log('Listening on ' + process.env.APP_PORT);
