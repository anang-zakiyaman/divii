angular.module('divii',
  [
    'angular-meteor',
    'ui.router',
    'angularUtils.directives.dirPagination',
    'ngMaterial'
  ]
);

var themeIcons = function($mdIconProvider){
  $mdIconProvider
  .iconSet("av", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-av.svg")
  .iconSet("maps", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-maps.svg")
  .iconSet("social", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg")
  .iconSet("action", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg")
  .iconSet("communication", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg")
  .iconSet("content", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg")
  .iconSet("toggle", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-toggle.svg")
  .iconSet("navigation", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg")
  .iconSet("image", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg");
};

angular.module('divii').config(themeIcons);

angular.module('divii').config(function($mdThemingProvider) {
  var flatUiMap = $mdThemingProvider.extendPalette('blue', { '500': '2c3e50'});
  $mdThemingProvider.definePalette('flatUi', flatUiMap);
  $mdThemingProvider.theme('default').primaryPalette('flatUi');
  $mdThemingProvider.theme('docs-dark').dark();
});


if(Meteor.isCordova){
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}

function onReady(){
  angular.bootstrap(document, ['divii']);
}

// Global variables and functions
// angular.module('divii').run(['$rootScope', '$state', '$location', '$mdSidenav', '$meteor',
  // function($rootScope, $state, $location, $mdSidenav, $meteor) {
  angular.module('divii').run(['$rootScope',
    function($rootScope) {

    // $rootScope.isFullscreenEnabled = function(){
    //   if (document.fullscreenEnabled || document.webkitFullscreenEnabled ||
    //       document.mozFullScreenEnabled || document.msFullscreenEnabled) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // };

    // $rootScope.isFullscreen = function(){
    //   if (document.fullscreenElement ||
    //       document.webkitFullscreenElement ||
    //       document.mozFullScreenElement ||
    //       document.msFullscreenElement) {
    //         return true;
    //   } else {
    //     return false;
    //   }
    // };
    //
    // $rootScope.goFullScreen = function(element){
    //   if (element.requestFullscreen) element.requestFullscreen();
    //   else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
    //   else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
    //   else if (element.msRequestFullscreen) element.msRequestFullscreen();
    // };
    //
    // $rootScope.exitFullScreen = function(){
    //   if (document.exitFullscreen) document.exitFullscreen();
    //   else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    //   else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    //   else if (document.msExitFullscreen) document.msExitFullscreen();
    // };
    //
    // $rootScope.toggleFullscreen = function(){
    //   if ($rootScope.isFullscreenEnabled()) {
    //     if ($rootScope.isFullscreen()){
    //         $rootScope.exitFullScreen();
    //     } else {
    //       var appContainer = document.getElementById("divii-container");
    //       $rootScope.goFullScreen(appContainer);
    //     }
    //   }
    // };

    // $rootScope.userOrdersSubscription = null;
    // $rootScope.numberOfOrders = 0;

}]);
