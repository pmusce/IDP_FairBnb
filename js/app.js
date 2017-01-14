'use strict';

angular.module('FairBnB', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

        // route for the home page
            .state('app', {
            url: '/',
            views: {

                'content': {
                    templateUrl: 'views/tbd.html',
                    controller: 'tbd'
                },

            }

        })

        // route for the aboutus page
        .state('app.aboutme', {
            url: 'aboutme',
            views: {
                'content@': {
                    templateUrl: 'views/tbd.html',
                    controller: 'tbd'
                }
            }
        })

        $urlRouterProvider.otherwise('/');
        provaccia
    });
