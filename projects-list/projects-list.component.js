angular.
module('projectsList')
.component('projectsList', {
	templateUrl: 'projects-list/projects-list.template.html',
	controller: function ProjectListController($scope) {
		$scope.projectType="my-projects";
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

		$http.get('../data/projects.json').then(function(response) {
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
});
