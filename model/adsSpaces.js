AdsSpaces = new Mongo.Collection("adsSpaces");

AdsSpaces.allow({
  insert: function(currentUserId, newSpace){
    var isAppManager = (Meteor.users.findOne({_id:currentUserId}).profile.role == 'app-manager');
    if(isAppManager) return true;
    else return false;
  },
  update: function(currentUserId, existingSpace, fields, modifier){
    var isAppManager = (Meteor.users.findOne({_id:currentUserId}).profile.role == 'app-manager');
    if(isAppManager) return true;
    else return false;
  },
  remove: function(currentUserId, toBeRemovedSpace){
    var isAppManager = (Meteor.users.findOne({_id:currentUserId}).profile.role == 'app-manager');
    //check if has active ads on space
    // TODO....
    if(isAppManager) return true;
    else return false;
  }
});

Meteor.methods({

});
