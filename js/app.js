// Define the `fairbed` module
var fairbed = angular.module('fairbed', [
	'ui.bootstrap',
	'ui.router',
	'ui.calendar',
	'ngCookies',
	'newsList',
	'discussionList',
	'projectsList',
	'memberList',
	'navbar'
]);



fairbed.factory('user', ['$cookies', function($cookies) {
	user = $cookies.getObject('user');

	if(user === undefined) {
	  	user = {
	        name: '',
	        username: '',
	        role: '',
			funds: '',
			image: '',
	        isAuth: false
	    };
	} else {
		user.isAuth = true;
	}

    user.setUser= function(usr) {
    	$cookies.putObject('user', usr);
    	this.name = usr.name;
    	this.username = usr.username;
    	this.role = usr.role;
			this.funds = usr.funds;
			this.image = usr.image;
    };

   	user.isAdmin= function() {
        return this.role == 'admin';
    };
    user.isGuest= function() {
        return this.role == 'guest';
    };
    user.switchRole= function() {
        this.role = this.oppositeRole().toLowerCase();
    };
    user.oppositeRole= function() {
        if (this.role == 'host')
            return 'Admin';
        if (this.role == 'admin')
            return 'Host';
        console.error("Invalid user role");
    };

    return user;
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
	$urlRouterProvider.otherwise('/login');

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
		url : '/become',
		templateUrl : 'become.html',
		controller : 'HomeController'
	})
	.state('home.projects', {
		url : '^/projects',
		component: 'projects'
	})
	.state('home.discussions', {
		url : '^/discussions',
		component: 'discussionList'
	})
	.state('home.news', {
		url : '^/news',
		component: 'newsList',
		resolve: {
			news: function(NewsService) {
	          	return NewsService.getAllNews();
	        }
		}
	})
	.state('home.newsdetail', {
		url : '^/news/{newsId}',
		component: 'newsList',
		resolve: {
			newsItem: function(NewsService) {
	          	return NewsService.getNews(newsId);
	        }
		}
	})
	.state('home.reviewproj', {
		url : '^/reviewproj',
		component: 'projects'
	})
	.state('home.reviewhosts', {
		url : '^/reviewhosts',
		component: 'memberList'
	})
	.state('home.myproj', {
		url : '^/myprojects',
		component: 'myProjects'
	})
	.state('detailproject', {
		url : '/detailproject',
		templateUrl : 'detailproject.html',
		controller : 'HomeController'
	});
}]);


fairbed.factory('LoginService', function($http, $cookies, user, $state) {
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
			$cookies.remove('user');
			isAuthenticated = false;
			user.isAuth = false;
			$state.transitionTo('login');
		}
	};

});

fairbed.controller('HomeController', function($scope, $stateParams, $state, NewsService, user, LoginService) {
	$scope.news = NewsService;

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
