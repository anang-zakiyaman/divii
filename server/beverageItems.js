Meteor.publish('beverageItems',function(options, searchString){
  if(searchString == null) searchString = '';
  Counts.publish(this, 'numberOfBeverageItems', BeverageItems.find({
    $or:[
      {'title': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}}
    ]
  }), {noReady: true});

  return BeverageItems.find({
    $or:[
      {'title': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}}
    ]
  }, options);
});

Meteor.publish('beverageItemImages',function(){
    return BeverageItemImages.find({});
});
