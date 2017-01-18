angular.
module('projectsList')
.component('projectsList', {
	templateUrl: 'projects-list/projects-list.template.html',
	controller: function ProjectListController($scope, $uibModal) {
		$scope.projectType="my-projects";
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
	}
})
.component('needFunding', {
	templateUrl: 'projects-list/need-funding-projects.template.html',
	controller: function NeedFundingController($http) {
		var self = this;

		$http.get('../data/projects.json').then(function(response) {
			self.projects = response.data;
		});

	}
})
.component('funded', {
	templateUrl: 'projects-list/funded-projects.template.html',
	controller: function FundedController($http) {
		var self = this;

		$http.get('../data/funded.json').then(function(response) {
			self.projects = response.data;
		});

	}
})
.component('myProjects', {
	templateUrl: 'projects-list/my-projects-list.template.html',
	controller: function MyProjectsController($http) {
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
});
