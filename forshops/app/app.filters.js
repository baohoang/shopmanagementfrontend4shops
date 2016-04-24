myApp.filter('FilterName', function () {
    return function (input) {
        return input ? 'value-true' : 'value-false';
    };
});