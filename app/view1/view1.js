'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .service('CrawlServerExecutor', ['$http', '$q', function ($http, $q) {

        var self = this;

        this.crawl = function (config) {
            console.log("Executing crawler on ");
            console.log(config);

            var deferred = $q.defer();

            var response = {
                data: {
                    results: [
                        {
                            link: "a.html",
                            domain: "google.com",
                            dateStart: Date.now()
                        },
                        {
                            link: "b.html",
                            domain: "cnn.com",
                            dateStart: Date.now()
                        },
                        {
                            link: "c.html",
                            domain: "ynet.co.il",
                            dateStart: Date.now()
                        },
                        {
                            link: "d.html",
                            domain: "api.google.com",
                            dateStart: Date.now()
                        }
                    ]
                }
            };

            setTimeout(function () {
                self.results = response.data.results;
                console.log(self.results);

                deferred.resolve(self.results);
            }, 800);


            //TODO: put server address
            //var serverAddress = "";
            //$http.post(serverAddress, config)
            //    .then(function (res) {
            //        deferred.resolve(res.data.results);
            //    })
            //    .catch(deferred.reject);

            return deferred.promise;
        }

    }])

    .controller('View1Ctrl', ['$scope', 'CrawlServerExecutor', '$log', function ($scope, CrawlServerExecutor, $log) {

        $scope.crawling = false;


        $scope.crawl = function (config) {
            $scope.crawling = true;

            if (!config.url) {
                config.url = "google.com"; // default crawling address
            }

            CrawlServerExecutor.crawl(config)
                .then(showResults)
                .then(updateCrawlingStatus)
                .catch($log.error.bind($log));
        };


        $scope.reset = function () {
            $scope.config = {
                portScan: "off",
                ignoreRobots: "off",
                url: ""
            };

            $scope.results = [];
        };


        var showResults = function (results) {
            $scope.results = results;
        };


        var updateCrawlingStatus = function () {
            $scope.crawling = !$scope.crawling;
        };

        $scope.reset();

    }]);