Orders = new Mongo.Collection("orders");

Orders.allow({
  insert: function(userId, order){ return true; },
  update: function(userId, order, fields, modifier){ return true; },
  remove: function(userId, order){ return true; }
});
