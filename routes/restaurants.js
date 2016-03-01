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
  
  router.route('/restaurants/:id')
  .get(function(req, res, next) {
      var id = req.params['id'];
       Restaurant.findById(id, function(err, restaurant){
           if(err) return next(err);
           
           if(restaurant){
              return res.json(restaurant); 
           }else{
               return next({status:404, message: 'Restaurant not found'});
           }
      });
  })
  .put(function(req, res, next) {
      var id = req.params['id'];
       Restaurant.findById(id, function(err, restaurant){
           if(err) return next(err);
           
           if(restaurant){
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
               
               
              return res.json(restaurant); 
           }else{
               return next({status:404, message: 'Restaurant not found'});
           }
      });
  });
}
