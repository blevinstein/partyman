var FacebookCtrl = function($scope) {
  $scope.pic = 'img/fb_default.jpg';
  $scope.events = [];
  // get status and name
  $scope.get_status = function() {
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        $scope.status = 'Connected';
        FB.api('/me', function(response) {
          $scope.name = response.name;
          $scope.pic = 'https://graph.facebook.com/' + response.id + '/picture';
          $scope.$apply();
        });
      } else {
        if (response.status === 'not_authorized') {
          $scope.status = 'Not Authorized';
        } else {
          $scope.status = 'Not Logged In';
        }
        $scope.name = '';
        $scope.pic = 'img/fb_default.jpg';
        $scope.$apply();
      }
    });
  };

  $scope.login = function() {
    FB.login(function(response) {
      if(response.authResponse) {
        $scope.get_status();
      }
    }, {scope: 'user_events,friends_events'});
  };

  $scope.logout = function() {
    FB.logout(function(response) {
      $scope.get_status();
    });
  };

  $scope.get_events = function(dir) {
    var url = '/me/events';
    if(dir == 'next')
      url = $scope.next_events_link;
    else if(dir == 'prev')
      url = $scope.prev_events_link;
    FB.api(url, function(response) {
      $scope.events = response.data;
      $scope.prev_events_link = response.paging.previous;
      $scope.next_events_link = response.paging.next;
      $scope.$apply();
    });
  };

  $scope.select_event = function(id) {
    FB.api('/'+id, function(response) {
      $scope.event = response;
      $scope.$apply();
    });
    types = ['attending','maybe','declined','noreply'];
    for(i=0; i<types.length; i++) {
      (function(type) {
        FB.api('/'+id+'/'+type+'?limit=100000', function(response) {
          $scope.event[type] = response.data.length;
          $scope.$apply();
        });
      })(types[i]);
    }
  };

  $scope.get_status();
}
