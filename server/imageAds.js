Meteor.publish('imageAds',function(options, spaceCode, searchString){
  if(spaceCode == null) spaceCode = '';
  if(searchString == null) searchString = '';
  Counts.publish(this, 'numberOfImageAds', ImageAds.find({
    $and:[
      {'targetSpace': {'$regex': '.*' + spaceCode || '' + '.*', '$options': 'i'}},
      { $or:[
          {'targetSpace': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}},
          {'code': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}},
          {'title': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}}
        ]
      }
    ]
  }), {noReady: true});

  return ImageAds.find({
    $and:[
      {'targetSpace': {'$regex': '.*' + spaceCode || '' + '.*', '$options': 'i'}},
      { $or:[
          {'targetSpace': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}},
          {'code': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}},
          {'title': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}}
        ]
      }
    ]
  }, options);
});

Meteor.publish('imageAd',function(spaceCode){
  var currentTime = new Date().valueOf();
  return ImageAds.find({
    $and:[
      {'targetSpace': spaceCode},
      {'activeDate': {"$lte": currentTime}},
      {'expireDate': {"$gt": currentTime}}
    ]
  });
});

Meteor.publish('imageAdsContent',function(){
    return ImageAdsContent.find({});
});
