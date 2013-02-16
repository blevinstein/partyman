var SelectCtrl = function($scope) {
  $scope.fb_pic = 'img/fb_default.jpg';
  // get status and name
  $scope.status = function() {
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        $scope.fb_status = 'Connected';
        FB.api('/me', function(response) {
          $scope.fb_name = response.name;
          $scope.fb_pic = 'https://graph.facebook.com/' + response.id + '/picture';
          $scope.$apply(); // force update
        });
      } else if (response.status === 'not_authorized') {
        $scope.fb_status = 'Not Authorized';
        $scope.fb_name = '';
        $scope.fb_pic = 'img/fb_default.jpg';
      } else {
        $scope.fb_status = 'Not Logged In';
        $scope.fb_name = '';
        $scope.fb_pic = 'img/fb_default.jpg';
      }
      $scope.$apply(); // force update
    });
  };

  // login function
  $scope.login = function() {
    FB.login(function(response) {
      if(response.authResponse) {
        $scope.status();
      }
    });
  };

  // logout function
  $scope.logout = function() {
    FB.logout(function(response) {
      $scope.status();
    });
  };

  $scope.status();
}
