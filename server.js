 //CONFIGURAÇÃO DO AMBIENTE .env
require('dotenv').load();

//REQUIRES
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var expressSession = require('express-session');

//BEARER STRATEGY
var bearerStrategy = require('passport-http-bearer').Strategy;

// JSON WEB TOKEN
var jwt = require('jsonwebtoken');


mongoose.connect(process.env.MONGO_URI);


//CONFIGURAR BEARER
passport.use('bearer', new bearerStrategy(
  function(token, cb){
    require('./models/user').findOne({token:token}, function(err, user){

      if(err) {return cb(err);}
      if(!user) {return cb(null, false);}
      return cb(null, user);
    });
  }
));


var app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));

// app.use(cookieParser());
// app.use(expressSession({secret:'lady-gaga', resave:false, saveUninitialized:false}));
app.use(cookieSession({secret:'lady-gaga'}));
app.use(passport.initialize());
app.use(passport.session());
app.set('superSecret', '109341031onakldlnad89hadash0dasopijda');



app.get('/rotinha', passport.authenticate('bearer', {session: false}), function(req, res){
  res.json(req.user);
});


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
//ROTAS
require('./config/routes')(app);
require('./config/passport')(passport);


//INICIAR APLICAÇÃO
app.listen(process.env.APP_PORT);
console.log('Listening on ' + process.env.APP_PORT);
