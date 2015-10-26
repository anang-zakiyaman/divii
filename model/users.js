Meteor.users.allow({
  insert: function(currentUserId, newUser){
    var isAppManager = (Meteor.users.findOne({_id:currentUserId}).profile.role == 'app-manager');
    var newUserIsPassenger = (existingUser.profile.role == 'passenger');
    if(isAppManager && !newUserIsPassenger) return true;
    else return false;
  },
  update: function(currentUserId, existingUser, fields, modifier){
    var isAppManager = (Meteor.users.findOne({_id:currentUserId}).profile.role == 'app-manager');
    var existingUserIsPassenger = (existingUser.profile.role == 'passenger');
    if(isAppManager && !existingUserIsPassenger) return true;
    else return false;
  },
  remove: function(currentUserId, toBeRemovedUser){
    var isAppManager = (Meteor.users.findOne({_id:currentUserId}).profile.role == 'app-manager');
    if(isAppManager) return true;
    else return false;
  }
});

Meteor.methods({

  serverCreateManager: function(newManager){
    check(newManager.username, String);
    check(newManager.password, String);
    check(newManager.profile, Object);
    check(newManager.profile.role, String);
    check(newManager.profile.note, String);
    if(Meteor.user().profile.role !== 'app-manager'){
      throw new Meteor.Error(403, "You must be logged in as app manager to create new manager");
    }
    return Accounts.createUser(newManager);
  },

  serverUpdateManager: function(managerUpdate){
    return Meteor.users.update({_id: managerUpdate._id}, {
      $set:{
        username: managerUpdate.username,
        'profile.note': managerUpdate.profile.note
      }
    });
  },

  serverResetPassword: function(managerId, newPassword){
    check(newPassword, String);
    Accounts.setPassword(managerId, newPassword);
  },

  serverRemoveManager: function(managerId){
    check(managerId, String);
    if(Meteor.user().profile.role !== 'app-manager'){
      throw new Meteor.Error(403, "You must be logged in as app manager to remove an account");
    }
    Meteor.users.remove(managerId);
  },

  serverUpdateUserAdViews: function(adType, adCode){
    check(adType, String);
    check(adCode, String);
    return Meteor.users.update({_id: Meteor.userId()}, {
      $push: {
        adViews: {
          viewedAt: (new Date()).valueOf(),
          type: adType,
          code: adCode
        }
      }
    });
  }
});
