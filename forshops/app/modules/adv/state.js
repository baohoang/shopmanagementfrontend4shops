/**
 * Created by Ho�ng on 4/14/2016.
 */
myApp.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('home.adv', {
        url: "/advertisement",
        controller: 'AdvController',
        templateUrl: '/modules/adv/views/adv.html',
        data: {
            pageTitle: 'Advertisement',
            requireLogin: true
        },
        resolve: {
            loadMyFiles: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'ECSApp',
                    files: [
                        '/modules/adv/controllers/AdvController.js',
                        '/modules/adv/services/AdvService.js'
                    ]
                });
            }
        },

    });
}]);
