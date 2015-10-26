VideoAds = new Mongo.Collection("videoAds");

VideoAds.allow({
  insert: function(){ return true; },
  update: function(){ return true; },
  remove: function(){ return true; }
});
