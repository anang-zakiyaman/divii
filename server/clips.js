Meteor.publish('clips',function(options, searchString){
  if(searchString == null) searchString = '';
  Counts.publish(this, 'numberOfClips', Clips.find({
    $or:[
      {'code': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}},
      {'category': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}},
      {'title': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}}
    ]
  }), {noReady: true});

  return Clips.find({
    $or:[
      {'code': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}},
      {'category': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}},
      {'title': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}}
    ]
  }, options);
});

Meteor.publish('clipCovers',function(){
    return ClipCovers.find({});
});
