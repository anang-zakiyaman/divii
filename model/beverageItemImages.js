BeverageItemImages = new FS.Collection("beverageItemImages", {
  stores: [new FS.Store.GridFS("beverageItemImages")]
});

BeverageItemImages.allow({
  insert: function(){ return true; },
  update: function(){ return true; },
  remove: function(){ return true; },
  download: function(){ return true; }
});
