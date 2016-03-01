var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');
var passport = require('passport');

module.exports = function(app, router){
  router.route('/restaurants')
  .get(function(req, res, next){
   Restaurant.find({}, function(err, data){
    if(err){
      return next({message:'Cannot list users'});
    }else{
       res.json(data);
    }
   });
  })
  .post(function(req, res, next){
    /*
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
    */  
    
    
    
    var newRestaurant = new Restaurant();
    newRestaurant.name = req.body.name || null;
    newRestaurant.address = {
        number:req.body.number || null,
        street:req.body.street || null,
        zipCode:req.body.zipCode || null,
        state:req.body.state || null,
        city:req.body.city || null,
        country:req.body.country || null
    };
    
    
    
    newRestaurant.save(function(err, restaurant)
    {
        if(err) return next(err);
        
       return res.json(restaurant);
    });
      
  });
}
