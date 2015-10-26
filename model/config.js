Config = new Mongo.Collection("config");

Config.allow({
  insert: function(userId, configItem){ return true; },
  update: function(userId, configItem, fields, modifier){ return true; },
  remove: function(userId, configItem){ return true; }
});
