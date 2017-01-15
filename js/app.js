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

	// if(!LoginService.isAuthenticated()) {
	// 	$state.transitionTo('login');
	// }
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
	});
}]);

fairBnB.controller('LoginController', function($scope, $uibModal, $stateParams, LoginService) {
	$scope.modalInstance = $uibModal.open({
	  animation: true,
      templateUrl: 'login-modal.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl'
    });


});

fairBnB.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, $state, LoginService) {
	$scope.formSubmit = function() {
		console.log("YEAH");
		if(LoginService.login($scope.username, $scope.password)) {
			$scope.error = '';
			$scope.username = '';
			$scope.password = '';
			$uibModalInstance.close();
			$state.transitionTo('home');
		} else {
			$scope.error = "Incorrect username/password !";
		}
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
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

fairBnB.controller('HomeController', function($scope, $stateParams, $state, user, LoginService) {
	$scope.user = user;
});