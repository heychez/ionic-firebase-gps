angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $firebaseObject, $cordovaGeolocation) {
  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $scope.coords = [{lat: 0.000, lng: 0.000}];
  $scope.msg = 'no error';

  //$ionicPlatform.ready(function() {
    //setInterval(function () {
      /*$cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          var lat  = position.coords.latitude;
          var lng = position.coords.longitude;

          //alert(lat + ", " + lng);
		  $scope.coords.push({'lat': lat, 'lng': lng});
        }, function(err) {
          alert(err);
        });*/
    //}, 5000);
  //});
  
  document.addEventListener('deviceready', function () {
	alert('deviceready');
	// Android customization
    cordova.plugins.backgroundMode.setDefaults({ text:'Doing heavy tasks.'});
    // Enable background mode
    cordova.plugins.backgroundMode.enable();
	// Failure
	cordova.plugins.backgroundMode.onfailure = function(errorCode) {
		$scope.msg = errorCode;
	};

    // Called when background mode has been activated
    cordova.plugins.backgroundMode.onactivate = function () {
		$scope.coords.push({lat: 0.001, lng: 0.002});
		var n = 1000;
        setTimeout(function () {
			$scope.coords.push({lat: n, lng: n++});
            // Modify the currently displayed notification
            cordova.plugins.backgroundMode.configure({
                text:'Running in background for more than 5s now.'
            });
        }, 5000);
    }
  });
  
  /*setInterval(function () {
    firebase.database().ref('coordenadas').push({
        lat: 20,
        lng : 30
      });
  }, 5000);*/
    
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
