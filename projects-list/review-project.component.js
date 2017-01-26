angular.
module('projectsList')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$stateProvider
	.state('home.reviewproj', {
		template: '<ui-view/>',
		controller: function($state) {
			$state.go('home.reviewproj.list');
		}
	})
	.state('home.reviewproj.list', {
		url : '^/reviewproj',
		component: 'reviewProjects'
	})
	.state('home.reviewproj.detail', {
		url : '^/reviewproj/detail/{project}',
		component: 'detailReviewProjects',
		resolve: {
		    project: function(ReviewProjectService, $transition$) {
		      	return ReviewProjectService.getReviewProject($transition$.params().project);
		    }
	    }
	})
	.state('home.reviewproj.detail.location', {
        url: '/location',
        templateUrl: 'projects-list/review-form/form-location.html'
    })
    .state('home.reviewproj.detail.legality', {
        url: '/legality',
        templateUrl: 'projects-list/review-form/form-location.html'
    })
    .state('home.reviewproj.detail.value', {
        url: '/value',
        templateUrl: 'projects-list/review-form/form-location.html'
    })
    .state('home.reviewproj.detail.shortterm', {
        url: '/shortterm',
        templateUrl: 'projects-list/review-form/form-location.html'
    })
    .state('home.reviewproj.detail.budget', {
        url: '/budget',
        templateUrl: 'projects-list/review-form/form-location.html'
    })
    .state('home.reviewproj.detail.feasibility', {
        url: '/feasibility',
        templateUrl: 'projects-list/review-form/form-location.html'
    })
    .state('home.reviewproj.detail.approvals', {
        url: '/approvals',
        templateUrl: 'projects-list/review-form/form-location.html'
    })
}])
.component('reviewProjects', {
	templateUrl: 'projects-list/review-projects.template.html',
	controller: function ReviewProjectsController($scope, $uibModal, $http, user) {
		self = this;  	
	  	$http.get('../data/review-projects.json').then(function(response) {
			self.projects = response.data;
		});
	}
})
.component('detailReviewProjects', {
	templateUrl: 'projects-list/detail-review-project.template.html',
	bindings: {
		project: '='
	},
	controller: function ReviewProjectsController($scope, user) {
		
	}
})
.factory('ReviewProjectService', ['$http', function ($http) {
	var projectsList = $http.get('data/review-projects.json', { cache: true }).then(function(resp) {
		return resp.data;
	});
  	var service = {
	    getAllReviewProjects: function() {
	      	return projectsList;
	    },
	    getReviewProject: function(id) {
	      function projectMatchesParam(project) {
	        return project.id == id;
	      }

	      return service.getAllReviewProjects().then(function (projects) {
	        return projects.find(projectMatchesParam);
	      });
	    }
	}

  return service;
}]);;