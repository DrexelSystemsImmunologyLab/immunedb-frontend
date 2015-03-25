(function() {
    'use strict';

    angular.module('ImmunologyApp').controller('ClonesCompareCtrl', ['$scope',
            '$http', '$location', '$routeParams', '$timeout', '$log', '$modal',
            'dnaCompare', 'lineage', 'APIService',
        function($scope, $http, $location, $routeParams, $timeout, $log, $modal,
                dnaCompare, lineage, APIService) {

            $scope.SEQS_PER_CANVAS = 100;

            $scope.openModal = function(title, mutations) {
                $modal.open({
                    templateUrl: 'mutationsModal.html',
                    controller: 'AlertModalCtrl',
                    resolve: {
                        title: function() {
                            return title;
                        },
                        data: function() {
                            return mutations;
                        }
                    }
                });
            }

            $scope.prevPage = function() {
                updateScroller(Math.max(0, --$scope.page));
            }

            $scope.nextPage = function() {
                updateScroller(++$scope.page);
            }

            var updateScroller = function(page) {
                var info = $scope.cloneInfo;
                dnaCompare.makeComparison(
                    $('#compare').get(0),
                    info.clone.germline,
                    info.clone.group.cdr3_num_nts,
                    info.seqs.slice(page * $scope.SEQS_PER_CANVAS, (page + 1) * $scope.SEQS_PER_CANVAS),
                    info.seqs.length,
                    info.mutation_stats);
            }

            $scope.addPin = function() {
                $scope.pins.addPin('Clone ' + $scope.cloneId);
                $scope.showNotify('This page has been pinned.');
            }

            $scope.updateTree = function() {
                lineage.makeTree(APIService.getUrl() +
                    'clone_tree/' + $scope.cloneId, '#tree',
                    $scope.colorBy, !$scope.showFanouts);
            }

            $scope.setThreshold = function(threshold) {
                $scope.threshold = threshold;
                if ($scope.threshold.indexOf('percent') >= 0) {
                    $scope.thresholdName = $scope.threshold.split('_')[1] + '%';
                } else {
                    $scope.thresholdName = $scope.threshold.split('_')[1] +
                        'sequences';
                }
            }

            var init = function() {
                $scope.showLoader();
                $scope.$parent.page_title = 'Clone Comparison';
                $scope.api = APIService.getUrl();
                $scope.page = 0;
                $scope.cutoffs = [
                    ['All', 'percent_0'],
                    ['&ge; 20%', 'percent_20'],
                    ['&ge; 80%', 'percent_80'],
                    ['= 100%', 'percent_100'],
                    ['&ge; 2 Seqs', 'seqs_2'],
                    ['&ge; 5 Seqs', 'seqs_5'],
                    ['&ge; 10 Seqs', 'seqs_10'],
                    ['&ge; 25 Seqs', 'seqs_25'],
                ];
                $scope.setThreshold('percent_0');
                if (typeof $routeParams['sampleIds'] != 'undefined') {
                    $scope.sampleWarning = true;
                }

                $http({
                    method: 'GET',
                    url: APIService.getUrl() + 'clone_compare/' + $routeParams['cloneId']
                }).success(function(data, status) {
                    $scope.cloneInfo = data;
                    $scope.apiUrl = APIService.getUrl();
                    $scope.Math = Math;

                    $scope.cloneId = $routeParams['cloneId'];
                    $scope.page = 0;

                    $scope.showFanouts = true;
                    $scope.colorBy = 'tissues';
                    $scope.updateTree();

                    $timeout(function(){
                        updateScroller(0);
                    }, 0);
                    $scope.hideLoader();
                }).error(function(data, status, headers, config) {
                    $scope.showError()
                });
            }

            init();
        }
    ]);
})();
