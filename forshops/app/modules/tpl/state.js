/**
 * Created by Hoàng on 4/14/2016.
 */
myApp.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('login', {
        url: "/login",
        templateUrl: "app/sys/user/views/login.html",
        data: {
            pageTitle: 'Login',
            requireLogin: false
        },
        controller: "LoginCtrl",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'ECSApp',
                    files: [
                        'app/sys/user/controllers/LoginController.js',
                        'app/sys/user/services/AuthServices.js',
                        'app/sys/user/services/RoleServices.js',
                        'app/sys/user/services/UserServices.js',
                    ]
                });
            }]
        }
    });
}]);
