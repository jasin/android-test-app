(function() {
var app = angular.module('androidapp', ['ngRoute']); 

    app.config(function($routeProvider){
        $routeProvider
        
            .when('/', {
                templateUrl: 'home.html',
                controller: 'mainCtrl'
            })
            
            .when('/depth', {
                templateUrl: 'angulardepth.html',
                controller: 'mathCtrl'
            })
    });
    
    app.controller('mainCtrl', function($scope){
        
    });
    
    app.controller('mathCtrl', function($scope){
        
        $scope.compoundAngle = 5.75;
        $scope.dialAdjustment = 0.001;
        
        $scope.calculate = function() {
           $scope.result =  math.round(math.sin(math.unit($scope.compoundAngle, 'deg')) * $scope.dialAdjustment, 4);
        };
        // remember ng-model is putting things on $scope so in the controller you have to put things
        // on the $scope as well. Everything is linked by the $scope
    });
}) ();