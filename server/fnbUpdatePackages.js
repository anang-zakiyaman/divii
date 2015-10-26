Meteor.publish('fnbUpdatePackages',function(){
    return FnbUpdatePackages.find({});
});

Meteor.methods({
  serverPublishFnbUpdate: function(packageId){

    if(Meteor.user().profile.role !== 'app-manager'){
      throw new Meteor.Error(403, "You must be logged in as app manager to add fnb item");
    }

    var syncReadPackage = Meteor.wrapAsync(asyncReadFnbPackage);
    var updateContent = syncReadPackage(packageId);
    var packageInfo = JSON.parse(updateContent.zip.file(updateContent.packageFolderName + "/info.json").asText());
    var updatedFoodItems = updateFoodItems(updateContent.zip, packageInfo, updateContent.packageFolderName + "/food/");
    var updatedBeverageItems = updateBeverageItems(updateContent.zip, packageInfo, updateContent.packageFolderName + "/beverages/");
    return {
      updatedFoodItems: updatedFoodItems,
      updatedBeverageItems: updatedBeverageItems
    };
  }
});

var asyncReadFnbPackage = function(packageId, callback){
  var doc = FnbUpdatePackages.findOne({_id: packageId});
  var zipFileName = doc.name();
  var packageFolderName = zipFileName.substring(0,zipFileName.lastIndexOf('.'));
  var readStream = doc.createReadStream('fnbUpdatePackages');
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
};

var updateFoodItems = function(zip, packageInfo, foodFolder){
  var updatedFoodItems = [];
  for (var i = 0; i < packageInfo.foodItems.length; i++) {
    var updateInfo = packageInfo.foodItems[i];
    var imageZipFile = zip.file(foodFolder + updateInfo.code +'.'+ updateInfo.image.extension);

    if (imageZipFile !== null){
      var imageBuffer = imageZipFile.asArrayBuffer();
      var imageFile = new FS.File();

      var attachData = Meteor.wrapAsync(imageFile.attachData, imageFile);
      attachData(imageBuffer, {type: updateInfo.image.mime});

      imageFile.name(updateInfo.code +'.'+ updateInfo.image.extension);
      var fileObj = FoodItemImages.insert(imageFile);
      updateInfo.image = fileObj;
      // check if food item image of the same code already exist
      var foodItem = FoodItems.findOne({code: updateInfo.code});
      if(typeof foodItem === 'undefined' ||  foodItem == null){
        // is new food item, insert!
        FoodItems.insert(updateInfo);
      } else {
        // remove existing image file and update food item data
        if(foodItem.image !== null) foodItem.image.remove();
        FoodItems.update({_id: foodItem._id},{ $set:updateInfo });
      }
      updatedFoodItems.push(updateInfo.title);
    }
  }
  return updatedFoodItems;
};

var updateBeverageItems = function(zip, packageInfo, beveragesFolder){
  var updatedBeverageItems = [];
  for (var i = 0; i < packageInfo.beverageItems.length; i++) {

    var updateInfo = packageInfo.beverageItems[i];
    var imageZipFile = zip.file(beveragesFolder + updateInfo.code +'.'+ updateInfo.image.extension);

    if (imageZipFile !== null){
      var imageBuffer = imageZipFile.asArrayBuffer();
      var imageFile = new FS.File();

      var attachData = Meteor.wrapAsync(imageFile.attachData, imageFile);
      attachData(imageBuffer, {type: updateInfo.image.mime});

      imageFile.name(updateInfo.code +'.'+ updateInfo.image.extension);
      var fileObj = BeverageItemImages.insert(imageFile);
      updateInfo.image = fileObj;
      // check if beverage item image of the same code already exist
      var beverageItem = BeverageItems.findOne({code: updateInfo.code});
      if(typeof beverageItem === 'undefined' ||  beverageItem == null){
        // is new beverage item, insert!
        BeverageItems.insert(updateInfo);
      } else {
        // remove existing image file and update food item data
        if(beverageItem.image !== null) beverageItem.image.remove();
        BeverageItems.update({_id: beverageItem._id},{ $set:updateInfo });
      }
      updatedBeverageItems.push(updateInfo.title);
    }
  }
  return updatedBeverageItems;
};
