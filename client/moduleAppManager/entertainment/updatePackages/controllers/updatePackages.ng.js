angular.module("divii")
.controller("AppEntertainmentUpdatePackagesCtrl", ["$scope", "$state", "$meteor", '$mdDialog', '$mdToast',
  function($scope, $state, $meteor, $mdDialog, $mdToast) {

    $scope.$meteorSubscribe('entertainmentUpdatePackages').then(function(){
        $scope.entertainmentUpdatePackages = $meteor.collectionFS(EntertainmentUpdatePackages, false);
    });

    $scope.opennedItemAction = null;
    $scope.openActionBar = function(itemId){
      $scope.opennedItemAction = itemId;
    }
    $scope.closeActionBar = function(){
      $scope.opennedItemAction = null;
    }

    $scope.uploadPackage = function(){
      var importElement = angular.element(document.querySelector('#file-input'))[0];
      EntertainmentUpdatePackages.insert(importElement.files[0], function(error, fileObj){
      });
    }

    $scope.publishPackageContent = function(packageId){
      $meteor.call('serverPublishEntertainmentUpdate', packageId)
      .then(function(extractedData) {
        // $mdDialog.show({
        //   controller: 'AppExtractedContentDialogCtrl',
        //   templateUrl: 'client/moduleAppManager/templates/views/extracted-content-dialog.ng.html',
        //   locals: {extractedData: extractedData},
        //   parent: angular.element(document.body),
        //   targetEvent: target
        // })
        // .then(function(movieTitle) {
        //   successToast(movieTitle + ' updated ');
        // });
        successToast('package published');
      }, function(error) {
        // failToast();
      });
    }

    $scope.updateMovie = function(target, movieId){

    };

    $scope.removePackage = function(target, packageId){
      $scope.entertainmentUpdatePackages.remove(packageId);
    }

  }
]);
