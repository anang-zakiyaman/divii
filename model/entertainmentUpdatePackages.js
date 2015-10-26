EntertainmentUpdatePackages = new FS.Collection("entertainmentUpdatePackages", {
  stores: [new FS.Store.GridFS("entertainmentUpdatePackages")]
});

EntertainmentUpdatePackages.allow({
  insert: function(){ return true; },
  update: function(){ return true; },
  remove: function(){ return true; },
  download: function(){ return true; }
});
