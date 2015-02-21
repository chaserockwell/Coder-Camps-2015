var app = angular.module("blogger", ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'app/Views/home.html',
        controller: 'HomeController'
    })
    .when('/details', {
        templateUrl: 'app/Views/details.html',
        controller: 'DetailsController'
    })
    .when('/edit', {
        templateUrl: 'app/Views/edit.html',
        controller: 'EditController'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);