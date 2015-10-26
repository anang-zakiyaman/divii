angular.module("divii")
.controller("AppContentServerManagerCtrl", ["$scope", "$meteor", '$mdToast',
  function($scope, $meteor, $mdToast) {

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

    $meteor.subscribe('config').then(function(){
      console.log('success subscribing to config');
      $scope.contentServer = $scope.$meteorObject(Config, {configId: 'contentServer'}, false);
    }, function(error){
      console.log(error);
    });

    $scope.updateContentServer = function(){
      Config.update(
        { _id: $scope.contentServer._id},
        { $set: {
            baseUrl: $scope.contentServer.baseUrl,
            clip: $scope.contentServer.clip,
            movie: $scope.contentServer.movie,
            partnerSpa: $scope.contentServer.partnerSpa
        }},
        function(error, numberOfDocs){
          if(numberOfDocs) successToast('content server info updated');
          else failToast(error);
        }
      );
    };

    $scope.reset = function(){
      $scope.contentServer.reset();
    };

  }
]);
