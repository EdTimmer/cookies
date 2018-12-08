const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  restaurantname: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }  
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);