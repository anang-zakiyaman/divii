OrderItems = new Mongo.Collection("orderItems");

OrderItems.allow({
  insert: function(userId, order){ return true; },
  update: function(userId, order, fields, modifier){ return true; },
  remove: function(userId, order){ return true; }
});
