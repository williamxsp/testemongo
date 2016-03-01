var mongoose = require('mongoose');

/*
 name: 'Nice Restaurant',
    address:{
        number:'2',
        street:'Two Hamburguers St',
        zipCode: '123123',
        state:'São Paulo',
        city:'São Paulo',
        country:'Brazil'
    },
*/
var restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  address: {
    number: {
      type:Number,
      required:true
    },
    street: {
      type:String,
      required:true
    },
    zipCode: {
      type:String,
      required:true
    },
    state: {
      type:String,
      required:true
    },
    city: {
      type:String,
      required:true
    },
    country:{
      type:String,
      required:true
    },
    precise: { //IF AN ADDRESS IS PRECISE OR NOT
      type:Boolean,
      default:true
    }
  },
  createdOn:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
