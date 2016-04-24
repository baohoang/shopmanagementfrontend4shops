angular.module('ECSApp').controller('DashboardController', function ($scope, $localStorage, $state) {

    $scope.email = 'bao@gmail.com';
    $scope.password = '123456';

    $scope.login = function () {
        var data = {
            email: $scope.email,
            password: $scope.password
        };
        LoginService.login(data, function (response) {
            $localStorage.token = response.token;
            $localStorage.menuItems = response.menuItems;
            $localStorage.username = response.username;
            $localStorage.shop = response.shop;
            $state.go('home');
        }, function (error) {
            console.log(error);
        });
    };
});