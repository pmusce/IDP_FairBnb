angular.
module('projectsList')
.component('projects', {
	templateUrl: 'projects-list/projects-list.template.html',
	bindings: {
		projects: '='
	},
	controller: function ProjectListController($scope, $uibModal, ProjectsService, user, projectDetailService) {
		$scope.createProject = function() {
	        $uibModal.open({
		        animation: true,
		        templateUrl: 'projects-list/newProject.template.html',
		        controller: 'NewProjectModalInstanceCtrl',
		        controllerAs: '$ctrl',
		        size: 'lg',
		        windowClass: 'new-project-modal'
	        });
	    };


	    $scope.categories = [
	        {name: 'All projects', type: ''},
	        {name: 'Need funding', type: 'need-funding'},
	        {name: 'Funded', type: 'funded'}
	    ];

	    $scope.filters = {type: ''};

	    $scope.status = projectDetailService;
	    var self = this;
		$scope.user = user;

		self.openDetail = function(project) {
			projectDetailService.project = project;
			if(project.type == 'need-funding') {
				projectDetailService.layout = 'detailNeedFunding';
			} else {
				projectDetailService.layout = 'detailFunded';
			}
		};
	}
})
.component('newProject', {
	templateUrl: 'projects-list/newProject.template.html',
	controller: function MyProjectsController($http) {
		var self = this;

		$http.get('../data/projects.json').then(function(response) {	// Randomly GET projects. Not necessary
			self.projects = response.data;
		});

	}
})
.controller('NewProjectModalInstanceCtrl', function ($scope, $uibModalInstance, $state) {
	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
})
.component('detailFunded', {
	templateUrl: 'projects-list/detail-funded.template.html',
	controller: function DetailFundedController($scope, projectDetailService) {
		$scope.myInterval = 5000;
		$scope.noWrapSlides = false;
		$scope.active = 0;

		$scope.project = projectDetailService.project;
		$scope.back = function() {
			projectDetailService.goToList('funded');
		}

	}
})
.controller('detailNeedFunding', function DetailNeedFundingController($scope, $uibModal, user, project) {
	$scope.project = project;
	$scope.myInterval = 5000;
	$scope.noWrapSlides = false;
	$scope.active = 0;
	$scope.user = user;
	$scope.back = function() {
		projectDetailService.goToList('not-funded');
	}

	$scope.support = function() {
		$uibModal.open({
	        animation: true,
	        templateUrl: 'support-modal.html',
	        controller: 'SupportProjectModalInstanceCtrl',
	        controllerAs: '$ctrl',
	        size: 'lg',
	        resolve: {
	        	project: function() {
	        		return $scope.project;
	        	}
	        }
        });
	}
})
.controller('SupportProjectModalInstanceCtrl', function ($scope, user, project, $uibModalInstance, $state) {
	$scope.project = project;
	$scope.user = user;

	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
})
.factory('projectDetailService', function() {
	self = this;

	return {
		project: undefined,
		layout: 'explore',
		type: "all",
		goToList: function(type) {
			this.type = type;
			this.project = undefined;
			this.layout = 'explore';
		},
	};

})
.factory('ProjectsService', ['$http', function ($http) {
	var projectsList = $http.get('data/projects.json', { cache: true }).then(function(resp) {
		return resp.data;
	});
  	var service = {
	    getAllProjects: function() {
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

	// Projects states
	$stateProvider
	.state('home.projects', {
		template: "<ui-view />",
		controller: function($state) {
			$state.go('.list');
		}
	})
	.state('home.projects.list', {
		component: 'projects',
		url: '^/projects',
		resolve: {
		    projects: function(ProjectsService, $transition$) {
		      	return ProjectsService.getAllProjects();
		    }
	    }
	})
	.state('home.projects.detail', {
		url : '^/projects/detail/{project}',
		resolve: {
		    project: function(ProjectsService, $transition$) {
		      	return ProjectsService.getProject($transition$.params().project);
		    }
	    },
	    controller: function($state, project) {
	    	switch(project.type) {
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
	.state('home.projects.detail.funded', {
		templateUrl: 'projects-list/detail-funded.template.html',
		controller: function($scope, project) {
			$scope.project = project;
		}
	})
	.state('home.projects.detail.completed', {
		templateUrl: 'projects-list/detail-completed.template.html',
		controller: function($scope, project) {
			$scope.project = project;
		}
	})
	.state('home.projects.detail.needfunding', {
		templateUrl: 'projects-list/detail-need-funding.template.html',
		controller: 'detailNeedFunding'
	})
}]);
