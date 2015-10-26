Meteor.publish('users', function(){
  return Meteor.users.find(
    {},
    {fields: {username: 1, profile: 1}}
  );
});

Meteor.publish('managers', function(){
  return Meteor.users.find(
    {'profile.role': { $in:[ 'app-manager','fnb-manager','trip-manager']}},
    {fields: {username: 1, profile: 1}}
  );
});
