angular.
module('newsList').
component('newsList', {
  templateUrl: 'news-list/news-list.template.html',
  controller: function NewsListController($scope, $uibModal, $http, user) {
    var self = this;
    this.user = user;
    this.news = [];

    $scope.newsOpened = false;

    $scope.countUnread = function() {
      self.user.unread = self.news.reduce(function (total, current) {
        if (!current.read) {
          return total + 1;
        }
        return total;
      }, 0);
      console.log(self.user.unread);
    };

    $scope.createNews = function() {
      $uibModal.open({
          animation: true,
          templateUrl: 'create-news-modal.html',
          controller: 'CreateNewsModalInstanceCtrl',
          controllerAs: '$ctrl',
          size: 'lg',
          resolve: {
            project: function() {
              return $scope.project;
            }
          }
      });
    }

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

    $scope.openNews = function(news) {
      $scope.newsOpened = true;
      news.read=true; 
      $scope.countUnread();
      $scope.currentNews = news;
    }

    $scope.closeNews = function() {
      $scope.newsOpened = false;
    }
  }
})
.controller('CreateNewsModalInstanceCtrl', function ($scope, project, $uibModalInstance, $state) {
  $scope.project = project;
  $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
  };
});