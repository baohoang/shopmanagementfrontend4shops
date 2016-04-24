myApp.config(function ($provide, $httpProvider) {
    $provide.factory('MyHttpInterceptor', function ($q, $location, $localStorage, localStorageService) {

        var interceptor = {
            request: function (config) {
                config.headers = config.headers || {};
                if ($localStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $localStorage.token;
                }
                return config;
            },
            requestError: function (rejection) {
                return $q.reject(rejection);
            },
            response: function (response) {
                return response || $q.when(response);
            },
            responseError: function (rejection) {
                if (rejection.status === 400 || rejection.status === 401 || rejection.status === 403) {
                    localStorageService.clearAll();
                    $location.path('/login');
                }
                return $q.reject(rejection);
            },
        };
        return interceptor;
    });
    $httpProvider.interceptors.push('MyHttpInterceptor');
});