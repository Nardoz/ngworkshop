(function (angular) {
'use strict';

angular.module('workshop', [])
.run(function ($rootScope, $interval) {
  window.$rootScope = $rootScope;

  $rootScope.someText = 'nardoz from scope';

    $interval(function () {
      $rootScope.someDate = new Date();
    }, 1);
});

})(angular);
