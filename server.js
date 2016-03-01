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

app.use(logger('dev'));


// allow cross domain
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', false);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization, Cache-Control, Content-Type');
    if ('OPTIONS' == req.method) return res.send(200);
    next();
});

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
app.listen(process.env.PORT);
console.log('Listening on ' + process.env.PORT);
