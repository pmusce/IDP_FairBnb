// Define the `fairBnB` module
var fairBnB = angular.module('fairBnB', ['ui.bootstrap', 'ui.router', 'newsList', 'discussionList', 'projectsList', 'memberList', 'tabsCtrle']);



fairBnB.factory('user', [function() {
  	return {
        name: '',
        username: '',
        role: '',
        setUser: function(usr) {
        	this.name = usr.name;
        	this.username = usr.username;
        	this.role = usr.role;
        },
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
			console.log(toState);
		});

	if(!$state.name == "login" && !LoginService.isAuthenticated()) {
		$state.transitionTo('login');
	}
});

fairBnB.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	//$urlRouterProvider.otherwise('/login');

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

  })
  .state('detailproject', {
    url : '/detailproject',
    templateUrl : 'detailproject.html',
    controller : 'HomeController'
  });
}]);

fairBnB.controller('LoginController', function($scope, $uibModal, $stateParams, LoginService) {


	$scope.login = function() {
		$uibModal.open({
		  animation: true,
	      templateUrl: 'login-modal.html',
	      controller: 'LoginModalInstanceCtrl',
	      controllerAs: '$ctrl'
	    });
	};

	$scope.signup = function() {
		$uibModal.open({
		  animation: true,
	      templateUrl: 'signup-modal.html',
	      controller: 'LoginModalInstanceCtrl',
	      controllerAs: '$ctrl'
	    });
	};
});

fairBnB.controller('LoginModalInstanceCtrl', function ($scope, $uibModalInstance, $state, LoginService) {
	$scope.formSubmit = function() {
		LoginService.login($scope.username, $scope.password,
			function() {
				$scope.error = '';
				$scope.username = '';
				$scope.password = '';
				$uibModalInstance.close();
				$state.transitionTo('home');
			}, function() {
				$scope.error = "Incorrect username/password !";
			});
	};

});

fairBnB.factory('LoginService', function($http, user) {
	self = this;
	var isAuthenticated = false;
	

	return {
		login : function(username, password, callback, err_callback) {
			$http.get('../data/users.json').then(function(response) {
		        userList = response.data;
				for (i=0; i< userList.length; i++) {
					if (username === userList[i].username && password === userList[i].password) {
						isAuthenticated = true;
						user.setUser(userList[i]);
						callback();
					}
				}
				isAuthenticated = false;
				err_callback();
		    });
			
			return isAuthenticated;
		},
		isAuthenticated : function() {
			return isAuthenticated;
		}
	};

});

fairBnB.controller('HomeController', function($scope, $stateParams, $state, user, LoginService) {
	$scope.user = user;
});
