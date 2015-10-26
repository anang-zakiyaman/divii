Meteor.publish('videoAds',function(options, searchString){
  if(searchString == null) searchString = '';
  Counts.publish(this, 'numberOfVideoAds', VideoAds.find({
    $or:[
      {'code': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}},
      {'title': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}}
    ]
  }), {noReady: true});

  return VideoAds.find({
    $or:[
      {'code': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}},
      {'title': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}}
    ]
  }, options);
});

Meteor.publish('videoAdsContent',function(){
    return VideoAdsContent.find({});
});
