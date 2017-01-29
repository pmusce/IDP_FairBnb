angular.
module('projectsList')
.component('myProjects', {
	templateUrl: 'projects-list/my-projects-list.template.html',
	controller: function MyProjectsController($http, $scope, MyProjectsService) {
		self = this;
	  	$http.get('../data/my-projects.json').then(function(response) {
			self.projects = response.data;
		});

	}
})
.factory('MyProjectsService', ['$http', function ($http) {
	var projectsList = $http.get('data/my-projects.json', { cache: true }).then(function(resp) {
		return resp.data;
	});
  	var service = {
	    getAllProjects: function() {
	    	console.log(projectsList);
	      	return projectsList;
	    },
	    getProject: function(id) {
	      function projectMatchesParam(project) {
	        return project.id == id;
	      }

	      return service.getAllProjects().then(function (projects) {
	        return projects.find(projectMatchesParam);
	      });
	    }
	}

  return service;
}])
.config(['$stateProvider', function($stateProvider) {

	// MyProjects states
	$stateProvider
	.state('home.myproj', {
		template: "<ui-view />",
		controller: function($state) {
			$state.go('.list');
		}
	})
	.state('home.myproj.list', {
		url : '^/myprojects',
		component: 'myProjects'
	})
	.state('home.myproj.detail', {
		url : '^/myproj/detail/{project}',
		resolve: {
		    project: function(MyProjectsService, $transition$) {
		      	return MyProjectsService.getProject($transition$.params().project);
		    }
	    },
	    controller: function($state, project) {
	    	switch(project.status) {
				case "pending":
					$state.go(".pending");
					break;
				case "declined":
					console.log('OK');
					$state.go(".declined");
					break;
				case "funded":
					$state.go(".funded");
					break;
				case "completed":
					$state.go(".completed");
					break;
				case "need-funding":
					$state.go(".needfunding");
					break;
			    default:
			}
	    }
	})
	.state('home.myproj.detail.pending', {
		templateUrl: 'projects-list/detail-pending.template.html',
		controller: function($scope, project) {
			$scope.project = project;
		}
	})
	.state('home.myproj.detail.declined', {
		templateUrl: 'projects-list/detail-rejected.template.html',
		controller: function($scope, project) {
			$scope.project = project;
		}
	})
	.state('home.myproj.detail.funded', {
		templateUrl: 'projects-list/detail-funded.template.html',
		controller: function($scope, project) {
			$scope.project = project;
		}
	})
	.state('home.myproj.detail.completed', {
		templateUrl: 'projects-list/detail-completed.template.html',
		controller: function($scope, project) {
			$scope.project = project;
		}
	})
	.state('home.myproj.detail.needfunding', {
		templateUrl: 'projects-list/detail-need-funding.template.html',
		controller: function($scope, project) {
			$scope.project = project;
		}
	});
}])