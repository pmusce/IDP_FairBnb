angular.
  module('fairBnB').
  component('newsList', {
    templateUrl: '../views/news-list.template.html',
    controller: function NewsListController($http) {
      var self = this;

      $http.get('../data/news.json').then(function(response) {
        self.news = response.data;
      });
      
    }
  });