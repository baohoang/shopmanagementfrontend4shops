/**
 * Created by Hoàng on 4/14/2016.
 */
myApp.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('login', {
        url: "/login",
        controller: 'LoginController',
        templateUrl: '/modules/login/views/login.html',
        data: {
            pageTitle: 'Login',
            requireLogin: false
        },
        resolve: {
            loadMyFiles: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'ECSApp',
                    files: [
                        '/modules/login/controllers/LoginController.js',
                        '/modules/login/services/LoginService.js'
                    ]
                });
            }
        },

    });
    $stateProvider.state('logout', {
        url: '/logout',
        controller: function ($http, $state, toaster, localStorageService, CONFIG) {
            $http.post(CONFIG.API_URL + 'forshops/logout').then(function (data) {
                console.log(data);
                localStorageService.clearAll();
                $state.go("login");
            }, function (error) {
                console.log(error);
            });

        },
        data: {
            requireLogin: false,
        },
    });
}]);
