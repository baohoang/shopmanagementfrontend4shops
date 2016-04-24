App.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', 'CONFIG',
    function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, CONFIG) {

        // Redirect any unmatched url
        $urlRouterProvider.otherwise("");

        $stateProvider
            .state('login', {
                url: "/login",
                templateUrl: "app/sys/user/views/login.html",
                data: {
                    pageTitle: 'Login ERP SYSTEM',
                    requireLogin: false
                },
                controller: "LoginCtrl",
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'ECSApp',
                            files: [
                                'app/sys/user/controllers/LoginController.js',
                                'app/sys/user/services/AuthServices.js',
                                'app/sys/user/services/RoleServices.js',
                                'app/sys/user/services/UserServices.js',
                            ]
                        });
                    }]
                }
            })
            .state('logout', {
                url: '/logout',
                controller: function ($rootScope, $http, $window, $state, localStorageService, $auth, CONFIG) {
                    console.log("-----------logout---------");
                    var data = {'Authorization': $auth.getToken()};
                    var headers = {'headers': data};
                    $auth.logout().then(function () {
                        // send a request to your server to perform server-side logout
                        $http.post(CONFIG.API_URL + 'auth/logout', data, headers).then(function successCallback() {
                            console.log('Successfully logged out');
                        }, function errorCallback() {
                            console.log('errorCallback logged out');
                        });

                        $rootScope.authenticated = undefined;
                        //Clear store
                        localStorageService.clearAll();
                        $state.go("login");
                    });
                },
                data: {
                    requireLogin: false,
                },
            })

            // Main
            .state('main', {
                url: "",
                templateUrl: "tpl/layout.html",
                data: {pageTitle: 'Admin Dashboard main', displayName: 'Home', requireLogin: false},
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            files: [
                                'tpl/footer.html',
                                '../../../assets/global/plugins/morris/morris.css',
                                '../../../assets/admin/pages/css/tasks.css',
                                '../../../assets/global/plugins/morris/morris.min.js',
                                '../../../assets/global/plugins/morris/raphael-min.js',
                                '../../../assets/global/plugins/jquery.sparkline.min.js',
                                '../../../assets/admin/pages/scripts/index3.js',
                                '../../../assets/admin/pages/scripts/tasks.js',
                            ]
                        })
                    }
                },
            })

            .state('main.profile', {
                templateUrl: 'app/sys/user/views/profile.html',
                url: '/profile',
                data: {
                    requireLogin: true,
                    displayName: 'Profile'
                },
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            files: [
                                'app/sys/user/controllers/AuthCtrl.js',
                                'app/sys/user/services/AuthServices.js',
                            ]
                        })
                    }
                },
            })

            .state('main.changePass', {
                templateUrl: 'app/sys/user/views/changePass.html',
                url: '/changePass',
                data: {
                    requireLogin: true,
                    displayName: 'Chage Pass'
                },
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            files: [
                                'app/sys/user/controllers/AuthCtrl.js',
                                'app/sys/user/services/AuthServices.js',
                                'directives/common/validPassword.js',
                                'directives/common/confirmPassword.js',
                            ]
                        })
                    }
                },
            })

            // Dashboard
            .state('main.dashboard', {
                url: "/dashboard",
                templateUrl: "app/sys/dashboard/views/dashboard.html",
                data: {pageTitle: 'Admin Dashboard Template', displayName: 'Home', requireLogin: true},
                controller: "DashboardController",
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            //insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                            files: [
                                'app/sys/dashboard/controllers/DashboardController.js'
                            ]
                        });
                    }]
                },
            })

            //AngularJS plugins
            .state('main.angularjs', {
                url: "/angularjs",
                templateUrl: "tpl/parent.html",
                data: {pageTitle: 'Admin Dashboard main', displayName: 'AngularJS plugins'},
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            files: []
                        })
                    }
                },
            })

            .state('main.angularjs.fileupload', {
                url: "/file_upload.html",
                templateUrl: "app/sys/features/views/file_upload.html",
                data: {pageTitle: 'AngularJS File Upload', displayName: 'File Upload'},
                controller: "GeneralPageController",
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: 'angularFileUpload',
                            files: [
                                '../../../assets/global/plugins/angularjs/plugins/angular-file-upload/angular-file-upload.min.js',
                            ]
                        }, {
                            name: 'MetronicApp',
                            files: [
                                'app/sys/features/controllers/GeneralPageController.js'
                            ]
                        }]);
                    }]
                },
            })

            // UI Select
            .state('main.angularjs.uiselect', {
                url: "/ui_select.html",
                templateUrl: "app/sys/features/views/ui_select.html",
                data: {pageTitle: 'AngularJS Ui Select', displayName: 'UI select'},
                controller: "UISelectController",
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: 'ui.select',
                            insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                            files: [
                                '../../../assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                                '../../../assets/global/plugins/angularjs/plugins/ui-select/select.min.js'
                            ]
                        }, {
                            name: 'MetronicApp',
                            files: [
                                'app/sys/features/controllers/UISelectController.js'
                            ]
                        }]);
                    }]
                },
            })

            // UI Bootstrap
            .state('main.angularjs.uibootstrap', {
                url: "/ui_bootstrap.html",
                templateUrl: "app/sys/features/views/ui_bootstrap.html",
                data: {pageTitle: 'AngularJS UI Bootstrap', displayName: "UI Bootstrap"},
                controller: "GeneralPageController",
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: 'MetronicApp',
                            files: [
                                'app/sys/features/controllers/GeneralPageController.js'
                            ]
                        }]);
                    }]
                }
            })

            .state('main.tool', {
                url: "/tools",
                templateUrl: "tpl/parent.html",
                data: {pageTitle: 'Tool', displayName: "Tool"},
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            files: []
                        })
                    }
                }
            })

            // Tree View
            .state('main.tool.tree', {
                url: "/tree",
                templateUrl: "app/sys/features/views/tree.html",
                data: {pageTitle: 'jQuery Tree View', displayName: "jQuery Tree View"},
                controller: "GeneralPageController",
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: 'MetronicApp',
                            insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                            files: [
                                '../../../assets/global/plugins/jstree/dist/themes/default/style.min.css',
                                '../../../assets/global/plugins/jstree/dist/jstree.min.js',
                                '../../../assets/admin/pages/scripts/ui-tree.js',
                                'app/sys/features/controllers/GeneralPageController.js'
                            ]
                        }]);
                    }]
                }
            })

            // Form Tools
            .state('main.tool.formtools', {
                url: "/form-tools",
                templateUrl: "app/sys/features/views/form_tools.html",
                data: {pageTitle: 'Form Tools', displayName: "Form Tools"},
                controller: "GeneralPageController",
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: 'MetronicApp',
                            insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                            files: [
                                '../../../assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                                '../../../assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css',
                                '../../../assets/global/plugins/jquery-tags-input/jquery.tagsinput.css',
                                '../../../assets/global/plugins/bootstrap-markdown/css/bootstrap-markdown.min.css',
                                '../../../assets/global/plugins/typeahead/typeahead.css',
                                '../../../assets/global/plugins/fuelux/js/spinner.min.js',
                                '../../../assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
                                '../../../assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
                                '../../../assets/global/plugins/jquery.input-ip-address-control-1.0.min.js',
                                '../../../assets/global/plugins/bootstrap-pwstrength/pwstrength-bootstrap.min.js',
                                '../../../assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js',
                                '../../../assets/global/plugins/jquery-tags-input/jquery.tagsinput.min.js',
                                '../../../assets/global/plugins/bootstrap-maxlength/bootstrap-maxlength.min.js',
                                '../../../assets/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js',
                                '../../../assets/global/plugins/typeahead/handlebars.min.js',
                                '../../../assets/global/plugins/typeahead/typeahead.bundle.min.js',
                                '../../../assets/admin/pages/scripts/components-form-tools.js',
                                'app/sys/features/controllers/GeneralPageController.js'
                            ]
                        }]);
                    }]
                }
            })

            // Date & Time Pickers
            .state('main.tool.pickers', {
                url: "/pickers",
                templateUrl: "app/sys/features/views/pickers.html",
                data: {pageTitle: 'Date & Time Pickers', displayName: "Date & Time Pickers"},
                controller: "GeneralPageController",
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: 'MetronicApp',
                            insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                            files: [
                                '../../../assets/global/plugins/clockface/css/clockface.css',
                                '../../../assets/global/plugins/bootstrap-datepicker/css/datepicker3.css',
                                '../../../assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
                                '../../../assets/global/plugins/bootstrap-colorpicker/css/colorpicker.css',
                                '../../../assets/global/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css',
                                '../../../assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',
                                '../../../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
                                '../../../assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
                                '../../../assets/global/plugins/clockface/js/clockface.js',
                                '../../../assets/global/plugins/bootstrap-daterangepicker/moment.min.js',
                                '../../../assets/global/plugins/bootstrap-daterangepicker/daterangepicker.js',
                                '../../../assets/global/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js',
                                '../../../assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',
                                '../../../assets/admin/pages/scripts/components-pickers.js',
                                'app/sys/features/controllers/GeneralPageController.js'
                            ]
                        }]);
                    }]
                }
            })

            // Custom Dropdowns
            .state('main.tool.dropdowns', {
                url: "/dropdowns",
                templateUrl: "app/sys/features/views/dropdowns.html",
                data: {pageTitle: 'Custom Dropdowns', displayName: "Custom Dropdowns"},
                controller: "GeneralPageController",
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: 'MetronicApp',
                            insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                            files: [
                                '../../../assets/global/plugins/bootstrap-select/bootstrap-select.min.css',
                                '../../../assets/global/plugins/select2/select2.css',
                                '../../../assets/global/plugins/jquery-multi-select/css/multi-select.css',
                                '../../../assets/global/plugins/bootstrap-select/bootstrap-select.min.js',
                                '../../../assets/global/plugins/select2/select2.min.js',
                                '../../../assets/global/plugins/jquery-multi-select/js/jquery.multi-select.js',
                                '../../../assets/admin/pages/scripts/components-dropdowns.js',
                                'app/sys/features/controllers/GeneralPageController.js'
                            ]
                        }]);
                    }]
                }
            })

            //formWizard
            .state('main.tool.formWizard', {
                url: "/form_wizard",
                templateUrl: "app/sys/features/views/form_wizard.html",
                data: {pageTitle: 'Form wizard', displayName: "Form wizard"},
                controller: "GeneralPageController",
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: 'MetronicApp',
                            files: [
                                'app/sys/features/controllers/GeneralPageController.js'
                            ]
                        }]);
                    }]
                }
            })

            .state('main.tool.imageCrop', {
                url: "/form_image_crop",
                templateUrl: "app/sys/features/views/form_image_crop.html",
                data: {pageTitle: 'Crop Image', displayName: "Crop Image"},
                controller: "GeneralPageController",
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'assets/global/plugins/jcrop/css/jquery.Jcrop.min.css',
                                'assets/admin/pages/css/image-crop.css',
                            ]
                        }, {
                            name: 'MetronicApp',
                            files: [
                                'app/sys/features/controllers/GeneralPageController.js'
                            ]
                        }]);
                    }]
                }
            })

            .state('main.datatables', {
                url: "/datatables",
                templateUrl: "tpl/parent.html",
                data: {pageTitle: 'Datatables', displayName: "Datatables"},
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            files: []
                        })
                    }
                }
            })

            // Advanced Datatables
            .state('main.datatables.advanced', {
                url: "/advanced.html",
                templateUrl: "app/sys/features/views/table_advanced.html",
                data: {pageTitle: 'Advanced Datatables', displayName: "Advanced Datatables"},
                controller: "GeneralPageController",
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                            files: [
                                '../../../assets/global/plugins/select2/select2.css',
                                '../../../assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css',
                                '../../../assets/global/plugins/datatables/extensions/Scroller/css/dataTables.scroller.min.css',
                                '../../../assets/global/plugins/datatables/extensions/ColReorder/css/dataTables.colReorder.min.css',
                                '../../../assets/global/plugins/select2/select2.min.js',
                                '../../../assets/global/plugins/datatables/all.min.js',
                                'app/sys/features/controllers/table-advanced.js',
                                'app/sys/features/controllers/GeneralPageController.js'
                            ]
                        });
                    }]
                }
            })

            // Ajax Datetables
            .state('main.datatables.ajax', {
                url: "/ajax.html",
                templateUrl: "app/sys/features/views/table_ajax.html",
                data: {pageTitle: 'Ajax Datatables', displayName: "Ajax Datatables"},
                controller: "GeneralPageController",
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                            files: [
                                '../../../assets/global/plugins/select2/select2.css',
                                '../../../assets/global/plugins/bootstrap-datepicker/css/datepicker.css',
                                '../../../assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css',
                                '../../../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
                                '../../../assets/global/plugins/select2/select2.min.js',
                                '../../../assets/global/plugins/datatables/all.min.js',
                                '../../../assets/global/scripts/datatable.js',
                                'app/sys/features/controllers/table-ajax.js',
                                'app/sys/features/controllers/GeneralPageController.js'
                            ]
                        });
                    }]
                }
            })

            // User Profile
            .state("main.profileManager", {
                url: "/profile",
                templateUrl: "app/sys/profile/views/profile.html",
                data: {pageTitle: 'User Profile', displayName: "User Profile Manager"},
                controller: "UserProfileController",
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                            files: [
                                '../../../assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                                '../../../assets/admin/pages/css/profile.css',
                                '../../../assets/admin/pages/css/tasks.css',
                                '../../../assets/global/plugins/jquery.sparkline.min.js',
                                '../../../assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
                                '../../../assets/admin/pages/scripts/profile.js',
                                'app/sys/profile/controllers/UserProfileController.js',
                            ]
                        });
                    }]
                }
            })

            // User Profile Dashboard
            .state("main.profileDashboard", {
                url: "/dashboard",
                templateUrl: "app/sys/profile/views/dashboard.html",
                data: {pageTitle: 'User Dashboard', displayName: "User Dashboard"}
            })

            // User Profile Account
            .state("main.profileAccount", {
                url: "/account",
                templateUrl: "app/sys/profile/views/account.html",
                data: {pageTitle: 'User Account', displayName: "User Account"}
            })

            // User Profile Help
            .state("main.profileHelp", {
                url: "/help",
                templateUrl: "app/sys/profile/views/help.html",
                data: {pageTitle: 'User Help', displayName: "User Help"}
            })

            // Todo
            .state('main.todo', {
                url: "/todo",
                templateUrl: "app/sys/features/views/todo.html",
                data: {pageTitle: 'Todo', displayName: "To do"},
                controller: "TodoController",
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                            files: [
                                '../../../assets/global/plugins/bootstrap-datepicker/css/datepicker3.css',
                                '../../../assets/global/plugins/select2/select2.css',
                                '../../../assets/admin/pages/css/todo.css',
                                '../../../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
                                '../../../assets/global/plugins/select2/select2.min.js',
                                '../../../assets/admin/pages/scripts/todo.js',
                                'app/sys/features/controllers/TodoController.js'
                            ]
                        });
                    }]
                }
            })


            //System
            .state('main.sys', {
                url: "/sys",
                templateUrl: "tpl/parent.html",
                data: {pageTitle: 'Admin Dashboard main', displayName: false},
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            files: []
                        })
                    }
                }
            })

            //SCC
            .state('main.scc', {
                url: "/scc",
                templateUrl: "tpl/parent.html",
                data: {pageTitle: 'Admin Dashboard main', displayName: false},
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            files: []
                        })
                    }
                }
            })

            //fac
            .state('main.fac', {
                url: "/fac",
                templateUrl: "tpl/parent.html",
                data: {pageTitle: 'Admin Dashboard main', displayName: false},
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            files: []
                        })
                    }
                }
            })
            // Report
            .state('main.report', {
                url: "/report",
                templateUrl: "tpl/parent.html",
                data: {pageTitle: 'Report', displayName: false},
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            files: []
                        })
                    }
                }
            })

    }]);