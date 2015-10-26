ImageAds = new Mongo.Collection("imageAds");

ImageAds.allow({
  insert: function(){ return true; },
  update: function(){ return true; },
  remove: function(){ return true; }
});

Meteor.methods({
  serverGetImageAdOnSpace: function(adSpace){
    check(adSpace, String);
    var imageAd = ImageAds.findOne({targetSpace: adSpace});
    return imageAd;
  }
});
