angular.module('ECSApp').controller('SidebarController', function ($scope, $localStorage, $state) {

    $scope.menuItems = $localStorage.menuItems;
});