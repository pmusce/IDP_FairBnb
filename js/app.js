// Define the `fairBnB` module
var fairBnB = angular.module('fairBnB', ['ui.bootstrap', 'ui.router', 'newsList', 'discussionList', 'projectsList', 'tabsCtrle']);



fairBnB.factory('user', [function() {
  	return {
        name: 'Pasquale Muscettola',
        username: 'polenta',
        role: 'admin',
        isAdmin: function() {
            return this.role == 'admin';
        },
        isGuest: function() {
            return this.role == 'guest';
        },
        switchRole: function() {
            this.role = this.oppositeRole().toLowerCase();
        },
        oppositeRole: function() {
            if (this.role == 'host')
                return 'Admin';
            if (this.role == 'admin')
                return 'Host';
            console.error("Invalid user role");
        }
    };
}]);

fairBnB.run(function($rootScope, $location, $state, LoginService) {
	$rootScope.$on('$stateChangeStart',
		function(event, toState, toParams, fromState, fromParams){
			console.log('Changed state to: ' + toState);
		});

	if(!LoginService.isAuthenticated()) {
		$state.transitionTo('login');
	}
});

fairBnB.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	//$urlRouterProvider.otherwise('/home');

	$stateProvider
	.state('login', {
		url : '/login',
		templateUrl : 'login.html',
		controller : 'LoginController'
	})
	.state('home', {
		url : '/home',
		templateUrl : 'home.html',
		controller : 'HomeController'
	})
  .state('bookings', {
    url : '/booking',
    templateUrl : 'booking.html',
    controller : 'HomeController'
  })
  .state('calendar', {
    url : '/calendar',
    templateUrl : 'calendar.html',
    controller : 'HomeController'
  })
  .state('project', {
    url : '/project',
    templateUrl : 'project.html',
    controller : 'HomeController'

  });
}]);

fairBnB.controller('LoginController', function($scope, $rootScope, $stateParams, $state, LoginService) {
	$rootScope.title = "AngularJS Login Sample";

	$scope.formSubmit = function() {
		console.log("YEAH");
		if(LoginService.login($scope.username, $scope.password)) {
			$scope.error = '';
			$scope.username = '';
			$scope.password = '';
			$('#loginModal').modal('toggle');

			$state.transitionTo('home');
		} else {
			$scope.error = "Incorrect username/password !";
		}
	};

});

fairBnB.controller('HomeController', function($scope, $rootScope, $stateParams, $state, user, LoginService) {
	$scope.user = user;
});


fairBnB.factory('LoginService', function() {
	var admin = 'admin';
	var pass = 'pass';
	var isAuthenticated = false;

	return {
		login : function(username, password) {
			isAuthenticated = username === admin && password === pass;
			return isAuthenticated;
		},
		isAuthenticated : function() {
			return isAuthenticated;
		}
	};

});
