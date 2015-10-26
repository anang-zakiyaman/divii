angular.module("divii")
.controller("AppFnbUpdatePackagesCtrl", ["$scope", "$state", "$meteor", '$mdDialog', '$mdToast',
  function($scope, $state, $meteor, $mdDialog, $mdToast) {

    $scope.$meteorSubscribe('fnbUpdatePackages').then(function(){
        $scope.fnbUpdatePackages = $meteor.collectionFS(FnbUpdatePackages, false);
    });

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

    $scope.uploadPackage = function(){
      var importElement = angular.element(document.querySelector('#file-input'))[0];
      FnbUpdatePackages.insert(importElement.files[0], function(error, fileObj){
      });
    }

    $scope.publishPackageContent = function(packageId){
      $meteor.call('serverPublishFnbUpdate', packageId)
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
        console.log(extractedData);
        successToast('package published');
      }, function(error) {
        // failToast();
      });
    }

    $scope.removePackage = function(target, packageId){
      $scope.fnbUpdatePackages.remove(packageId);
    }

  }
]);
