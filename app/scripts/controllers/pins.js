(function() {
    'use strict';
    angular.module('ImmunologyApp').controller('PinsCtrl', ['$scope',
            '$log',
        function($scope, $log, PinService) {
            var init = function() {
                $scope.showLoader();
                $scope.$parent.page_title = 'Pinned Items';

                $scope.hideLoader();

                $scope.showPins =
                    Object.keys($scope.pins.getPins()).length > 0;
            }

            init();
        }
    ]);
})();