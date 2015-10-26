angular.module("divii")
.controller("AppTrainInfoManagerCtrl", ["$scope", "$meteor", '$mdToast',
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

    $scope.$meteorSubscribe('config').then(function(){
      $scope.trainInfo = $scope.$meteorObject(Config, {configId: 'trainInfo'}, false);
      console.log($scope.trainInfo);
    });

    $scope.updateTrainInfo = function(){
      Config.update(
        { _id: $scope.trainInfo._id},
        { $set: {
            train: $scope.trainInfo.train,
            route: $scope.trainInfo.route
        }},
        function(error, numberOfDocs){
          if(numberOfDocs) successToast('train info updated');
          else failToast(error);
        }
      );
    };

    $scope.reset = function(){
      $scope.trainInfo.reset();
    };

  }
]);
