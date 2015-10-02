var app = angular.module('myApp', ['ui.router'])

.controller('listCtrl', ['$scope', function($scope){
  $scope.items=[];
  $scope.addItem=function(item){
    $scope.items.push(item);
  }
  $scope.removeItem=function(index){
    $scope.items.splice(index,1);
  }
}])
.config(config)
.directive('ngConfirm', function () {
  return {
    priority: -1,
    terminal: true,
    link: {
      pre:function (scope, element, attr) {
        var msg = attr.ngConfirm || "Are you sure?";
        element.bind('click',function () {
          if ( window.confirm(msg) ) {
            scope.$eval(attr.ngClick);
          }
        });
      }
  }
  };
});
.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) { //the user pressed enter
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });

                event.preventDefault();
            }
        });
    };
});

function config($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/');

  $stateProvider

      // HOME STATES AND NESTED VIEWS ========================================
      .state('login', {
          url: '/login',
          templateUrl: 'templates/login.html'
      })
      .state('todo', {
          url: '/todo',
          templateUrl: 'templates/todo.html'
      })
      .state('home', {
          url: '/',
          templateUrl: 'templates/home.html'
      })

}
