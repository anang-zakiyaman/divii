AdsUpdatePackages = new FS.Collection("adsUpdatePackages", {
  stores: [new FS.Store.GridFS("adsUpdatePackages")]
});

AdsUpdatePackages.allow({
  insert: function(){ return true; },
  update: function(){ return true; },
  remove: function(){ return true; },
  download: function(){ return true; }
});
