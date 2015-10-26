angular.module("divii")
.controller("AppMoviesManagerCtrl", ["$scope", "$meteor", '$mdDialog', '$mdToast',
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

    $scope.searchKey = "";

    // Pagination
    $scope.page = 1;
    $scope.perPage = 5;
    $scope.sort = {activeDate: -1};

    $scope.$meteorSubscribe('movieCovers');

    $scope.$meteorAutorun(function(){
      $scope.$meteorSubscribe('movies',{
        limit: parseInt($scope.getReactively('perPage')),
        skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
        sort: $scope.getReactively('sort')
      }, $scope.getReactively('searchKey'))
      .then(function(){
        $scope.moviesCount = $scope.$meteorObject(Counts, 'numberOfMovies', false);
        if(!$scope.movies){
          $scope.movies = $scope.$meteorCollection(Movies, false);
        }
      });
    });

    $scope.viewMovie = function(movieId){

    }

    $scope.updateMovie = function(target, movieId){
      $mdDialog.show({
        controller: 'AppMovieUpdateDialogCtrl',
        templateUrl: 'client/moduleAppManager/templates/views/movie-update-dialog.ng.html',
        locals: {movieId: movieId},
        parent: angular.element(document.body),
        targetEvent: target
      })
      .then(function(movieTitle) {
        successToast(movieTitle + ' updated ');
      });
    };

    $scope.removeMovie = function(target, movie){
      var confirm = $mdDialog.confirm()
      .parent(angular.element(document.body))
      .title('Are your sure want to delete this movie?')
      .content(movie.title+' will be removed')
      .ariaLabel('confirm remove movie')
      .ok('Remove movie')
      .cancel('Cancel')
      .targetEvent(target);
      $mdDialog.show(confirm).then(function() {
        movie.cover.image.remove();
        $scope.movies.remove(movie._Id).then(function(data) {
          successToast(movie.title + ' removed');
        }, function(error) {
          failToast('failed to remove '+ movie.title);
        });
      });
    };

    $scope.coverImageUrl = function(coverImageId){
      var coverImage = MovieCovers.findOne({_id:coverImageId});
      return coverImage.url({store: 'movieCovers'});
    }

    $scope.isActive = function(activeDate, expireDate){
      var currentDate = new Date();
      var activeDate = new Date(activeDate);
      var expireDate = new Date(expireDate);
      return activeDate < currentDate && currentDate < expireDate;
    }

    $scope.clearFilter = function() {
      $scope.searchKey = '';
    };

    $scope.pageChanged = function(newPage){
      $scope.page = newPage;
    };

  }
]);
