ImageAdsContent = new FS.Collection("imageAdsContent", {
  stores: [new FS.Store.GridFS("imageAdsContent")]
});

ImageAdsContent.allow({
  insert: function(){ return true; },
  update: function(){ return true; },
  remove: function(){ return true; },
  download: function(){ return true; }
});
