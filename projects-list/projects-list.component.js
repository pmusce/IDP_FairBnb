angular.
module('projectsList')
.component('projects', {
	templateUrl: 'projects-list/projects-list.template.html',
	controller: function ProjectListController($scope, $uibModal, $http, user, projectDetailService) {
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

		$http.get('../data/projects.json').then(function(response) {
			self.projects = response.data;
		});

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
.component('myProjects', {
	templateUrl: 'projects-list/my-projects-list.template.html',
	controller: function MyProjectsController($http, $scope, MyProjectsService) {
		self = this;  	
	  	$http.get('../data/my-projects.json').then(function(response) {
			self.projects = response.data;
		});

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
.component('detailNeedFunding', {
	templateUrl: 'projects-list/detail-need-funding.template.html',
	controller: function DetailNeedFundingController($scope, $uibModal, user, projectDetailService) {
		$scope.myInterval = 5000;
		$scope.noWrapSlides = false;
		$scope.active = 0;
		$scope.user = user;
		
		$scope.project = projectDetailService.project;
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
				case "needfunding":
					$state.go(".needfunding");
					break;
			    default:
			        console.log("Porcoddio");
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
	})
}]);