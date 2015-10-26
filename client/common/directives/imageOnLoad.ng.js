angular.module('divii')
.directive('imageonload', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind('load', function() {
        element.removeClass('image-loading');
      });
    }
  };
});
