Meteor.publish('stations',function(options, searchString){
  if(searchString == null) searchString = '';
  Counts.publish(this, 'numberOfStations', Stations.find({
    $or:[
      {'code': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}},
      {'name': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}},
      {'location.city': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}}
    ]
  }), {noReady: true});

  return Stations.find({
    $or:[
      {'code': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}},
      {'name': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}},
      {'location.city': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}}
    ]
  }, options);
});
