angular.module('ECSApp').controller('ProductController', function ($scope, ProductService, $uibModal, toaster, CONFIG) {

    $scope.service = ProductService;
    $scope.searching = false;
    $scope.addingNewCategory = false;
    ProductService.loadCategories();
    ProductService.loadAllProduct();

    $scope.selectCategory = function (index) {
        var list = $scope.service.listCategories;
        if (list[index].checked) {
            ProductService.loadProductByCategory(list[index]);
        } else {
            ProductService.loadAllProduct();
        }
        for (var i in list) {
            if (i != index) {
                list[i].checked = false;
            }
        }
    };
    $scope.showCreateCategory = function () {
        $scope.addingNewCategory = true;
        $scope.addNewCategory.$show();
        $scope.newCategory = null;
        //var list = $scope.service.listCategories;
    };
    $scope.createCategory = function (newCategory) {
        ProductService.createCategory(newCategory, function (response) {
            var cate = response.data.category;
            cate.checked = false;
            $scope.service.listCategories.push(cate);
            $scope.addingNewCategory = false;
            toaster.pop('success', 'Thêm danh mục', 'Thành công!');
        }, function (error) {
            $scope.addingNewCategory = false;
            toaster.pop('error', 'Thêm danh mục', 'Có lỗi xảy ra khi thêm!');
        });
        return true;
    };
    $scope.cancelCreateCategory = function () {
        $scope.addingNewCategory = false;
    };

    $scope.editCategory = function (category) {
        ProductService.saveCategory(category, function (response) {
            return true;
        }, function (error) {
            return 'Xảy ra lỗi khi lưu';
        });
    };
    $scope.deleteCategory = function (category, index) {
        ProductService.deleteCategory(category, function (response) {
            $scope.service.listCategories.splice(index, 1);
            ProductService.loadAllProduct();
            toaster.pop('success', 'Xóa danh mục', 'Thành công!');
        }, function (error) {
            toaster.pop('error', 'Xóa danh mục', 'Có lỗi xảy ra khi xóa!');
        });
    };

    $scope.chooseImage = function (product) {
        var list = product.images;
        for (var i in list) {
            if (list[i].is_favicon == 1) {
                return list[i].src;
            }
        }
        if (list != null && list.length > 0) {
            return list[0].src;
        }
        return CONFIG.PRODUCT_IMAGE_DEFAULT;
    };

    $scope.enableSearch = function () {
        $scope.searching = !$scope.searching;
    };


    $scope.$watch('service.searchName', function (newValue, oldValue) {
        if (angular.isDefined(newValue) && newValue != oldValue) {
            var list = $scope.service.listCategories;
            for (var i in list) {
                if (list[i].checked) {
                    ProductService.loadProductByCategory(list[i]);
                    return;
                }
            }
            ProductService.loadAllProduct();
        }
    });

    $scope.formatPrice = function (price) {
        var str = '.000';
        while (price >= 1000) {
            price /= 1000;
            str = '.000' + str;
        }
        str = price + str;
        return str;
    };

    $scope.pageChanged = function () {
        if ($scope.selectedCategory > 0) {
            ProductService.loadProductByCategory($scope.selectedCategory);
        } else {
            ProductService.loadAllProduct();
        }
    };

    $scope.createProduct = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/modules/product/views/product-create.html',
            controller: 'CreateModalController',
            size: 'lg',
            backdrop: 'static',
            keyboard: false,
            resolve: {}
        });

        modalInstance.result.then(function (product) {
            $scope.service.listProducts.push(product);
        }, function (error) {
        });
    };


    $scope.viewProduct = function (product, index) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/modules/product/views/product-view.html',
            controller: 'ProductModalController',
            size: 'lg',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                product: function () {
                    return product;
                },

            }
        });

        modalInstance.result.then(function (product) {
            $scope.service.listProducts.splice(index, 1, product);
        }, function (error) {
        });
    };

    $scope.deleteProduct = function (product, index) {
        ProductService.deleteProduct(product, function (response) {
            $scope.service.listProducts.splice(index, 1);
            toaster.pop('success', 'Xóa sản phẩm', 'Thành công!');
        }, function (error) {
            toaster.pop('error', 'Xóa sản phẩm', 'Xảy ra lỗi khi xóa sản phẩm!');
        });
    };
}).controller('ProductModalController', function ($scope, ProductService, $uibModalInstance, $uibModal, product, toaster) {
    $scope.product = product;
    $scope.service = ProductService;

    $scope.close = function () {
        $uibModalInstance.close($scope.product);
    };

    $scope.selectedFavicon = function (index) {
        var list = $scope.product.images;
        for (var i in list) {
            if (i != index) {
                list[i].is_favicon = 0;
            }
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.deleteImage = function (image, index) {
        ProductService.deleteImage(image, function () {
            $scope.product.images.splice(index, 1);
            toaster.pop('success', 'Xóa ảnh', 'Thành công!');
        }, function (error) {
            toaster.pop('error', 'Xóa ảnh', 'Xảy ra lỗi khi xóa ảnh!');
        });
    };

    $scope.save = function () {
        ProductService.saveProduct($scope.product, function (response) {
            toaster.pop('success', 'Lưu lại', 'Thành công!');
            $uibModalInstance.close($scope.product);
        }, function (error) {
            toaster.pop('error', 'Lưu lại', 'Xảy ra lỗi khi lưu lại!');
        });
    };

    $scope.showUploadView = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/modules/product/views/product-upload.html',
            controller: 'UploadModalController',
            size: 'lg',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                product: function () {
                    return $scope.product;
                }
            }
        });

        modalInstance.result.then(function (product) {
            $scope.product = product;
        }, function () {
            //console.log('Modal dismissed at: ' + new Date());
        });
    };
}).controller('UploadModalController', function ($scope, $uibModalInstance, Upload, product, CONFIG, toaster) {
    $scope.uploading = false;
    $scope.product = product;

    $scope.close = function () {
        $uibModalInstance.close($scope.product);
    };

    $scope.upload = function (dataUrl, name) {
        if ($scope.product.images.length < 3) {

            $scope.uploading = true;
            $scope.progress = 0;
            Upload.upload({
                url: CONFIG.API_URL + 'forshops/products/image/upload',
                data: {
                    fileUpload: Upload.dataUrltoBlob(dataUrl, name),
                    product_id: product.id
                },
            }).then(function (response) {
                $scope.progress = 0;
                $scope.uploading = false;
                $scope.fileUpload = null;
                $scope.croppedDataUrl = null;
                $scope.product.images.push(response.data.product_image);
                toaster.pop('success', 'Upload', 'Thành công!');
            }, function (error) {
                toaster.pop('error', 'Upload', 'Xảy ra lỗi khi upload!');
                console.log(error);
                $scope.uploading = false;
            }, function (evt) {
                $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            });
        } else {
            toaster.pop('error', 'Upload', 'Sản phẩm chỉ tối đa 3 hình ảnh.');
        }
    };
}).controller('CreateModalController', function ($scope, $uibModalInstance, ProductService, CONFIG, toaster) {
    $scope.service = ProductService;

    $scope.close = function () {
        $uibModalInstance.close($scope.product);
    };
    $scope.create = function () {
        ProductService.createProduct($scope.product, function (response) {
            var data = response.data;
            $scope.product = data.product;
            toaster.pop('success', 'Thêm sản phẩm', 'Thành công!');
            $uibModalInstance.close($scope.product);
        }, function (error) {
            toaster.pop('error', 'Thêm sản phẩm', 'Xảy ra lỗi khi thêm!');
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});