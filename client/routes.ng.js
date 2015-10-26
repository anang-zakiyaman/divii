angular.module('divii').run(['$rootScope', '$state',
  function($rootScope, $state){
    $rootScope.$on('$stateChangeError',
      function(event, toState, toParams, fromState, fromParams, error){
        // We can catch the error thrown when the $requireUser promise is rejected
        // and redirect the user back to the main page
        if(error === "AUTH_REQUIRED")$state.go('auth.passengerLogin');
      }
    );
  }
]);

angular.module('divii').config(['$urlRouterProvider','$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    // Authentications ========================================================
    .state('auth', {
      url: '/auth',
      templateUrl: 'client/auth/views/base.ng.html'
    })
    .state('auth.passengerLogin',{
      url: '/divii',
      templateUrl: 'client/auth/views/passenger-login.ng.html',
      controller: 'PassengerLoginCtrl',
    })
    .state('auth.appManagerLogin',{
      url: '/app',
      templateUrl: 'client/auth/views/app-manager-login.ng.html',
      controller: 'AppManagerLoginCtrl'
    })
    .state('auth.fnbManagerLogin',{
      url: '/fnb',
      templateUrl: 'client/auth/views/fnb-manager-login.ng.html',
      controller: 'FnbManagerLoginCtrl'
    })
    .state('auth.tripManagerLogin',{
      url: '/trip',
      templateUrl: 'client/auth/views/trip-manager-login.ng.html',
      controller: 'TripManagerLoginCtrl'
    })
    .state('auth.logout', {
        url: '/logout',
        resolve: {
          "logout": ['$meteor', '$state',
            function($meteor, $state) {
              return $meteor.logout()
              .then(function(){
                $state.go('account');
              }, function(err){
                  console.log('logout error - ', err);
              });
            }
          ]
       }
    })

    // Ads ===================================================================
    .state('fullScreenImageAd', {
      url: '/fullscreen-image-ad/:targetSpace/:nextState/:waitMessage',
      templateUrl: 'client/ads/views/fullscreen-image-ad.ng.html',
      controller: 'FullScreenImageAdCtrl',
      resolve: {
        'currentUser': ['$meteor', function($meteor){
            return $meteor.requireUser();
        }]
      }
    })

    // Divii module ===========================================================
    .state('divii', {
      url: '/divii',
      controller: 'DiviiBaseCtrl',
      templateUrl: 'client/divii/base/views/base.ng.html'
    })
    .state('divii.home', {
      url: '/home',
      templateUrl: 'client/divii/home/views/home.ng.html',
      controller: 'DiviiHomeCtrl',
      resolve: {
        'currentUser': ['$meteor', function($meteor){
            return $meteor.requireUser();
        }],
      }
    })
    .state('divii.movies', {
      url: '/movies',
      templateUrl: 'client/divii/entertainment/movies/views/movies.ng.html',
      controller: 'MoviesCtrl',
      resolve: {
        'currentUser': ['$meteor', function($meteor){
            return $meteor.requireUser();
        }],
        'subscribe': ['$meteor', function($meteor){
            return $meteor.subscribe('movies');
        }]
      }
      // ,
      // onEnter: function($state, firstTimeOnPage){
      //   // display fullscreen image ad if its user's first time going to this state
      //   if(firstTimeOnPage.onMoviesPage){
      //     firstTimeOnPage.isFirstTimeMoviesPage(false);
      //     $state.go('divii.fullScreenImageAd',{
      //       targetSpace:'ATO002',
      //       nextState:'divii.movies',
      //       waitMessage: 'load movies'
      //     });
      //   }
      // }
    })
    .state('divii.movieDetails', {
      url: '/movies/:movieId',
      templateUrl: 'client/divii/entertainment/movies/views/movie-details.ng.html',
      controller: 'MovieDetailsCtrl',
      resolve: {
        'currentUser': ['$meteor', function($meteor){
            return $meteor.requireUser();
        }],
        'subscribe': ['$meteor',
          function($meteor){
            return $meteor.subscribe('movies');
          }
        ]
      }
    })
    .state('divii.clips', {
      url: '/clips',
      templateUrl: 'client/divii/entertainment/clips/views/clips.ng.html',
      controller: 'ClipsCtrl',
      resolve: {
        'currentUser': ['$meteor', function($meteor){
            return $meteor.requireUser();
        }],
        'subscribe': ['$meteor', function($meteor){
            return $meteor.subscribe('clips');
        }]
      }
    })
    .state('divii.fnbMenu',{
      url: '/fnb-menu',
      templateUrl: 'client/divii/fnb/views/fnb-menu.ng.html',
      controller: 'FnbMenuCtrl',
      resolve: {
        'currentUser': ['$meteor', function($meteor){
            return $meteor.requireUser();
        }],
        'subscribe': ['$meteor', function($meteor){
            return $meteor.subscribe('foodMenu');
        }]
      }
    })
    .state('divii.fnbOrders', {
      url: '/fnb-orders',
      templateUrl: 'client/divii/fnb/views/fnb-orders.ng.html',
      controller: 'FnbOrdersCtrl',
      resolve: {
        'currentUser': ['$meteor', function($meteor){
            return $meteor.requireUser();
        }],
        'foodMenu': ['$meteor', function($meteor){
            return $meteor.subscribe('foodMenu');
        }]
      }
    })
    .state('divii.notifications', {
      url: '/notifications',
      templateUrl: 'client/divii/fnb/views/notifications.ng.html',
      controller: 'NotificationsCtrl',
      resolve: {
        'currentUser': ['$meteor', function($meteor){
            return $meteor.requireUser();
        }],
      }
    })

    // App Manager Module =====================================================
    .state('appManager', {
      url: '/app',
      controller: 'AppBaseCtrl',
      templateUrl: 'client/moduleAppManager/base/views/base.ng.html'
    })
    .state('appManager.home', {
      url: '/home',
      templateUrl: 'client/moduleAppManager/home/views/home.ng.html',
      controller: 'AppHomeCtrl',
      resolve: {
        "currentUser": ["$meteor", function($meteor){
            return $meteor.requireValidUser(function(user) {
                return user.profile.role === 'app-manager';
            });
        }],
      }
    })
    .state('appManager.contentServer', {
      url: '/config/content-server',
      templateUrl: 'client/moduleAppManager/network/views/content-server.ng.html',
      controller: 'AppContentServerManagerCtrl',
      resolve: {
        "currentUser": ["$meteor", function($meteor){
            return $meteor.requireValidUser(function(user) {
                return user.profile.role === 'app-manager';
            });
        }],
      }
    })
    .state('appManager.accounts', {
      url: '/accounts',
      templateUrl: 'client/moduleAppManager/accounts/views/accounts-manager.ng.html',
      controller: 'AppAccountsManagerCtrl',
      resolve: {
        "currentUser": ["$meteor", function($meteor){
            return $meteor.requireValidUser(function(user) {
                return user.profile.role === 'app-manager';
            });
        }],
      }
    })
    .state('appManager.imageAdsSpaces', {
      url: '/ads/image-ads/spaces',
      templateUrl: 'client/moduleAppManager/ads/imageAds/views/ads-spaces.ng.html',
      controller: 'AppImageAdsSpacesCtrl',
      resolve: {
        "currentUser": ["$meteor", function($meteor){
            return $meteor.requireValidUser(function(user) {
                return user.profile.role === 'app-manager';
            });
        }],
      }
    })
    .state('appManager.imageAds', {
      url: '/ads/image-ads/:spaceType/:spaceCode',
      templateUrl: 'client/moduleAppManager/ads/imageAds/views/image-ads.ng.html',
      controller: 'AppImageAdsCtrl',
      resolve: {
        "currentUser": ["$meteor", function($meteor){
            return $meteor.requireValidUser(function(user) {
                return user.profile.role === 'app-manager';
            });
        }],
      }
    })
    .state('appManager.imageAdsDetails', {
      url: '/ads/image-ads/details/:adsCode',
      templateUrl: 'client/moduleAppManager/ads/imageAds/views/ads-details.ng.html',
      controller: 'AppImageAdsDetailsCtrl',
      resolve: {
        "currentUser": ["$meteor", function($meteor){
            return $meteor.requireValidUser(function(user) {
                return user.profile.role === 'app-manager';
            });
        }],
      }
    })
    .state('appManager.videoAds', {
      url: '/video-ads',
      templateUrl: 'client/moduleAppManager/ads/videoAds/views/video-ads.ng.html',
      controller: 'AppVideoAdsManagerCtrl',
      resolve: {
        "currentUser": ["$meteor", function($meteor){
            return $meteor.requireValidUser(function(user) {
                return user.profile.role === 'app-manager';
            });
        }],
      }
    })
    .state('appManager.adsUpdatePackages', {
      url: '/ads/import/updatePackages',
      templateUrl: 'client/moduleAppManager/ads/adsImport/views/ads-update-packages.ng.html',
      controller: 'AppAdsUpdatePackagesCtrl',
      resolve: {
        "currentUser": ["$meteor", function($meteor){
            return $meteor.requireValidUser(function(user) {
                return user.profile.role === 'app-manager';
            });
        }],
      }
    })
    .state('appManager.clips', {
      url: '/entertainment/clips',
      templateUrl: 'client/moduleAppManager/entertainment/clips/views/clips.ng.html',
      controller: 'AppClipsManagerCtrl',
      resolve: {
        "currentUser": ["$meteor", function($meteor){
            return $meteor.requireValidUser(function(user) {
                return user.profile.role === 'app-manager';
            });
        }],
      }
    })
    .state('appManager.movies', {
      url: '/entertainment/movies',
      templateUrl: 'client/moduleAppManager/entertainment/movies/views/movies.ng.html',
      controller: 'AppMoviesManagerCtrl',
      resolve: {
        "currentUser": ["$meteor", function($meteor){
            return $meteor.requireValidUser(function(user) {
                return user.profile.role === 'app-manager';
            });
        }],
      }
    })
    .state('appManager.entertainmentUpdatePackages', {
      url: '/entertainment/updatePackages',
      templateUrl: 'client/moduleAppManager/entertainment/updatePackages/views/update-packages.ng.html',
      controller: 'AppEntertainmentUpdatePackagesCtrl',
      resolve: {
        "currentUser": ["$meteor", function($meteor){
            return $meteor.requireValidUser(function(user) {
                return user.profile.role === 'app-manager';
            });
        }],
      }
    })
    .state('appManager.foodItems', {
      url: '/fnb/food-items',
      templateUrl: 'client/moduleAppManager/fnb/views/food-items.ng.html',
      controller: 'AppFoodItemsManagerCtrl',
      resolve: {
        "currentUser": ["$meteor", function($meteor){
            return $meteor.requireValidUser(function(user) {
                return user.profile.role === 'app-manager';
            });
        }],
      }
    })
    .state('appManager.beverageItems', {
      url: '/fnb/beverage-items',
      templateUrl: 'client/moduleAppManager/fnb/views/beverage-items.ng.html',
      controller: 'AppBeverageItemsManagerCtrl',
      resolve: {
        "currentUser": ["$meteor", function($meteor){
            return $meteor.requireValidUser(function(user) {
                return user.profile.role === 'app-manager';
            });
        }],
      }
    })
    .state('appManager.orders', {
      url: '/fnb/orders',
      templateUrl: 'client/moduleAppManager/fnb/views/orders.ng.html',
      controller: 'AppOrdersManagerCtrl',
      resolve: {
        "currentUser": ["$meteor", function($meteor){
            return $meteor.requireValidUser(function(user) {
                return user.profile.role === 'app-manager';
            });
        }],
      }
    })
    .state('appManager.userOrders', {
      url: '/fnb/user-orders',
      templateUrl: 'client/moduleAppManager/fnb/views/user-orders.ng.html',
      controller: 'AppUserOrdersManagerCtrl',
      resolve: {
        "currentUser": ["$meteor", function($meteor){
            return $meteor.requireValidUser(function(user) {
                return user.profile.role === 'app-manager';
            });
        }],
      }
    })
    .state('appManager.fnbUpdatePackages', {
      url: '/fnb/updatePackages',
      templateUrl: 'client/moduleAppManager/fnb/views/update-packages.ng.html',
      controller: 'AppFnbUpdatePackagesCtrl',
      resolve: {
        "currentUser": ["$meteor", function($meteor){
            return $meteor.requireValidUser(function(user) {
                return user.profile.role === 'app-manager';
            });
        }],
      }
    })
    .state('appManager.trainInfo', {
      url: '/train/train-info',
      templateUrl: 'client/moduleAppManager/trips/views/train-info.ng.html',
      controller: 'AppTrainInfoManagerCtrl',
      resolve: {
        "currentUser": ["$meteor", function($meteor){
            return $meteor.requireValidUser(function(user) {
                return user.profile.role === 'app-manager';
            });
        }],
      }
    })
    .state('appManager.stations', {
      url: '/train/stations',
      templateUrl: 'client/moduleAppManager/trips/views/stations.ng.html',
      controller: 'AppStationsManagerCtrl',
      resolve: {
        "currentUser": ["$meteor", function($meteor){
            return $meteor.requireValidUser(function(user) {
                return user.profile.role === 'app-manager';
            });
        }],
      }
    })
    .state('appManager.tripAlerts', {
      url: '/train/trip-alerts',
      templateUrl: 'client/moduleAppManager/trips/views/trip-alerts.ng.html',
      controller: 'AppTripAlertsManagerCtrl',
      resolve: {
        "currentUser": ["$meteor", function($meteor){
            return $meteor.requireValidUser(function(user) {
                return user.profile.role === 'app-manager';
            });
        }],
      }
    })
    .state('appManager.generateTripAlert', {
      url: '/generate-trip-alerts',
      templateUrl: 'client/moduleAppManager/trips/views/generate-trip-alert.ng.html',
      controller: 'AppGenerateTripAlertManagerCtrl',
      resolve: {
        "currentUser": ["$meteor", function($meteor){
            return $meteor.requireValidUser(function(user) {
                return user.profile.role === 'app-manager';
            });
        }],
      }
    })

    // FnB Manager Module =====================================================
    .state('fnbManager', {
      url: '/fnb',
      templateUrl: 'client/moduleFnbManager/base/views/base.ng.html'
    })
    .state('fnbManager.home', {
      url: '/home',
      templateUrl: 'client/moduleFnbManager/home/views/home.ng.html',
      controller: 'FnbHomeCtrl',
      resolve: {
        "currentUser": ["$meteor", function($meteor){
            return $meteor.requireValidUser(function(user) {
                return user.profile.role === 'fnb-manager';
            });
        }],
      }
    })

    // Trip Manager Module =====================================================
    .state('tripManager', {
      url: '/fnb',
      templateUrl: 'client/moduleTripManager/base/views/base.ng.html'
    })
    .state('tripManager.home', {
      url: '/home',
      templateUrl: 'client/moduleTripManager/home/views/home.ng.html',
      controller: 'TripHomeCtrl',
      resolve: {
        "currentUser": ["$meteor", function($meteor){
            return $meteor.requireValidUser(function(user) {
                return user.profile.role === 'trip-manager';
            });
        }],
      }
    });

    // Default route ===========================================================
    $urlRouterProvider.otherwise("/auth/divii");
  }
]);
