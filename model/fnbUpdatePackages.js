FnbUpdatePackages = new FS.Collection("fnbUpdatePackages", {
  stores: [new FS.Store.GridFS("fnbUpdatePackages")]
});

FnbUpdatePackages.allow({
  insert: function(){ return true; },
  update: function(){ return true; },
  remove: function(){ return true; },
  download: function(){ return true; }
});
