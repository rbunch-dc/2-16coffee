var coffeeApp = angular.module('coffeeApp', ['ngRoute']);
var apiUrl = 'http://localhost:3020/';

coffeeApp.controller('MainController', function($scope, $http) {
    $http({
        method: 'GET',
        url: apiUrl
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response.data.user);
        $scope.activeuser = response.data.user;


    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        $scope.result = "ERROR!!!"
    });
});


coffeeApp.config(function($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: "views/main.html",
        controller: 'MainController'
    })
    .when('/register', {
        templateUrl: "views/register.html",
        controller: 'MainController'        
    })
});





