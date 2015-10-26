Movies = new Mongo.Collection("movies");

Movies.allow({
  insert: function(userId, movie){ return true; },
  update: function(userId, movie, fields, modifier){ return true; },
  remove: function(userId, movie){ return true; }
});
