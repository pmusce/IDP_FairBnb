angular.
module('newsList').
component('newsList', {
  templateUrl: 'news-list/news-list.template.html',
  bindings: { news: '<' },
  controller: function NewsListController($scope, $uibModal, $http, NewsService, user) {

    var self = this;
    this.user = user;
    
    NewsService.unread = 0;

    $scope.newsOpened = false;

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

    $scope.openNews = function(news) {
      $scope.newsOpened = true;
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
})
.factory('NewsService', ['$http', function ($http) {
  var newsList = undefined;
  var service = {
    unread: 3,
    getAllNews: function() {
      if (!newsList) {
        newsList = $http.get('data/news.json', { cache: true }).then(function(resp) {
          service.updateUnread(resp.data);
          return resp.data;
        });
      }
      return newsList;
    },
    getNews: function(id) {
      function newsMatchesParam(person) {
        return news.id === id;
      }

      return service.getAllNews().then(function (people) {
        return newsList.find(newsMatchesParam)
      });
    },
    updateUnread: function(newsList) {
      this.unread = newsList.reduce(function(acc, curr) {
        if(!curr.read) {
          return acc + 1;
        }
        return acc;
      }, 0);
    }
  }

  return service;
}]);