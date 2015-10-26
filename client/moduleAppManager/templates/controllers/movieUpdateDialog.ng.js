angular.module("divii")
.controller("AppMovieUpdateDialogCtrl", ["$scope", "$mdDialog", "movieId",
  function($scope, $mdDialog, movieId){

    $scope.movie = $scope.$meteorObject(Movies, movieId, false).subscribe('movies');
    var activeDateUTC = new Date($scope.movie.activeDate+'Z');
    var expireDateUTC = new Date($scope.movie.expireDate+'Z');

    $scope.activeDate =   new Date( activeDateUTC.getTime() + ( activeDateUTC.getTimezoneOffset() * 60000 ) );
    $scope.expireDate =   new Date( expireDateUTC.getTime() + ( expireDateUTC.getTimezoneOffset() * 60000 ) );

    $scope.updateMovie = function(){

      var localActiveDateUTC = new Date($scope.activeDate.getTime() - ( $scope.activeDate.getTimezoneOffset() * 60000 ));
      var localExpireDateUTC = new Date($scope.expireDate.getTime() - ( $scope.expireDate.getTimezoneOffset() * 60000 ));
      var activeDateIso = localActiveDateUTC.toISOString();
      var expireDateIso = localExpireDateUTC.toISOString();

      $scope.movie.activeDate = activeDateIso.substring(0, activeDateIso.indexOf('.'));
      $scope.movie.expireDate = expireDateIso.substring(0, expireDateIso.indexOf('.'));
      $scope.movie.save().then(function(numberOfDocs){
        $mdDialog.hide($scope.movie.title);
      }, function(error){
        $scope.errMsg = error;
      });
    };

    $scope.reset = function(){
      $scope.movie.reset();
      activeDateUTC = new Date($scope.movie.activeDate+'Z');
      expireDateUTC = new Date($scope.movie.expireDate+'Z');
      $scope.activeDate =   new Date( activeDateUTC.getTime() + ( activeDateUTC.getTimezoneOffset() * 60000 ) );
      $scope.expireDate =   new Date( expireDateUTC.getTime() + ( expireDateUTC.getTimezoneOffset() * 60000 ) );
    };

    $scope.cancelUpdate = function() {
      $mdDialog.cancel();
    };

  }
]);
