angular.module('divii')
  .filter('category', function(){
    return function(clips, category){
      if(!category) return false;
      // filter out clips based on category
      return _.filter(clips, function(clip){
        if(clip.category == category) return true;
        else return false;
      });
    }
  });
