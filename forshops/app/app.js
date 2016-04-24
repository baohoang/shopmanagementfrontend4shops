// Declare app level module which depends on views, and components
var myApp = angular.module('ECSApp', [
    'ngAnimate',
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize",
    'satellizer',
    'ngResource',
    'angular-ladda',
    'toaster',
    'LocalStorageModule',
    'angularFileUpload',
    'angularUtils.directives.uiBreadcrumbs',
    'checklist-model',
    'ui.select2',
    'mwl.confirm',
    'angular-input-stars',
    'ngRoute',
    'ngStorage',
    'angular-jwt',
    'ngImgCrop',
    'ngFileUpload'
]);
myApp.run(function ($rootScope, $location, $state, $localStorage, jwtHelper) {
    $rootScope.$on('$stateChangeStart', function (evt, to, params) {
        var token = $localStorage.token;
        if (to.data.requireLogin && (!token || (token && jwtHelper.isTokenExpired(token)))) {
            $state.go('login');
            evt.preventDefault();
        }
    });
});
myApp.run(function ($rootScope, $location, $state) {
    $rootScope.$on('$stateChangeStart', function (evt, to, params) {
        if (to.redirectTo) {
            evt.preventDefault();
            $state.go(to.redirectTo, params);
        }
    });
});

myApp.run(function ($rootScope, $location, $state) {
    $state.go('home');
});