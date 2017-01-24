angular.
module('memberList').
component('memberList', {
  templateUrl: 'new-members/members.template.html',
  controller: function memberListController($http, user) {
    this.user = user;
    var self = this;

    $http.get('../data/users.json').then(function(response) {
      self.members = response.data;
      self.user.unread = self.members.reduce(function (total, current) {
        if (!current.read) {
          return total + 1;
        }
        return total;
      }, 0);

      self.categories = self.members.reduce(function (acc, curr) {
        if(acc.indexOf(curr.type) === -1) {
          return acc.concat(curr.type);
        }
        return acc
      }, []);
    });

  }
});