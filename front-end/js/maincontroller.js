var coffeeApp = angular.module('coffeeApp', ['ngRoute', 'ngCookies']);
coffeeApp.controller('MainController', function($scope, $http, $location, $cookies) {

    var apiPath = 'http://localhost:3000/';

    $scope.loginForm = function(){
        $http.post(apiPath + 'login', {
            username: $scope.username,
            password: $scope.password
        }).then(function successCallback(response){
            console.log(response.data);
            if(response.data.success == 'found'){
                $cookies.put('token', response.data.token);
                $cookies.put('username', $scope.username);
                $location.path('/options');
            }else if(response.data.failure == 'noUser'){
                $scope.errorMessage = 'No such user in th db';
            }else if(response.data.failure == 'badPassword'){
                $scope.errorMessage = 'Bad password for this user.'

            }
        }, function errorCallback(response){

        });
    }

    $scope.registerForm = function(){
        console.log($scope.username);
        $http.post(apiPath + 'register', {
            username: $scope.username,
            password: $scope.password,
            password2: $scope.password2,
            email: $scope.email
        }).then(function successCallback(response){
            console.log(response.data.failure);
            if(response.data.failure == 'passwordMatch'){
                $scope.errorMessage = 'Your passwords must match.';
            }else if(response.data.success == 'added'){
                $cookies.put('token', response.data.token);
                $cookies.put('username', $scope.username);
                $location.path('/options');
            }
        }, function errorCallback(response){
            console.log(response.status);
        });
    }
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
    }).when('/login', {
        templateUrl: "views/login.html",
        controller: 'MainController'        
    }).when('/options', {
        templateUrl: "views/options.html",
        controller: 'MainController'        
    })
});





