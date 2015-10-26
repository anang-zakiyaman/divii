ImageAdViews = new Mongo.Collection("imageAdViews");

ImageAdViews.allow({
  insert: function(){ return true; },
  update: function(){ return true; },
  remove: function(){ return true; }
});

Meteor.methods({

  serverUpdateImageAdViews: function(adCode, userAgent){
    check(adCode, String);
    check(userAgent, String);

    return ImageAdViews.upsert({
      adCode: adCode,
      userId: Meteor.userId()
    },{
      $set: {
        adCode: adCode,
        userId: Meteor.userId(),
        name: Meteor.user().profile.name,
        gender: Meteor.user().profile.gender,
        age: Meteor.user().profile.age,
        transportation:{
          operator: 'kai', media: 'train',
          vehicleCode : Meteor.user().profile.transportation.vehicleCode,
          ticket: Meteor.user().profile.transportation.ticket
        },
        userAgent: userAgent
      },
      $inc:{ count: 1 }
    });
  }

});
