angular.module("divii")
  .controller("FnbManagerLoginCtrl", [
    '$scope', '$meteor', '$state', '$mdToast',
    function($scope, $meteor, $state, $mdToast) {

      $scope.manager = {
        username: '',
        password: '',
      };

      $scope.login = function(){
        $meteor.loginWithPassword($scope.manager.username, $scope.manager.password)
        .then(function(){
          if(Meteor.user().profile.role == 'app-manager'){
              $state.go('appManager.home');
          } else if(Meteor.user().profile.role == 'fnb-manager'){
              $state.go('fnbManager.home');
          } else if(Meteor.user().profile.role == 'trip-manager'){
              $state.go('tripManager.home');
          } else {
              $state.go('divii.home');
          }
        }, function(error) {
          var toastMessage = 'unable to recognize, please check again';
          $mdToast.show({
            template: '<md-toast class="md-toast" style="background-color:#e74c3c;">' + toastMessage + '</md-toast>',
            hideDelay: 3000,
            position: 'top right'
          });
        });
      };
    }
  ]);
