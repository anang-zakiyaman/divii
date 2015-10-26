angular.module("divii")
.controller("AppBeverageItemsManagerCtrl", ["$scope", "$meteor", '$mdDialog', '$mdToast',
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

    $scope.$meteorSubscribe('beverageItemImages');

    $scope.$meteorAutorun(function(){
      $scope.$meteorSubscribe('beverageItems',{
        limit: parseInt($scope.getReactively('perPage')),
        skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
        sort: $scope.getReactively('sort')
      }, $scope.getReactively('searchKey'))
      .then(function(){
        $scope.beverageItemsCount = $scope.$meteorObject(Counts, 'numberOfBeverageItems', false);
        if(!$scope.beverageItems){
          $scope.beverageItems = $scope.$meteorCollection(BeverageItems, true);
          for(var i=0; i< $scope.beverageItems.length; i++){
            if( typeof $scope.beverageItems[i].available === 'undefined' || $scope.beverageItems[i].available == null){
              $scope.beverageItems[i].available = false;
            }
          }
        }
      });
    });

    $scope.viewBeverageItem = function(beverageItemId){

    }

    $scope.updateBeverageItem = function(target, beverageItemId){
      $mdDialog.show({
        controller: 'AppBeverageItemUpdateDialogCtrl',
        templateUrl: 'client/moduleAppManager/templates/views/beverage-item-update-dialog.ng.html',
        locals: {beverageItemId: beverageItemId},
        parent: angular.element(document.body),
        targetEvent: target
      })
      .then(function(beverageItemTitle) {
        successToast(beverageItemTitle + ' updated ');
      });
    };

    $scope.removeBeverageItem = function(target, beverageItem){
      var confirm = $mdDialog.confirm()
      .parent(angular.element(document.body))
      .title('Are your sure want to delete this beverage item?')
      .content(beverageItem.title+' will be removed')
      .ariaLabel('confirm remove beverage item')
      .ok('Remove beverage item')
      .cancel('Cancel')
      .targetEvent(target);
      $mdDialog.show(confirm).then(function() {
        beverageItem.image.remove();
        $scope.beverageItems.remove(beverageItem._Id).then(function(data) {
          successToast(beverageItem.title + ' removed');
        }, function(error) {
          failToast('failed to remove '+ beverageItem.title);
        });
      });
    };

    $scope.beverageItemImageUrl = function(beverageItemImageId){
      var beverageItemImage = BeverageItemImages.findOne({_id:beverageItemImageId});
      return beverageItemImage.url({store: 'beverageItemImages'});
    }

    $scope.clearFilter = function() {
      $scope.searchKey = '';
    };

    $scope.pageChanged = function(newPage){
      $scope.page = newPage;
    };

  }
]);
