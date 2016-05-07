/**
 * Created by Ho�ng on 4/14/2016.
 */
myApp.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('home', {
        url: "/home",
        views: {
            '': {
                templateUrl: "/modules/home/views/home.html",
                controller: "HomeController",
            },
            'header@home': {
                templateUrl: '/modules/home/views/header.html',
                controller: 'HeaderController'
            },
            'sidebar@home': {
                templateUrl: '/modules/home/views/sidebar.html',
                controller: 'SidebarController'
            }
        },
        redirectTo: 'home.dashboard',
        data: {
            pageTitle: 'Home',
            requireLogin: true
        },
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'ECSApp',
                    files: [
                        '/modules/home/controllers/HomeController.js',
                        '/modules/home/controllers/HeaderController.js',
                        '/modules/home/controllers/LeftMenuController.js',
                        '/modules/home/services/HomeService.js'
                    ]
                });
            }]
        }
    });
}]);
