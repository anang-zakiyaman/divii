Meteor.publish('foodMenu',function(){
    return FoodMenu.find({});
});
