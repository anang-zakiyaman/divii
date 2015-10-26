TripAlerts = new Mongo.Collection("tripAlerts");

TripAlerts.allow({
  insert: function(userId, tripAlert){ return true; },
  update: function(userId, tripAlert, fields, modifier){ return true; },
  remove: function(userId, tripAlert){ return true; }
});
