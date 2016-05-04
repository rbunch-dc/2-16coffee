var coffeeApp = angular.module('coffeeApp', ['ngRoute']);
var apiUrl = 'http://localhost:3020/';

coffeeApp.controller('MainController', function($scope, $http, $location) {

    $scope.loginForm = function(){
        $http.post('http://localhost:3000/login', {
            username: $scope.username,
            password: $scope.password
        }).then(function successCallback(response){
            console.log(response.data);
            if(response.data.success == 'found'){
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
        $http.post('http://localhost:3000/register', {
            username: $scope.username,
            password: $scope.password,
            password2: $scope.password2,
            email: $scope.email
        }).then(function successCallback(response){
            console.log(response.data.failure);
            if(response.data.failure == 'passwordMatch'){
                $scope.errorMessage = 'Your passwords must match.';
            }else if(response.data.success == 'added'){
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





