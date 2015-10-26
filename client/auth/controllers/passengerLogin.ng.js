angular.module("divii")
  .controller("PassengerLoginCtrl", [
    '$rootScope', '$scope', '$meteor', '$state', '$mdToast', '$interval',
    function($rootScope, $scope, $meteor, $state, $mdToast, $interval) {

      $scope.$meteorSubscribe('config').then(function(){
        $scope.trainInfo = $scope.$meteorObject(Config, {'configId': 'trainInfo'}, false);
        console.log($scope.trainInfo);
      });

      $scope.user = {
        name: '', gender: 'male', age: 30,
        ticket: { code: '', class: '', coach: '', row: '', seat: '' }
      };

      $scope.registrationFormHidden = true;

      $scope.hideRegistrationForm = function(isHidden){
        $scope.registrationFormHidden = isHidden;
      };

      // $scope.showPopupAd = function(){
      //   // go to full screen popup screen
      //   $scope.popupAdprogress = 0;
      //   angular.element('body').addClass('showing-popup-ad');
      //   // $scope.$apply(function(){
      //     $scope.popupImgUrl = $rootScope.contentServer+'/ads/image/popup1.jpg';
      //     // angular.element('body.showing-popup-ad .md-dialog-backdrop').css({'background-image': 'url('+popupImgUrl+')'});
      //   // });
      //   $mdDialog.show({  scope: $scope,
      //                     templateUrl: 'client/ads/views/popup-dialog.ng.html',
      //                     parent: angular.element(document.body)});
      //   $mdToast.show({ scope: $scope,
      //                   templateUrl: 'client/ads/views/popup-toast.ng.html',
      //                   hideDelay: 0,
      //                   position: 'bottom left'});
      //   popupAdTimeout = $interval(function(){
      //     if($scope.popupAdprogress < 100){
      //       $scope.popupAdprogress += 1;
      //     } else {
      //       $scope.closePopupAd(popupAdTimeout);
      //     }
      //   }, 50, 101);
      // };

      // $scope.closePopupAd = function(popupAdTimeout){
      //   if (angular.isDefined(popupAdTimeout)) {
      //     $interval.cancel(popupAdTimeout);
      //     popupAdTimeout = undefined;
      //   }
      //   $state.go('home').then(
      //     function(){
      //       $mdToast.hide();
      //       $mdDialog.hide();
      //       angular.element('body').removeClass('showing-popup-ad');
      //     },
      //     function(){}
      //   );
      // }

      var goToFullscreenImageAd = function(){
        $state.go('fullScreenImageAd',{
          targetSpace:'ATO001',
          nextState:'divii.home',
          waitMessage: 'signing in'
        });
      }

      $scope.login = function(){
        var username = ($scope.user.ticket.code).toUpperCase();
        var password = (($scope.user.ticket.class).toUpperCase())
                        .concat($scope.user.ticket.coach)
                        .concat($scope.user.ticket.row)
                        .concat(($scope.user.ticket.seat).toUpperCase());
        $meteor.loginWithPassword(username, password)
        .then(function(){
          console.log('logged in');
          goToFullscreenImageAd();
        }, function(error){
          console.log(error);
          var toastMessage = 'unable to recognize, please check again / register your ticket';
          $mdToast.show({
            template: '<md-toast class="md-toast" style="background-color:#e74c3c;">' + toastMessage + '</md-toast>',
            hideDelay: 3000,
            position: 'top right'
          });
        });
      };

      $scope.register = function(){
        var username = ($scope.user.ticket.code).toUpperCase();
        var password = (($scope.user.ticket.class).toUpperCase())
                        .concat($scope.user.ticket.coach)
                        .concat($scope.user.ticket.row)
                        .concat(($scope.user.ticket.seat).toUpperCase())
        $meteor.createUser({
          username: username,
          password: password,
          profile: {
            role: 'passenger',
            name: $scope.user.name,
            gender: $scope.user.gender,
            age: $scope.user.age,
            transportation:{
              operator: 'kai',
              media: 'train',
              vehicleCode : $scope.trainInfo.train.code,
              ticket: $scope.user.ticket
            },
            userAgent: window.navigator.userAgent
          }
        })
        .then(function(){
          goToFullscreenImageAd();
        }, function(error){
          var toastMessage = 'Please check again if each field is properly inserted';
          $mdToast.show({
            template: '<md-toast class="md-toast" style="background-color:#e74c3c;">' + toastMessage + '</md-toast>',
            hideDelay: 3000,
            position: 'top right'
          });
        });
      };
    }
  ]);
