angular.
module('discussionList').
component('discussionList', {
  templateUrl: 'coop-disc/coop-disc.template.html',
  controller: function discussionListController($http, user, $scope, discussionsService, discussionDetailService, $uibModal) {
    var self = this;
    $scope.user = user;
    $scope.service = discussionDetailService;
    $scope.discussions = discussionsService;

    $scope.createDiscussion = function() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'coop-disc/new-discuss.template.html',
        controller: 'NewDiscussionModalInstanceCtrl',
        controllerAs: '$ctrl'
      });

      modalInstance.result.then(function (new_discussion) {
        discussionsService.push(new_discussion);
      });
    };

    $scope.openDiscussion = function(discussion) {
      $scope.service.discussion = discussion;
      $scope.service.detailOpened = 'true';
    };
  }
})
.controller('NewDiscussionModalInstanceCtrl', function ($scope, user, $uibModalInstance, $state) {
  $scope.user = user;
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.submit = function() {
    new_discussion = {
      author: user.username,
      usr_img: user.image,
      type: 'open',
      title: $scope.title,
      body: $scope.body
    }

    $uibModalInstance.close(new_discussion);
  };
})
.component('discussionDetail', {
  templateUrl: 'coop-disc/discussion-detail.template.html',
  controller: function discussionDetailController(discussionDetailService, $scope) {
    var self = this; 
    $scope.discussion = discussionDetailService.discussion;
    $scope.back = function() {
      discussionDetailService.detailOpened = 'false';
    }
  }
})
.component('subCommentList', {
  bindings: {
    comments: '='
  },
  templateUrl: 'coop-disc/sub-comment-list.template.html',
  controller: function subCommentListController() {
    console.log(this.comments);
  }
})
.factory('discussionsService', function($http) {
  self = this;
  self.discussions = [];

  $http.get('../data/coop-disc.json').then(function(response) {
      response.data.forEach(function (element) {
        self.discussions.push(element);
      });
  });
  
  return self.discussions;
})
.factory('discussionDetailService', function() {
  return {
    discussion: undefined,
    detailOpened: 'false'
  };
});