Meteor.startup(function(){
  //$('.inject-loading-container').remove();
  var loadingContainer = angular.element( document.querySelector( '.inject-loading-container' ) );
  loadingContainer.remove();
});
