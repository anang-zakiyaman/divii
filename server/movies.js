Meteor.publish('movies',function(options, searchString){
  if(searchString == null) searchString = '';
  Counts.publish(this, 'numberOfMovies', Movies.find({
    $or:[
      {'code': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}},
      {'title': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}}
    ]
  }), {noReady: true});

  return Movies.find({
    $or:[
      {'code': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}},
      {'title': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}}
    ]
  }, options);
});

Meteor.publish('movieCovers',function(){
    return MovieCovers.find({});
});
