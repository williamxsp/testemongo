var mongoose = require('mongoose');


var tokenSchema = new mongoose.Schema({
  device:{
    type:String,
    required:true
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true
  },
  token:{
    type:String,
    required:true
  },
  createdOn:{
    type:Date,
    default:Date.now
  }

});



module.exports = mongoose.model('Token', tokenSchema);
