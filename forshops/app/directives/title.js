/**
 * Created by Hoàng on 4/19/2016.
 */
myApp.directive('title', ['$rootScope', '$timeout',
    function ($rootScope, $timeout) {
        return {
            link: function () {

                var listener = function (event, toState) {

                    $timeout(function () {
                        $rootScope.title = (toState.data && toState.data.pageTitle)
                            ? toState.data.pageTitle
                            : 'Default title';
                    });
                };

                $rootScope.$on('$stateChangeSuccess', listener);
            }
        };
    }
]);