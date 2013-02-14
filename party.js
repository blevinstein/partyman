angular.module('party', ['mongolab']).
  config(function($route) {
    $route.
      when('/', {controller:SelectCtrl, templateUrl:'select.html'}).
      when('/party/:access_key', {controller:PartyCtrl, templateUrl:'party.html'}).
      otherwise({redirectTo:'/'});
    });


function SelectCtrl($scope, Party) {
}
