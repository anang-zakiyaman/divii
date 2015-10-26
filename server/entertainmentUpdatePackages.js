Meteor.publish('entertainmentUpdatePackages',function(){
    return EntertainmentUpdatePackages.find({});
});

Meteor.methods({
  serverPublishEntertainmentUpdate: function(packageId){

    if(Meteor.user().profile.role !== 'app-manager'){
      throw new Meteor.Error(403, "You must be logged in as app manager to create new manager");
    }

    var syncReadPackage = Meteor.wrapAsync(asyncReadEntertainmentPackage);
    var updateContent = syncReadPackage(packageId);
    var packageInfo = JSON.parse(updateContent.zip.file(updateContent.packageFolderName + "/info.json").asText());
    var updatedClips = updateClips(updateContent.zip, packageInfo, updateContent.packageFolderName + "/clips/");
    var updatedMovies = updateMovies(updateContent.zip, packageInfo, updateContent.packageFolderName + "/movies/");
    return {
      updatedClips: updatedClips,
      updatedMovies: updatedMovies
    };
  }
});

var asyncReadEntertainmentPackage = function(packageId, callback){
  var doc = EntertainmentUpdatePackages.findOne({_id: packageId});
  var zipFileName = doc.name();
  var packageFolderName = zipFileName.substring(0,zipFileName.lastIndexOf('.'));
  var readStream = doc.createReadStream('entertainmentUpdatePackages');
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

var updateClips = function(zip, packageInfo, clipsFolder){
  var updatedClips = [];
  for (var i = 0; i < packageInfo.clips.length; i++) {

    var updateInfo = packageInfo.clips[i];
    var coverZipFile = zip.file(clipsFolder + updateInfo.code +'.'+ updateInfo.cover.extension);

    if (coverZipFile !== null){
      var coverImageBuffer = coverZipFile.asArrayBuffer();
      var coverImageFile = new FS.File();

      var attachData = Meteor.wrapAsync(coverImageFile.attachData, coverImageFile);
      attachData(coverImageBuffer, {type: updateInfo.cover.mime});

      coverImageFile.name(updateInfo.code +'.'+ updateInfo.cover.extension);
      var fileObj = ClipCovers.insert(coverImageFile);
      updateInfo.cover.image = fileObj;
      // check if image ad with the same code already exist
      var clip = Clips.findOne({code: updateInfo.code});
      if(typeof clip === 'undefined' ||  clip == null){
        // is new clip, insert!
        Clips.insert(updateInfo);
      } else {
        // remove existing cover image and update clip data
        if(clip.cover.image !== null) clip.cover.image.remove();
        Clips.update({_id: clip._id},{ $set:updateInfo });
      }
      updatedClips.push(updateInfo.code);
    }
  }
  return updatedClips;
}

var updateMovies = function(zip, packageInfo, moviesFolder){
  var updatedMovies = [];
  for (var i = 0; i < packageInfo.movies.length; i++) {

    var updateInfo = packageInfo.movies[i];
    var coverZipFile = zip.file(moviesFolder + updateInfo.code +'.'+ updateInfo.cover.extension);

    if (coverZipFile !== null){
      var coverImageBuffer = coverZipFile.asArrayBuffer();
      var coverImageFile = new FS.File();

      var attachData = Meteor.wrapAsync(coverImageFile.attachData, coverImageFile);
      attachData(coverImageBuffer, {type: updateInfo.cover.mime});

      coverImageFile.name(updateInfo.code +'.'+ updateInfo.cover.extension);
      var fileObj = MovieCovers.insert(coverImageFile);
      updateInfo.cover.image = fileObj;
      // check if video ad with the same code already exist
      var movie = Movies.findOne({code: updateInfo.code});
      if(typeof movie == 'undefined' ||  movie == null){
        // is new video ad, insert!
        Movies.insert(updateInfo);
      } else {
        // remove existing video and update video ad data
        if(movie.cover.image !== null) movie.cover.image.remove();
        Movies.update({_id: movie._id},{ $set:updateInfo });
      }
      updatedMovies.push(updateInfo.code);
    }
  }
  return updatedMovies;
}
