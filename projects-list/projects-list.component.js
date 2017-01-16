angular.
module('projectsList').
com
component('projectsList', {
	templateUrl: 'projects-list/projects-list.template.html',
	controller: function ProjectListController($http) {
		var self = this;

		$http.get('../data/projects.json').then(function(response) {
			self.projects = response.data;
		});

	}
})
.component('myProjectsList', {
	templateUrl: 'projects-list/my-projects-list.template.html',
	controller: function MyProjectsListController($http) {
		var self = this;

		$http.get('../data/projects.json').then(function(response) {
			self.projects = response.data;
		});

	}
});
