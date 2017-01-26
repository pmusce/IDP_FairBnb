angular.module('becomeHost', ['ngAnimate', 'ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('hostform', {
            url: '/hostform',
            templateUrl: 'become-host/form.html',
            controller: 'formController'
        })
        
        .state('hostform.space', {
            url: '/space',
            templateUrl: 'become-host/form-space.html'
        })
        
        .state('hostform.services', {
            url: '/services',
            templateUrl: 'become-host/form-services.html'
        })
        
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
        alert('awesome!');
    };
    
});;