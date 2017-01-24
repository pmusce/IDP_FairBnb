angular.
	module('navbar').
  component('navbar', {
    templateUrl: 'navbar/navbar.template.html',
    controller: function navbarController($uibModal, $scope, $http, user, LoginService) {
      $scope.user = user;

      $scope.login = function() {
        $uibModal.open({
          animation: true,
          templateUrl: 'login-modal.html',
          controller: 'LoginModalInstanceCtrl',
          controllerAs: '$ctrl'
        });
      };

      $scope.signup = function() {
        $uibModal.open({
          animation: true,
          templateUrl: 'signup-modal.html',
          controller: 'LoginModalInstanceCtrl',
          controllerAs: '$ctrl'
        });
      };
      $scope.logout = LoginService.logout; 
    }
  }
)
.controller('LoginModalInstanceCtrl', function ($scope, $uibModalInstance, $state, LoginService) {
  $scope.formSubmit = function() {
    LoginService.login($scope.username, $scope.password,
      function() {
        $scope.error = '';
        $scope.username = '';
        $scope.password = '';
        $uibModalInstance.close();
        $state.transitionTo('home.projects');
      }, function() {
        $scope.error = "Incorrect username/password !";
      });
  };

});
