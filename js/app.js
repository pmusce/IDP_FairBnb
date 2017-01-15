// Define the `fairBnB` module
var fairBnB = angular.module('fairBnB', ['ui.bootstrap', 'newsList', 'discussionList', 'projectsList', 'tabsCtrle']);



fairBnB.factory('user', [function() {
  	return {
        name: 'Pasquale Muscettola',
        username: 'polenta',
        role: 'admin',
        isAdmin: function() {
            return this.role == 'admin';
        },
        isGuest: function() {
            return this.role == 'guest';
        },
        switchRole: function() {
            this.role = this.oppositeRole().toLowerCase();
        },
        oppositeRole: function() {
            if (this.role == 'host')
                return 'Admin';
            if (this.role == 'admin')
                return 'Host';
            console.error("Invalid user role");
        }
    };
}]);

// Define the `PhoneListController` controller on the `fairBnB` module
fairBnB.controller('PageController', function PageController($scope, user) {
    $scope.user = user;
});

