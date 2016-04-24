angular.module('ECSApp').controller('HeaderController', function ($scope, $localStorage, $state) {

    $scope.shopname = $localStorage.shop;
    $scope.username = $localStorage.username;

});