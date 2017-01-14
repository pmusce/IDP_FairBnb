angular.
	module('discussionList').
  component('discussionList', {
    templateUrl: 'coop-disc\coop-disc.template.html',
    controller: function NewsListController($http) {
      var self = this;

      $http.get('../data/news.json').then(function(response) {
        self.news = response.data;
      });

    }
  });
