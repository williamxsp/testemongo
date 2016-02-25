var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    index:{
      unique:true
    },
  },
  password:{
    type:String,
    required:true,
    select:false
  },
  token:{
    type:String
  },
  createdOn:{
    type:Date,
    default:Date.now

  }
});

module.exports = mongoose.model('User', userSchema);
