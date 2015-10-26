Meteor.startup(function(){
  //check if there are any App Manager among user accounts
  if(!Meteor.users.find({'profile.role':'app-manager'}).count()){
    // Create initial app manager account
    Accounts.createUser({
      username: 'appmanager',
      password: 'bimaSakti',
      profile: {
        role: 'app-manager',
        note: 'initial setup'
      }
    });
  }

  //check if there are any FnB Manager among user accounts
  if(!Meteor.users.find({'profile.role':'fnb-manager'}).count()){
    // Create initial app manager account
    Accounts.createUser({
      username: 'fnbmanager',
      password: 'andromeda',
      profile: {
        role: 'fnb-manager',
        note: 'initial setup'
      }
    });
  }

  //check if there are any Trip Manager among user accounts
  if(!Meteor.users.find({'profile.role':'trip-manager'}).count()){
    // Create initial app manager account
    Accounts.createUser({
      username: 'tripmanager',
      password: 'sombrero',
      profile: {
        role: 'trip-manager',
        note: 'initial setup'
      }
    });
  }

});
