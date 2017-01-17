angular.
module('newsList').
component('newsList', {
  templateUrl: 'news-list/news-list.template.html',
  controller: function NewsListController($scope, $http, user) {
    var self = this;
    this.user = user;
    this.news = [];
    $scope.countUnread = function() {
      self.user.unread = self.news.reduce(function (total, current) {
        if (!current.read) {
          return total + 1;
        }
        return total;
      }, 0);
      console.log(self.user.unread);
    };

    $http.get('../data/news.json').then(function(response) {
      self.news = response.data;
      $scope.countUnread();

      self.categories = self.news.reduce(function (acc, curr) {
        if(acc.indexOf(curr.type) === -1) {
          return acc.concat(curr.type);
        }
        return acc
      }, []);
    });

  }
});