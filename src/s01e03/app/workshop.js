(function (angular) {
'use strict';

angular.module('workshop', [])

.run(function ($rootScope) {
  window.$rootScope = $rootScope;

  $rootScope.someText = 'Hello World';

  $rootScope.alertSomething = function (message) {
    alert(message);
  };

})

.controller('TestCtrl', function ($scope) {
  window.$scope = $scope;

  $scope.someText = 'yo soy otro someText';

  $scope.obj = { someText: 'soy del pueblo' };
})

.controller('ChildCtrl', function ($scope) {

});

})(angular);
