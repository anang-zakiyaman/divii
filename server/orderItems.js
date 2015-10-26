Meteor.publish('openOrderItems',function(options, isOpen){
  Counts.publish(this, 'numberOfOpenOrderItems', OrderItems.find({'status.isOpen': isOpen}), {noReady: true});
  return OrderItems.find({'status.isOpen': isOpen}, options);
});

Meteor.publish('orderItems',function(options, orderId){
  Counts.publish(this, 'numberOfOrderItems', OrderItems.find({'orderId': orderId}), {noReady: true});
  return OrderItems.find({'orderId': orderId}, options);
});
