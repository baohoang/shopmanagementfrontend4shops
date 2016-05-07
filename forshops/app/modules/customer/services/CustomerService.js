myApp.service('CustomerService', function ($http, CONFIG, toaster) {
    var self = {
        'limit': 10,
        'listCustomers': [],
        'currentPage': 1,
        'totalItems': 0,
        'searchName': '',
        'loadCustomers': function () {
            var params = {
                'page': self.currentPage,
                'limit': self.limit,
                'searchName': self.searchName
            };
            $http.get(CONFIG.API_URL + 'forshops/customers', {params: params}).then(function (response) {
                self.listCustomers = [];
                console.log(response.data);
                var result = response.data;
                self.listCustomers = result.data;
                self.totalItems = result.total;
            }, function (error) {
                self.listCustomers = [];
                self.totalItems = 0;
            });
        },
        'saveCustomer': function (customer, success, error) {
            $http.put(CONFIG.API_URL + 'forshops/customers', customer).then(success, error);
        },
        'deleteCustomer': function (customer, success, error) {
            var params = {
                'customer': customer.id
            };
            $http.delete(CONFIG.API_URL + 'forshops/customers', {params: params}).then(success, error);
        },
        'createCustomer': function (customer, success, error) {
            $http.post(CONFIG.API_URL + 'forshops/customers', customer).then(success, error);
        }
    };
    return self;
});