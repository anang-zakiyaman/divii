Meteor.startup(function(){
  if(Config.find().count() === 0){

    var contentServer = {
      configId: 'contentServer',
      baseUrl: '',
      clip:{ streamUrl: '', removeUrl: '' },
      movie:{ streamUrl: '', removeUrl: '' },
      partnerSpa:{ loadUrl: '' }
    };
    Config.insert(contentServer);

    var trainInfo = {
      configId: 'trainInfo',
      train: { name: '', code: '', description: '' },
      route: { name: '', code: '', description: '' }
    }
    Config.insert(trainInfo);
  }

});
