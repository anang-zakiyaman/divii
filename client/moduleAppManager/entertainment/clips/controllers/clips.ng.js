angular.module("divii")
.controller("AppClipsManagerCtrl", ["$scope", "$meteor", '$mdDialog', '$mdToast',
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

    $scope.$meteorSubscribe('clipCovers');

    $scope.$meteorAutorun(function(){
      $scope.$meteorSubscribe('clips',{
        limit: parseInt($scope.getReactively('perPage')),
        skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
        sort: $scope.getReactively('sort')
      }, $scope.getReactively('searchKey'))
      .then(function(){
        $scope.clipsCount = $scope.$meteorObject(Counts, 'numberOfClips', false);
        if(!$scope.clips){
          $scope.clips = $scope.$meteorCollection(Clips, false);
        }
      });
    });

    $scope.viewClip = function(clipId){

    }

    $scope.updateClip = function(target, clipId){
      $mdDialog.show({
        controller: 'AppClipUpdateDialogCtrl',
        templateUrl: 'client/moduleAppManager/templates/views/clip-update-dialog.ng.html',
        locals: {clipId: clipId},
        parent: angular.element(document.body),
        targetEvent: target
      })
      .then(function(clipTitle) {
        successToast(clipTitle + ' updated ');
      });
    };

    $scope.removeClip = function(target, clip){
      var confirm = $mdDialog.confirm()
      .parent(angular.element(document.body))
      .title('Are your sure want to delete this clip?')
      .content(clip.title+' will be removed')
      .ariaLabel('confirm remove clip')
      .ok('Remove clip')
      .cancel('Cancel')
      .targetEvent(target);
      $mdDialog.show(confirm).then(function() {
        clip.cover.image.remove();
        $scope.clips.remove(clip._Id).then(function(data) {
          successToast(clip.title + ' removed');
        }, function(error) {
          failToast('failed to remove '+ clip.title);
        });
      });
    };

    $scope.coverImageUrl = function(coverImageId){
      var coverImage = ClipCovers.findOne({_id:coverImageId});
      return coverImage.url({store: 'clipCovers'});
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
