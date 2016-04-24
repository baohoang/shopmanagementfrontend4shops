myApp.config(['$localStorageProvider', function ($localStorageProvider) {
    $localStorageProvider.setKeyPrefix("ECSSystem-");
}])

myApp.config(['$controllerProvider', function ($controllerProvider) {
    $controllerProvider.allowGlobals();
}]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
myApp.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
    });
}]);

//myApp.config(['$locationProvider', function ($locationProvider) {
//    $locationProvider.html5Mode({
//        enabled: true,
//        requireBase: false
//    });
//    $locationProvider.hashPrefix('!');
//}]);