/**
 * Created by Ho�ng on 4/14/2016.
 */
myApp.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('home.customer', {
        url: "/customer",
        controller: 'CustomerController',
        templateUrl: '/modules/customer/views/customer.html',
        data: {
            pageTitle: 'Customer',
            requireLogin: true
        },
        resolve: {
            loadMyFiles: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'ECSApp',
                    files: [
                        '/modules/customer/controllers/CustomerController.js',
                        '/modules/customer/services/CustomerService.js'
                    ]
                });
            }
        },

    });
}]);
