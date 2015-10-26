VideoAdsContent = new FS.Collection("videoAdsContent", {
  stores: [new FS.Store.GridFS("videoAdsContent")]
});

VideoAdsContent.allow({
  insert: function(){ return true; },
  update: function(){ return true; },
  remove: function(){ return true; },
  download: function(){ return true; }
});
