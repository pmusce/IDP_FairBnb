angular.
	module('projectsList').
  component('projectsList', {
    templateUrl: 'projects-list/projects-list.template.html',
    controller: function ProjectListController($http) {
      var self = this;

      $http.get('../data/projects.json').then(function(response) {
        self.projects = response.data;
      });

    }
  })NaN;
