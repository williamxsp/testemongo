require('dotenv').config({path:'./../.env'});

var assert = require('assert');
var request = require('request');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var User = require('./../models/user');

mongoose.connect(process.env.MONGO_URI);

describe('User Actions', function()
{
  var newUser = {
    name: 'William Martins',
    password:'123123',
    email: 'william@gmail.com'
  };
  
  beforeEach(function(done){
    //zerar a collection antes de criar um novo usuário
    User.remove({}, function(err, status){});
    done();
  });



  describe('Register', function(){
    var url = 'http://localhost:1337';
    it('/POST should return 400 (Bad Request) if requested without all required informations', function(done){
      request({
        method:'POST',
        url: url + '/auth/register'
      }, function(err, res, body){
          expect(res.statusCode).to.equal(400);
      });
      done();
    });


    it('/POST should return a Fresh n Valid New User', function(done){
      request({
        method:'POST',
        url: url + '/auth/register',
        form:newUser
      }, function(err, res, body){
          // expect(res.statusCode).to.equal(200);
          var body = JSON.parse(body);
           expect(res.statusCode).to.equal(200);
           expect(mongoose.Types.ObjectId.isValid(body._id)).to.equal(true);
           expect(body.name).to.equal(newUser.name);
           expect(body.email).to.equal(newUser.email);
           expect(body.password).to.equal(undefined);
           done();
      });
    });


    it('/POST should Fail when registering a user with duplicated email address', function(done){

      var user = new User();
      user.email = newUser.email;
      user.password = newUser.password;
      user.name = newUser.name;
      user.save();

      request({
        method:'POST',
        url: url + '/auth/register',
        form:newUser
      }, function(err, res, body){
           expect(res.statusCode).to.equal(400);
           done();
         });
      });

  });
});
