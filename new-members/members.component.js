angular.
module('memberList').
component('memberList', {
	templateUrl: 'new-members/members.template.html',
	bindings: {
		hosts: '='
	},
	controller: function memberListController($scope) {
		$scope.statusComparator = function (v1, v2) {
			console.log(v1, v2);
			if(v1.value == 'needs' && v2.value != 'needs') 
				return -1;
			if(v1.value != 'needs' && v2.value == 'needs') 
				return 1;
			return 0;
		}
	}
})
.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('home.reviewhosts', {
		template: '<ui-view />',
		controller: function ($state) {
			$state.go('.list');
		}
	})
	.state('home.reviewhosts.list', {
		url : '^/reviewhost',
		component: 'memberList',
		resolve: {
		    hosts: function(ReviewHostService, $transition$) {
		      	return ReviewHostService.getAllReviewHosts();
		    }
	    }
	})
	.state('home.reviewhosts.form', {
		url: '^/reviewhost/{hostId}',
		component: 'hostDetailComponent',
		resolve: {
		    host: function(ReviewHostService, $transition$) {
		      	return ReviewHostService.getReviewHost($transition$.params().hostId);
		    }
	    }
	})
	.state('home.reviewhosts.form.personal', {
		url: '/personal',
		templateUrl: 'new-members/form-personal.html'
	})

	.state('home.reviewhosts.form.space', {
		url: '/space',
		templateUrl: 'new-members/form-space.html'
	})

	// url will be /form/interests
	.state('home.reviewhosts.form.services', {
		url: '/services',
		templateUrl: 'new-members/form-services.html'
	})
	
	// url will be /form/payment
	.state('home.reviewhosts.form.description', {
		url: '/description',
		templateUrl: 'new-members/form-description.html'
	});
})
.component('hostDetailComponent', {
	templateUrl: 'new-members/form.html',
	bindings: {
		host: '='
	},
	controller: function hostDetailController($scope, $state) {
		$scope.formData = {
	    	personal: { decision: undefined, cause: ''},
			space: { decision: undefined, cause: ''},
			services: { decision: undefined, cause: ''},
			description: { decision: undefined, cause: ''}
	    };
		$state.go('.personal');
	}
})
.factory('ReviewHostService', ['$http', function ($http) {
	var hostsList = $http.get('data/hosts-req.json', { cache: true }).then(function(resp) {
		return resp.data;
	});
	var service = {
		getAllReviewHosts: function() {
			return hostsList;
		},
		getReviewHost: function(id) {
			function hostMatchesParam(host) {
				return host.id == id;
			}

			return service.getAllReviewHosts().then(function (hosts) {
				return hosts.find(hostMatchesParam);
			});
		}
	}

	return service;
}]);