angular.module("divii")
.controller("AppAccountsManagerCtrl", ["$scope", "$meteor", '$mdDialog', '$mdToast',
  function($scope, $meteor, $mdDialog, $mdToast) {

    $scope.opennedItemAction = null;
    $scope.openActionBar = function(itemId){
      $scope.opennedItemAction = itemId;
    }
    $scope.closeActionBar = function(){
      $scope.opennedItemAction = null;
    }

    function successToast(toastMsg){
      $mdToast.show({
        template: '<md-toast class="md-toast" style="background-color:#e74c3c;">' + toastMsg + '</md-toast>',
        hideDelay: 3000,
        position: 'top right'
      });
    }

    function failToast(toastMsg){
      $mdToast.show({
        template: '<md-toast class="md-toast md-warn" style="background-color:#e74c3c;">' + toastMsg + '</md-toast>',
        hideDelay: 3000,
        position: 'top right'
      });
    }

    $scope.$meteorSubscribe('managers');

    $scope.fnbManagers = $meteor.collection(function(){
      return Meteor.users.find(
        {'profile.role':'fnb-manager'},
        {fields: {username: 1, profile: 1}}
      );
    });

    $scope.tripManagers = $meteor.collection(function(){
      return Meteor.users.find(
        {'profile.role':'trip-manager'},
        {fields: {username: 1, profile: 1}}
      );
    });

    $scope.updateManager = function(target, manager){
      $mdDialog.show({
        controller: 'ManagerUpdateDialogCtrl',
        templateUrl: 'client/moduleAppManager/templates/views/manager-update-dialog.ng.html',
        locals: {manager: manager},
        parent: angular.element(document.body),
        targetEvent: target
      })
      .then(function() {
        successToast(manager.username + ' updated ');
      });
    };

    $scope.createManager = function(target){
      $mdDialog.show({
        controller: 'ManagerCreateDialogCtrl',
        templateUrl: 'client/moduleAppManager/templates/views/manager-create-dialog.ng.html',
        parent: angular.element(document.body),
        targetEvent: target
      })
      .then(function(newManager) {
        successToast(newManager.username + ' added to list');
      });
    };

    $scope.resetPassword = function(target, manager){
      // create new user (can be done by role:super-admin only)
      $mdDialog.show({
        controller: 'ManagerResetPasswordDialogCtrl',
        templateUrl: 'client/moduleAppManager/templates/views/manager-reset-password-dialog.ng.html',
        locals: {managerId: manager._id},
        parent: angular.element(document.body),
        targetEvent: target
      })
      .then(function() {
        successToast(manager.username + ' password reset');
      });
    };

    $scope.removeManager = function(target, manager){

      var confirm = $mdDialog.confirm()
      .parent(angular.element(document.body))
      .title('Are your sure want to delete this account?')
      .content(manager.username+' will be removed')
      .ariaLabel('confirm remove account')
      .ok('Remove account')
      .cancel('Cancel')
      .targetEvent(target);
      $mdDialog.show(confirm).then(function() {
        $meteor.call('serverRemoveManager', manager._id)
        .then(function(data) {
          successToast(manager.username + ' removed');
        }, function(error) {
          failToast('failed to remove '+ manager.username);
        });
      });
    };


  }
]);
