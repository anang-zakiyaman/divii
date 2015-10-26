angular.module('divii')
.factory('clientIp', ['$meteor',
  function($meteor) {
    var clientIp = null;
    var subscribeOrders = {
      subscribe: function(userId){
        subscription = $meteor.subscribe('userOrders', userId);
      },
      setClientIp: function(){
        clientIp = $meteor.call('getClientIp');
      },
      getClientIp: function(){
          return clientIp;
      }
    };
    return subscribeOrders;
  }
]);
