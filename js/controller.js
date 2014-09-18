(function() {
var app = angular.module('androidapp', ['ngRoute']); 

    app.config(function($routeProvider){
        $routeProvider
        
            .when('/', {
                templateUrl: 'home.html',
                controller: 'mainCtrl'
            })
            
            .when('/depth', {
                templateUrl: 'formulas/comp_depth.html',
                controller: 'compoundDepthCtrl'
            })
            
            .when('/bolt_circle', {
                templateUrl: 'formulas/bolt_circle.html',
                controller: 'boltCircle'
            })
    });
    
    app.controller('mainCtrl', function($scope, $location){
        
        $scope.change = function(){
            console.log($scope.menu_select);
            $location.path($scope.menu_select);
        };
        
    });
    
    app.controller('boltCircle', function($scope){
        
        // initialize some variables
        $scope.angleOffset = 0;
        $scope.boltHoles = 3;
        $scope.diameter = 1;
        
        // Do the math for the X/Y values of a bolt circle
        $scope.calculate = function(){
            $scope.angle = 360/$scope.boltHoles;
            $scope.bolts = [];
            for(i=0; i<$scope.boltHoles; i++) {
                $scope.bolts.push({bolt: {angle: null, x: null, y: null} });
                if (i === 0){
                    $scope.bolts[i].bolt.angle = $scope.angleOffset + 0;
                } else {
                    $scope.bolts[i].bolt.angle = $scope.bolts[i-1].bolt.angle + $scope.angle;
                }
                
                $scope.bolts[i].bolt.x = math.format(math.round(($scope.diameter/2) * math.cos(math.unit($scope.bolts[i].bolt.angle, 'deg')), 4), {notation: 'fixed', precision: 4});
                $scope.bolts[i].bolt.y = math.format(math.round(($scope.diameter/2) * math.sin(math.unit($scope.bolts[i].bolt.angle, 'deg')), 4), {notation: 'fixed', precision: 4});
            }
            
            console.log($scope.bolts);
        };
        
    });
    
    app.controller('compoundDepthCtrl', function($scope){
        
        $scope.compoundAngle = 5.75;
        $scope.dialAdjustment = 0.001;
        
        $scope.calculate = function() {
           $scope.result =  math.round(math.sin(math.unit($scope.compoundAngle, 'deg')) * $scope.dialAdjustment, 4);
        };
        // remember ng-model is putting things on $scope so in the controller you have to put things
        // on the $scope as well. Everything is linked by the $scope
    });
}) ();