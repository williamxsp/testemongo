require('dotenv').config({path:'./../.env'});

var assert = require('assert');
var request = require('request');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var User = require('./../models/user');

mongoose.connect(process.env.MONGO_URI);

describe('Restaurant', function()
{
  var newRestaurant = {
    name: 'Nice Restaurant',
    address:{
        number:'2',
        street:'Two Hamburguers St',
        zipCode: '123123',
        state:'São Paulo',
        city:'São Paulo',
        country:'Brazil'
    },
  };
  
  


  describe('List All Restaurants', function(){
    var url = 'http://localhost:1337';
    it('/GET should return 200', function(done){
      request({
        method:'GET',
        url: url + '/restaurants'
      }, function(err, res, body){
          console.log('-----' + res.statusCode + '-----');
          expect(res.statusCode).to.equal(200);
      });
      done();
    });

});
});
