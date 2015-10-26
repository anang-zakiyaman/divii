Meteor.publish('orders',function(options, isOpen){
  Counts.publish(this, 'numberOfOpenOrders', Orders.find({'status.isOpen': isOpen}), {noReady: true});
  return Orders.find({'status.isOpen': isOpen}, options);
});

Meteor.publish('userOrders',function(options, owner, isOpen){
  return Orders.find({
    $and:[
      {'status.isOpen': isOpen},
      {'owner.class': owner.class},
      {'owner.coach': owner.coach},
      {'owner.row': owner.row},
      {'owner.seat': owner.seat}
    ]
  }, options);
});
