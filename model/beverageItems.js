BeverageItems = new Mongo.Collection("beverageItems");

BeverageItems.allow({
  insert: function(userId, beverageItem){ return true; },
  update: function(userId, beverageItem, fields, modifier){ return true; },
  remove: function(userId, beverageItem){ return true; }
});
