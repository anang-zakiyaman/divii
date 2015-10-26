Clips = new Mongo.Collection("clips");

Clips.allow({
  insert: function(userId, clip){ return true; },
  update: function(userId, clip, fields, modifier){ return true; },
  remove: function(userId, clip){ return true; }
});
