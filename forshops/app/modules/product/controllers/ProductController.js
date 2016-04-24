angular.module('ECSApp').controller('ProductController', function ($scope, ProductService, $uibModal, toaster) {

    $scope.service = ProductService;
    ProductService.loadCategories();
    ProductService.loadAllProduct();

    $scope.selectCategory = function (index) {
        var list = $scope.service.listCategories;
        if (list[index].checked) {
            ProductService.loadProductByCategory(list[index]);
        } else {
            $scope.service.loadAllProduct();
        }
        for (var i in list) {
            if (i != index) {
                list[i].checked = false;
            }
        }
    };


    $scope.$watch('service.searchName', function (newValue, oldValue) {
        if (angular.isDefined(newValue) && newValue != oldValue && newValue != '') {

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
        console.log('aaa');
        if ($scope.selectedCategory > 0) {
            ProductService.loadProductByCategory($scope.selectedCategory);
        } else {
            ProductService.loadAllProduct();
        }
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


}).
    controller('ProductModalController', function ($scope, ProductService, $uibModalInstance, $uibModal, product, toaster) {
        $scope.product = product;
        $scope.oldProduct = product;

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
    });