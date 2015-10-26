Meteor.publish('adsSpaces',function(){
    return AdsSpaces.find({});
});
