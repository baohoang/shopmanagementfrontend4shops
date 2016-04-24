myApp.factory('ABC', function ($resource, CONFIG) {
    return $resource(CONFIG.API_URL + "login/:params", {params: "@params"}, {
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
}).service('', function (ABC) {
    var self = {};
    return self;
});