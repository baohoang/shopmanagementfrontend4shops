myApp.factory('Login', function ($resource, CONFIG) {
    return $resource(CONFIG.API_URL + "forshops/login/:params", {params: "@params"}, {
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
}).service('LoginService', function (Login) {
    var self = {
        'login': function (data, success, error) {
            var params = {
                email: data.email,
                password: data.password
            };
            Login.post(params).$promise.then(success, error);
        }
    };
    return self;
});