Stations = new Mongo.Collection("stations");

Stations.allow({
  insert: function(userId, station){ return true; },
  update: function(userId, station, fields, modifier){ return true; },
  remove: function(userId, station){ return true; }
});
