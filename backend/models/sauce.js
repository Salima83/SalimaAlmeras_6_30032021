const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  manufacturer:{ type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  mainPepper:{type:String,require:true},
  heat :{type:Number,require:true},
  likes :{type:Number,require:true},
  dislikes :{type:Number,require:true},
  usersLiked :{type:[String],require:true},
  usersDisliked:{type:[String],require:true},
  
  
  
  

});

module.exports = mongoose.model('sauce', thingSchema);