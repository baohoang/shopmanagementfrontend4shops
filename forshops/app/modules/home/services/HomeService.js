myApp.factory('Home', function ($resource, CONFIG) {
    return $resource(CONFIG.API_URL + "forshops/test/:params", {params: "@params"}, {
        update: {
            method: 'PUT'
        },
        get: {
            method: 'GET'
        },
        post: {
            method: 'POST'
        }
    });
}).service('HomeService', function (Home) {
    var self = {
        'getData': function (success, error) {
            var params = {};
            Home.get(params).$promise.then(success, error);
        }
    };
    return self;
});