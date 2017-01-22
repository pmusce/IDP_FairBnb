// Define the `fairbed` module
var fairbed = angular.module('fairbed', [
	'ui.bootstrap',
	'ui.router',
	'ui.calendar',
	'newsList',
	'discussionList',
	'projectsList',
	'memberList',
	'navbar'
]);



fairbed.factory('user', [function() {
  	return {
        name: '',
        username: '',
        role: '',
				funds: '',
				image: '',
        isAuth: false,
        setUser: function(usr) {
        	this.name = usr.name;
        	this.username = usr.username;
        	this.role = usr.role;
					this.funds = usr.funds;
					this.image = usr.image;
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

fairbed.run(function($rootScope, $location, $state, LoginService) {
	$rootScope.$on('$stateChangeStart',
		function(event, toState, toParams, fromState, fromParams){
			console.log(toState);
		});

	// if($state.name != "login" && !LoginService.isAuthenticated()) {
	// 	$state.transitionTo('login');
	// }
});

fairbed.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	//$urlRouterProvider.otherwise('/login');

	$stateProvider
	.state('login', {
		url : '/login',
		templateUrl : 'login.html',
		controller : 'HomeController'
	})
	.state('home', {
		url : '/home',
		templateUrl : 'home.html',
		controller : 'HomeController'
	})
  .state('become', {
    url : '/booking',
    templateUrl : 'become.html',
    controller : 'HomeController'
  })
  .state('calendar', {
    url : '/calendar',
    templateUrl : 'calendar.html',
    controller : 'CalendarController'
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


fairbed.factory('LoginService', function($http, user, $state) {
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
						user.isAuth = true;
						callback();
					}
				}
				isAuthenticated = false;
				err_callback();
		    });

		},
		isAuthenticated : function() {
			return isAuthenticated;
		},
		logout: function() {
			isAuthenticated = false;
			user.isAuth = false;
			$state.transitionTo('login');
		}
	};

});

fairbed.controller('HomeController', function($scope, $stateParams, $state, user, LoginService) {
	$scope.user = user;

	// Triggering popovers for landing page on city input field
	$('#name').popover();

	//landing page datepicker callback

	$('.datepicker .input-daterange').datepicker({
	});

// end datepicker call

	$scope.logout = function() {
		LoginService.logout();
	}
});
