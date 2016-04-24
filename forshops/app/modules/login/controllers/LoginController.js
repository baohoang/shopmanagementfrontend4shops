angular.module('ECSApp').controller('LoginController', function ($scope, LoginService, $localStorage, $state, toaster) {

    $scope.email = 'bao@gmail.com';
    $scope.password = '123456';

    $scope.login = function () {
        var data = {
            email: $scope.email,
            password: $scope.password
        };
        LoginService.login(data, function (response) {
            $localStorage.token = response.data.token;
            $localStorage.menuItems = response.data.menuItems;
            $localStorage.username = response.data.username;
            $localStorage.shop = response.data.shop;
            toaster.pop('success', '??ng nh?p', '??ng nh?p th�nh c�ng.');
            $state.go('home');
        }, function (error) {
            toaster.pop('error', '??ng nh?p', '??ng nh?p kh�ng th�nh c�ng.');
        });
    };
});