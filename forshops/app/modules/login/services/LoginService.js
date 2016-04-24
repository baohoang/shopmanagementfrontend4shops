myApp.service('LoginService', function ($http, CONFIG) {
    var self = {
        'login': function (data, success, error) {
            var params = {
                email: data.email,
                password: data.password
            };
            $http.post(CONFIG.API_URL + 'forshops/login', params).then(success, error);
        }
    };
    return self;
});