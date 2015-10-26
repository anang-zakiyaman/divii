MovieCovers = new FS.Collection("movieCovers", {
  stores: [new FS.Store.GridFS("movieCovers")]
});

MovieCovers.allow({
  insert: function(){ return true; },
  update: function(){ return true; },
  remove: function(){ return true; },
  download: function(){ return true; }
});
