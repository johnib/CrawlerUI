'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .service('CrawlServerExecutor', ['$http', '$q', function ($http, $q) {

        //TODO: put server address
        var serverUrl = "";

        this.getResults = function () {
            return $http.get(serverUrl + '/get-history')
                .then(function (res) {
                    $q.resolve(res.data.results);
                })
                .catch($q.reject);
        };

        this.crawl = function (crawlConfig) {
            console.log("Executing crawler on ");
            console.log(crawlConfig);

            var deferred = $q.defer();

            $http.post(serverUrl, crawlConfig)
                .then(function (res) {
                    deferred.resolve(res.data.results);
                })
                .catch(deferred.reject);

            return deferred.promise;
        }

    }])

    .controller('View1Ctrl', ['$scope', 'CrawlServerExecutor', function ($scope, CrawlServerExecutor) {

        $scope.crawling = false;


        $scope.crawl = function (config) {
            $scope.crawling = true;

            if (!config.url) {
                config.url = "google.com"; // default crawling address
            }

            CrawlServerExecutor.crawl(config)
                .then(updateResults)
                .then(updateCrawlingStatus);
        };


        $scope.reset = function () {
            $scope.config = {
                portScan: "off",
                ignoreRobots: "off",
                url: ""
            };

            $scope.results = [];
        };


        var updateResults = function (results) {
            $scope.results = results;
        };

        var getResults = function () {
            CrawlServerExecutor.getResults()
                .then(updateResults);
        };

        var updateCrawlingStatus = function () {
            $scope.crawling = !$scope.crawling;
        };

        $scope.reset();
        getResults();

    }]);