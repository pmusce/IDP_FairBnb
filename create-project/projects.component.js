angular.
	module('projectList').
  component('projectList', {
    templateUrl: 'create-project/projects.template.html',
    controller: function projectListController($http, user) {
      this.user = user;
      var self = this;

      $http.get('../data/projects.json').then(function(response) {
        self.projects = response.data;
        self.user.projectunread = self.projects.reduce(function (total, current) {
          if (!current.read) {
            return total + 1;
          }
          return total;
        }, 0);

        self.categories = self.projects.reduce(function (acc, curr) {
          if(acc.indexOf(curr.type) === -1) {
            return acc.concat(curr.type);
          }
          return acc
        }, []);
      });

    }
  });
