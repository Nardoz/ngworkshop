(function (angular) {
'use strict';

angular.module('workshop', [])

.controller('MembersListCtrl', function ($rootScope) {
    $rootScope.members = [
      { name: '@DiegoRam', desktop: 'OSX', mobile: 'Android' },
      { name: '@luisfarzati', desktop: 'Ubuntu', mobile: 'Android' }
    ];
})

.controller('MemberFormCtrl', function ($rootScope, $scope) {
    $scope.addMember = function () {
        $rootScope.members.push(angular.copy($scope.member));
        delete $scope.member;
    };
    $scope.member = {
      desktop: 'Ubuntu',
      mobile: 'Android'
    };
});

})(angular);
