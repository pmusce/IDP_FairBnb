angular.module('becomeHost', ['ngAnimate', 'ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('hostform', {
            url: '/hostform',
            templateUrl: 'become-host/form.html',
            controller: 'formController'
        })

        // nested states
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('hostform.space', {
            url: '/space',
            templateUrl: 'become-host/form-space.html'
        })

        // url will be /form/interests
        .state('hostform.services', {
            url: '/services',
            templateUrl: 'become-host/form-services.html'
        })

        // url will be /form/payment
        .state('hostform.description', {
            url: '/description',
            templateUrl: 'become-host/form-description.html'
        });

    // catch all route
    // send users to the form page
    $urlRouterProvider.otherwise('/form/profile');
})
.controller('formController', function($scope) {

    // we will store all of our form data in this object
    $scope.formData = {};

    // function to process the form
    $scope.processForm = function() {
        alert('Our team will review your application. You will receive an email when your subscription will be validated ');
    };

});;
