// Meteor.publish('foodItems',function(options, searchString){
//   if(searchString == null) searchString = '';
//   Counts.publish(this, 'numberOfFoodItems', Fnb.find({
//     $and:[
//       {'category': 'food'},
//       { $or:[
//         {'code': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}},
//         {'title': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}}
//       ]}
//     ]
//   }), {noReady: true});
//
//   return Fnb.find({
//     $and:[
//       {'category': 'food'},
//       { $or:[
//         {'code': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}},
//         {'title': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}}
//       ]}
//     ]
//   }, options);
// });
//
// Meteor.publish('drinkItems',function(options, searchString){
//   if(searchString == null) searchString = '';
//   Counts.publish(this, 'numberOfDrinkItems', Fnb.find({
//     $and:[
//       {'category': 'drink'},
//       { $or:[
//         {'code': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}},
//         {'title': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}}
//       ]}
//     ]
//   }), {noReady: true});
//   return Fnb.find({
//     $and:[
//       {'category': 'drink'},
//       { $or:[
//         {'code': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}},
//         {'title': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'}}
//       ]}
//     ]
//   }, options);
// });
//
// Meteor.publish('fnbImages',function(){
//     return FnbImages.find({});
// });
