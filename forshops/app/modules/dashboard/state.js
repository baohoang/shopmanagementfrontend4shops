/**
 * Created by Hoàng on 4/14/2016.
 */
myApp.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('home.dashboard', {
        url: "/dashboard",
        controller: 'DashboardController',
        templateUrl: '/modules/dashboard/views/dashboard.html',
        data: {
            pageTitle: 'DashBoard',
            requireLogin: true
        },
        resolve: {
            loadMyFiles: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'ECSApp',
                    files: [
                        '/modules/dashboard/controllers/DashboardController.js',
                    ]
                });
            }
        },

    });
}]);
