angular.
	module('discussionList').
  component('discussionList', {
    templateUrl: 'coop-disc/coop-disc.template.html',
    controller: function discussionListController($http) {
      var self = this;

      $http.get('../data/coop-disc.json').then(function(response) {
        self.discussions = response.data;
      });

    }
  });
