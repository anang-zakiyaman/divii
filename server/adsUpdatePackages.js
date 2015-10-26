
Meteor.publish('adsUpdatePackages',function(){
    return AdsUpdatePackages.find({});
});

Meteor.methods({
  serverPublishAdsUpdate: function(packageId){

    if(Meteor.user().profile.role !== 'app-manager'){
      throw new Meteor.Error(403, "You must be logged in as app manager to create new manager");
    }

    var syncReadPackage = Meteor.wrapAsync(asyncReadAdsUpdatePackage);
    var updateContent = syncReadPackage(packageId);
    var packageInfo = JSON.parse(updateContent.zip.file(updateContent.packageFolderName + "/info.json").asText());
    var updatedImageAds = updateImageAds(updateContent.zip, packageInfo, updateContent.packageFolderName + "/imageAds/");
    var updatedVideoAds = updateVideoAds(updateContent.zip, packageInfo, updateContent.packageFolderName + "/videoAds/");
    return {
      updatedImageAds: updatedImageAds,
      updatedVideoAds: updatedVideoAds
    };
  }
});

var asyncReadAdsUpdatePackage = function(packageId, callback){
  var doc = AdsUpdatePackages.findOne({_id: packageId});
  var zipFileName = doc.name();
  var packageFolderName = zipFileName.substring(0,zipFileName.lastIndexOf('.'));
  var readStream = doc.createReadStream('adsUpdatePackages');
  var readStreamBuffer = [];
  readStream.on('data', function(chunk){
    readStreamBuffer.push(chunk);
  });
  readStream.on('end', function(){
    var zip = new JSZip(Buffer.concat(readStreamBuffer));
    callback(null, {
      zip: zip,
      packageFolderName: packageFolderName
    });
  });
}

var updateImageAds = function(zip, packageInfo, imageAdsFolder){
  var updatedImages = [];
  for (var i = 0; i < packageInfo.imageAds.length; i++) {

    var updateInfo = packageInfo.imageAds[i];
    var zipFile = zip.file(imageAdsFolder + updateInfo.code +'.'+ updateInfo.content.extension);

    if (zipFile !== null){

      updateInfo.activeDate = dateToPrimitive(updateInfo.activeDate);
      updateInfo.expireDate = dateToPrimitive(updateInfo.expireDate);

      var adImageBuffer = zipFile.asArrayBuffer();
      var imageFile = new FS.File();

      var attachData = Meteor.wrapAsync(imageFile.attachData, imageFile);
      attachData(adImageBuffer, {type: updateInfo.content.mime});

      imageFile.name(updateInfo.code +'.'+ updateInfo.content.extension);
      var fileObj = ImageAdsContent.insert(imageFile);
      updateInfo.image = fileObj;
      // check if image ad with the same code already exist
      var imageAd = ImageAds.findOne({code: updateInfo.code});
      if(typeof imageAd === 'undefined' ||  imageAd == null){
        // is new image ad, insert!
        ImageAds.insert(updateInfo);
      } else {
        // remove existing image and update image ad data
        if(imageAd.image !== null) imageAd.image.remove();
        ImageAds.update({_id: imageAd._id},{ $set:updateInfo });
      }
      updatedImages.push(updateInfo.code +'.'+ updateInfo.content.extension);
    }
  }
  return updatedImages;
}

var updateVideoAds = function(zip, packageInfo, videoAdsFolder){
  var updatedVideos = [];
  for (var i = 0; i < packageInfo.videoAds.length; i++) {

    var updateInfo = packageInfo.videoAds[i];
    var zipFile = zip.file(videoAdsFolder + updateInfo.code +'.'+ updateInfo.content.extension);

    if (zipFile !== null){

      updateInfo.activeDate = dateToPrimitive(updateInfo.activeDate);
      updateInfo.expireDate = dateToPrimitive(updateInfo.expireDate);

      var adVideoBuffer = zipFile.asArrayBuffer();
      var videoFile = new FS.File();

      var attachData = Meteor.wrapAsync(videoFile.attachData, videoFile);
      attachData(adVideoBuffer, {type: updateInfo.content.mime});

      videoFile.name(updateInfo.code +'.'+ updateInfo.content.extension);
      var fileObj = VideoAdsContent.insert(videoFile);
      updateInfo.video = fileObj;
      // check if video ad with the same code already exist
      var videoAd = VideoAds.findOne({code: updateInfo.code});
      if(typeof videoAd == 'undefined' ||  videoAd == null){
        // is new video ad, insert!
        VideoAds.insert(updateInfo);
      } else {
        // remove existing video and update video ad data
        if(videoAd.video !== null) videoAd.video.remove();
        VideoAds.update({_id: videoAd._id},{ $set:updateInfo });
      }
      updatedVideos.push(updateInfo.code +'.'+ updateInfo.content.extension);
    }
  }
  return updatedVideos;
}

// converting from ISO date (eg. "2015-08-19T00:00:00") to its primitive format
var dateToPrimitive = function(inputDate){
  var dateUTC = new Date(inputDate+'Z');
  var localDate =   new Date( dateUTC.getTime() + ( dateUTC.getTimezoneOffset() * 60000 ) );
  return localDate.valueOf();
}
