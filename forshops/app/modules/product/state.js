/**
 * Created by Ho�ng on 4/14/2016.
 */
myApp.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('home.product', {
        url: "/product",
        controller: 'ProductController',
        templateUrl: '/modules/product/views/product.html',
        data: {
            pageTitle: 'Product',
            requireLogin: true
        },
        resolve: {
            loadMyFiles: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'ECSApp',
                    files: [
                        '/modules/product/controllers/ProductController.js',
                        '/modules/product/services/ProductService.js'
                    ]
                });
            }
        },

    });
}]);
