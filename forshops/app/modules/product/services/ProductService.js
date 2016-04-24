myApp.service('ProductService', function ($http, CONFIG, toaster) {
    var self = {
        'limit': 9,
        'listCategories': [],
        'listProducts': [],
        'currentPage': 1,
        'totalItems': 0,
        'limit': 9,
        'previousCateID': 0,
        'searchName': '',
        'loadCategories': function () {
            $http.get(CONFIG.API_URL + 'forshops/categories').then(function (response) {
                self.listCategories = [];
                for (var i in response.data) {
                    var cate = response.data[i];
                    cate.checked = false;
                    self.listCategories.push(cate);
                }
            }, function (error) {
                self.listCategories = [];
            });
        },
        'loadAllProduct': function () {
            var params = {
                'functionName': 'listAll',
                'page': self.currentPage,
                'limit': self.limit,
                'searchName': self.searchName
            };
            $http.get(CONFIG.API_URL + 'forshops/products', {params: params}).then(function (response) {
                var result = response.data;
                self.listProducts = result.data;
                self.totalItems = result.total;
            }, function (error) {
                console.log(error);
                self.listProducts = [];
                self.totalItems = 0;
            });
        },
        'loadProductByCategory': function (cate) {
            var params = {
                'functionName': 'listByCategory',
                'page': self.currentPage,
                'limit': self.limit,
                'searchName': self.searchName,
                'category_id': cate.id
            };
            $http.get(CONFIG.API_URL + 'forshops/products', {params: params}).then(function (response) {
                var result = response.data;
                self.listProducts = result.data;
                self.totalItems = result.total;
            }, function (error) {
                console.log(error);
                self.listProducts = [];
                self.totalItems = 0;
            });
        },
        'deleteImage': function (image, success, error) {
            var params = {
                'image': image.id
            };
            $http.delete(CONFIG.API_URL + 'forshops/products/image/delete', {params: params}).then(success, error);
        },
        'saveProduct': function (product, success, error) {
            var params = {
                'product': product
            };
            $http.put(CONFIG.API_URL + 'forshops/products', params).then(success, error);
        },
        'deleteProduct': function (product, success, error) {
            var params = {
                'product': product.id
            };
            $http.delete(CONFIG.API_URL + 'forshops/products', {params: params}).then(success, error);
        },
        'createProduct': function (product, success, error) {
            $http.post(CONFIG.API_URL + 'forshops/products', product).then(success, error);
        },
        'saveCategory': function (category, success, error) {
            $http.put(CONFIG.API_URL + 'forshops/categories', category).then(success, error);
        },
        'createCategory': function (category, success, error) {
            $http.post(CONFIG.API_URL + 'forshops/categories', category).then(success, error);
        },
        'deleteCategory': function (category, success, error) {
            var params = {category: category.id};
            $http.delete(CONFIG.API_URL + 'forshops/categories', {params: params}).then(success, error);
        }
    };
    return self;
});