FoodItems = new Mongo.Collection("foodItems");

FoodItems.allow({
  insert: function(userId, foodItem){ return true; },
  update: function(userId, foodItem, fields, modifier){ return true; },
  remove: function(userId, foodItem){ return true; }
});
