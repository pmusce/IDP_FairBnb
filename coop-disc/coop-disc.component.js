angular.
module('discussionList').
component('discussionList', {
  templateUrl: 'coop-disc/coop-disc.template.html',
  controller: function discussionListController($http, $scope, $uibModal) {
    var self = this;
    $scope.detailOpened = 'false';

    $http.get('../data/coop-disc.json').then(function(response) {
      self.discussions = response.data;
    });

    $scope.createDiscussion = function() {
      $uibModal.open({
        animation: true,
        templateUrl: 'coop-disc/new-discuss.template.html',
        controller: 'NewDiscussionModalInstanceCtrl',
        controllerAs: '$ctrl'
      });
    };

    $scope.openDiscussion = function(discussion) {
      $scope.detailOpened = 'true';
    };
  }
})
.controller('NewDiscussionModalInstanceCtrl', function ($scope, user, $uibModalInstance, $state) {
  $scope.user = user;
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
.component('discussionDetail', {
  templateUrl: 'coop-disc/discussion-detail.template.html',
  controller: function discussionDetailController($http, $scope) {
    var self = this;
    $scope.detailOpened = 'false';
  }
});