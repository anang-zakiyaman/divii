Meteor.methods({
    getClientIp: function(){
      var clientIp = this.connection.clientAddress;
      return clientIp;
    }
});
