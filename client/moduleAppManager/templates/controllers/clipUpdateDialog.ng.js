angular.module("divii")
.controller("AppClipUpdateDialogCtrl", ["$scope", "$mdDialog", "clipId",
  function($scope, $mdDialog, clipId){

    $scope.clip = $scope.$meteorObject(Clips, clipId, false).subscribe('clips');
    var activeDateUTC = new Date($scope.clip.activeDate+'Z');
    var expireDateUTC = new Date($scope.clip.expireDate+'Z');

    $scope.activeDate =   new Date( activeDateUTC.getTime() + ( activeDateUTC.getTimezoneOffset() * 60000 ) );
    $scope.expireDate =   new Date( expireDateUTC.getTime() + ( expireDateUTC.getTimezoneOffset() * 60000 ) );

    $scope.updateClip = function(){

      var localActiveDateUTC = new Date($scope.activeDate.getTime() - ( $scope.activeDate.getTimezoneOffset() * 60000 ));
      var localExpireDateUTC = new Date($scope.expireDate.getTime() - ( $scope.expireDate.getTimezoneOffset() * 60000 ));
      var activeDateIso = localActiveDateUTC.toISOString();
      var expireDateIso = localExpireDateUTC.toISOString();

      $scope.clip.activeDate = activeDateIso.substring(0, activeDateIso.indexOf('.'));
      $scope.clip.expireDate = expireDateIso.substring(0, expireDateIso.indexOf('.'));
      $scope.clip.save().then(function(numberOfDocs){
        $mdDialog.hide($scope.clip.title);
      }, function(error){
        $scope.errMsg = error;
      });
    };

    $scope.reset = function(){
      $scope.clip.reset();
      activeDateUTC = new Date($scope.clip.activeDate+'Z');
      expireDateUTC = new Date($scope.clip.expireDate+'Z');
      $scope.activeDate =   new Date( activeDateUTC.getTime() + ( activeDateUTC.getTimezoneOffset() * 60000 ) );
      $scope.expireDate =   new Date( expireDateUTC.getTime() + ( expireDateUTC.getTimezoneOffset() * 60000 ) );
    };

    $scope.cancelUpdate = function() {
      $mdDialog.cancel();
    };

  }
]);
