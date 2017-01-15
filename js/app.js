// Define the `fairBnB` module
var fairBnB = angular.module('fairBnB', ['ui.bootstrap', 'newsList', 'discussionList', 'projectsList', 'tabsCtrle']);


// Define the `PhoneListController` controller on the `fairBnB` module
fairBnB.controller('PageController', function PageController($scope) {
	$scope.user = {
		name: 'Pasquale Muscettola',
		username: 'polenta',
		role: 'guest',
		isAdmin: function() {
			return this.role == 'admin';
		},
		isGuest: function() {
			return this.role == 'guest';
		}
	};
});