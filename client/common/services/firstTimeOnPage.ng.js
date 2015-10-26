angular.module('divii')
.factory('firstTimeOnPage', [function() {
  // first time on page
  var visitedPage = [];
  var firstTimeOnPage = {
    isFirstTime: function(stateName){
      //check if stateName exist in visitedPage
      if(visitedPage.indexOf(stateName) > -1){
        return false;
      } else {
        //add state name to visitedPage
        visitedPage.push(stateName);
        return true;
      }
    }
  };
  return firstTimeOnPage;
}]);
