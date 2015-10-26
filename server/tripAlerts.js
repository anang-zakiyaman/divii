Meteor.publish('tripAlerts',function(options, searchString){
  if(searchString == null) searchString = '';
  Counts.publish(this, 'numberOfTripAlerts', TripAlerts.find({
    $or:[
      {'content': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}},
      {'category': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}}
    ]
  }), {noReady: true});
  return TripAlerts.find({
    $or:[
      {'content': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}},
      {'category': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}}
    ]
  }, options);
});

Meteor.methods({

  serverRemoveAllTripAlerts: function(){
    if(Meteor.user().profile.role !== 'app-manager' || Meteor.user().profile.role !== 'trip-manager'){
      throw new Meteor.Error(403, "You must be logged in as app / trip manager to remove all trip alerts");
    }
    TripAlerts.remove({});
  }

});
