angular.module("divii")
.controller("AppFoodItemsManagerCtrl", ["$scope", "$meteor", '$mdDialog', '$mdToast',
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

    $scope.$meteorSubscribe('foodItemImages');

    $scope.$meteorAutorun(function(){
      $scope.$meteorSubscribe('foodItems',{
        limit: parseInt($scope.getReactively('perPage')),
        skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
        sort: $scope.getReactively('sort')
      }, $scope.getReactively('searchKey'))
      .then(function(){
        $scope.foodItemsCount = $scope.$meteorObject(Counts, 'numberOfFoodItems', false);
        if(!$scope.foodItems){
          $scope.foodItems = $scope.$meteorCollection(FoodItems, true);
          for(var i=0; i< $scope.foodItems.length; i++){
            if( typeof $scope.foodItems[i].available === 'undefined' || $scope.foodItems[i].available == null){
              $scope.foodItems[i].available = false;
            }
          }
        }
      });
    });

    $scope.viewFoodItem = function(foodItemId){

    }

    $scope.updateFoodItem = function(target, foodItemId){
      $mdDialog.show({
        controller: 'AppFoodItemUpdateDialogCtrl',
        templateUrl: 'client/moduleAppManager/templates/views/food-item-update-dialog.ng.html',
        locals: {foodItemId: foodItemId},
        parent: angular.element(document.body),
        targetEvent: target
      })
      .then(function(foodItemTitle) {
        successToast(foodItemTitle + ' updated ');
      });
    };

    $scope.removeFoodItem = function(target, foodItem){
      var confirm = $mdDialog.confirm()
      .parent(angular.element(document.body))
      .title('Are your sure want to delete this food item?')
      .content(foodItem.title+' will be removed')
      .ariaLabel('confirm remove food item')
      .ok('Remove food item')
      .cancel('Cancel')
      .targetEvent(target);
      $mdDialog.show(confirm).then(function() {
        foodItem.image.remove();
        $scope.foodItems.remove(foodItem._Id).then(function(data) {
          successToast(foodItem.title + ' removed');
        }, function(error) {
          failToast('failed to remove '+ foodItem.title);
        });
      });
    };

    $scope.foodItemImageUrl = function(foodItemImageId){
      console.log(foodItemImageId);
      var foodItemImage = FoodItemImages.findOne({_id:foodItemImageId});
      return foodItemImage.url({store: 'foodItemImages'});
    };

    $scope.clearFilter = function() {
      $scope.searchKey = '';
    };

    $scope.pageChanged = function(newPage){
      $scope.page = newPage;
    };

  }
]);
