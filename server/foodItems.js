Meteor.publish('foodItems',function(options, searchString){
  if(searchString == null) searchString = '';
  Counts.publish(this, 'numberOfFoodItems', FoodItems.find({
    $or:[
      {'title': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}}
    ]
  }), {noReady: true});

  return FoodItems.find({
    $or:[
      {'title': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}}
    ]
  }, options);
});

Meteor.publish('foodItemImages',function(){
    return FoodItemImages.find({});
});
