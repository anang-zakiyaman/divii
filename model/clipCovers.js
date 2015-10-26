ClipCovers = new FS.Collection("clipCovers", {
  stores: [new FS.Store.GridFS("clipCovers")]
});

ClipCovers.allow({
  insert: function(){ return true; },
  update: function(){ return true; },
  remove: function(){ return true; },
  download: function(){ return true; }
});
