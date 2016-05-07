angular.module('ECSApp').controller('CustomerController', function ($scope, CustomerService, $uibModal, toaster, CONFIG) {

    $scope.service = CustomerService;
    $scope.searching = false;
    $scope.headerTable = ['#', 'Tên', 'Mô tả', 'Nhóm', 'Thao tác'];
    CustomerService.loadCustomers();

    $scope.enableSearch = function () {
        $scope.searching = !$scope.searching;
    };

    $scope.$watch('service.searchName', function (newValue, oldValue) {
        if (angular.isDefined(newValue) && newValue != oldValue) {
            CustomerService.loadCustomers();
        }
    });

    $scope.openModal = function (templateUrl, controllerName, resolve, close, dismiss) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: templateUrl,
            controller: controllerName,
            size: 'lg',
            backdrop: 'static',
            keyboard: false,
            resolve: resolve
        });
        modalInstance.result.then(close, dismiss);
    };

    $scope.showCreateCustomer = function () {
        var templateUrl = '/modules/customer/views/customer-create.html';
        var controllerName = 'CreateCustomerModalController';
        $scope.openModal(templateUrl, controllerName, {}, function () {
            CustomerService.loadCustomers();
        }, function (error) {
            //console.log('Modal dismissed at: ' + new Date());
        });
    };

    $scope.showViewCustomer = function (customer, $index) {
        var templateUrl = '/modules/customer/views/customer-view.html';
        var controllerName = 'EditCustomerModalController';
        $scope.openModal(templateUrl, controllerName, {
            customer: function () {
                return customer;
            }
        }, function (newCustomer) {
            $scope.service.listCustomers.splice($index, 1, newCustomer);
        }, function (error) {
            //console.log('Modal dismissed at: ' + new Date());
        });
    };

    $scope.deleteCustomer = function (customer) {
        CustomerService.deleteCustomer(customer, function (response) {
            CustomerService.loadCustomers();
            toaster.pop('success', 'Xóa khách hàng', 'Thành công!');
        }, function (error) {
            toaster.pop('error', 'Xóa khách hàng', 'Xảy ra lỗi khi thêm!');
        });
    };

    $scope.pageChanged = function () {
        CustomerService.loadCustomers();
    };

}).controller('CreateCustomerModalController', function ($scope, CustomerService, $uibModalInstance, toaster) {
    $scope.customer = new Object();

    $scope.createPhone = function () {
        if ($scope.customer.phones == undefined) {
            $scope.customer.phones = [];
        }
        $scope.customer.phones.push({name: ""});
    };

    $scope.createAddress = function () {
        if ($scope.customer.addresses == undefined) {
            $scope.customer.addresses = [];
        }
        $scope.customer.addresses.push({name: ""});
    };

    $scope.deletePhone = function (index) {
        $scope.customer.phones.splice(index, 1);
    };

    $scope.deleteAddress = function (index) {
        $scope.customer.addresses.splice(index, 1);
    };

    $scope.create = function () {
        CustomerService.createCustomer($scope.customer, function (respone) {
            toaster.pop('success', 'Thêm khách hàng', 'Thành công!');
            $uibModalInstance.close();
        }, function (error) {
            toaster.pop('error', 'Thêm khách hàng', 'Xảy ra lỗi khi thêm!');
        });
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}).controller('EditCustomerModalController', function ($scope, CustomerService, customer, $uibModalInstance, toaster) {
    $scope.customer = customer;

    $scope.createPhone = function () {
        if ($scope.customer.phones == undefined) {
            $scope.customer.phones = [];
        }
        $scope.customer.phones.push({name: ""});
    };

    $scope.createAddress = function () {
        if ($scope.customer.addresses == undefined) {
            $scope.customer.addresses = [];
        }
        $scope.customer.addresses.push({name: ""});
    };

    $scope.deletePhone = function (index) {
        $scope.customer.phones.splice(index, 1);
    };

    $scope.deleteAddress = function (index) {
        $scope.customer.addresses.splice(index, 1);
    };

    $scope.save = function () {
        CustomerService.saveCustomer($scope.customer, function (respone) {
            toaster.pop('success', 'Sửa khách hàng', 'Thành công!');
            $uibModalInstance.close(respone.data.customer);
        }, function (error) {
            toaster.pop('error', 'Sửa khách hàng', 'Xảy ra lỗi khi thêm!');
        });
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});