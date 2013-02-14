window.fbAsyncInit = function() {
  FB.init({
    appId      : '416208195132491', // App ID
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });
  status();
};

// Load the SDK Asynchronously
(function(d){
  var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement('script'); js.id = id; js.async = true;
  js.src = "//connect.facebook.net/en_US/all.js";
  ref.parentNode.insertBefore(js, ref);
}(document));

function status() {
  FB.getLoginStatus(function(response) {
    /*
    if (response.status === 'connected') {
    // connected
    } else if (response.status === 'not_authorized') {
    // not_authorized
    } else {
    // not_logged_in
    }
    */
    document.getElementById('fb-status').innerHTML = response.status;
  });
}

function login() {
  FB.login(function(response) {
    /*
    if (response.authResponse) {
    // connected
    } else {
    // cancelled
    }
    */
    status();
  });
}

function logout() {
  FB.logout(function(response) {
    //logged out
    status();
  });
}
