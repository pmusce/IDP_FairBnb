angular.
module('newsList').
component('newsList', {
  templateUrl: 'news-list/news-list.template.html',
  controller: function NewsListController($scope, $http, user) {
    this.user = user;
    var self = this;

    $http.get('../data/news.json').then(function(response) {
      self.news = response.data;
      self.user.unread = self.news.reduce(function (total, current) {
        if (!current.read) {
          return total + 1;
        }
        return total;
      }, 0);

      self.categories = self.news.reduce(function (acc, curr) {
        if(acc.indexOf(curr.type) === -1) {
          return acc.concat(curr.type);
        }
        return acc
      }, []);
    });

    $scope.newsComparator = function(v1, v2) {
      if (v1.read !== v2.read) {
        return (v1.read) ? -1 : 1;
      }
      return (v1.date < v2.date) ? -1 : 1;
    };
  }
});