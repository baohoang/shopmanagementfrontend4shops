angular.module('ECSApp').controller('AdvController', function ($scope, AdvService, $uibModal, toaster, CONFIG) {

    $scope.service = AdvService;
    var currIndex = 0;
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    $scope.slides = [];


    $scope.addSlide = function () {
        var newWidth = 600 + currIndex + 1;
        $scope.slides.push({
            image: 'http://placekitten.com/' + newWidth + '/300',
            text: 'Nice image',
            id: currIndex++
        });
        //console.log($scope.slides);
    };

    $scope.$watch('active', function (currentSlide, previousSlide) {
        if (currentSlide !== previousSlide) {
            console.log('currentSlide:', currentSlide);
        }
    });

})
;