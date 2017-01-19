angular.
module('projectsList')
.component('projectsList', {
	templateUrl: 'projects-list/projects-list.template.html',
	controller: function ProjectListController($scope, $uibModal, projectDetailService) {
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

	    $scope.status = projectDetailService;
	}
})
.component('needFunding', {
	templateUrl: 'projects-list/need-funding-projects.template.html',
	controller: function NeedFundingController($http, $scope, projectDetailService) {
		var self = this;

		$scope.openSupport = function(project) {
			$scope.currentProject = project;
		}

		$http.get('../data/projects.json').then(function(response) {
			self.projects = response.data;
		});

	}
})
.component('funded', {
	templateUrl: 'projects-list/funded-projects.template.html',
	controller: function FundedController($http, $scope, projectDetailService) {
		var self = this;

		$http.get('../data/funded.json').then(function(response) {
			self.projects = response.data;
		});

		self.openDetail = function(project) {
			projectDetailService.project = project;
			projectDetailService.layout = 'detailFunded';
		};
	}
})
.component('myProjects', {
	templateUrl: 'projects-list/my-projects-list.template.html',
	controller: function MyProjectsController($http, $scope, projectDetailService) {
		var self = this;

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
.factory('projectDetailService', function() {
	self = this;

	return {
		project: undefined,
		layout: 'explore',
		type: "my-projects",
		goToList: function(type) {
			this.type = type;
			this.project = undefined;
			this.layout = 'explore';
		},
	};

});;
