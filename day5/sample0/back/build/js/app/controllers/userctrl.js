/// <reference path="../../typings/angularjs/angular.d.ts"/>
var app;
(function (app) {
    "use strict";
    var UserCtrl = (function () {
        function UserCtrl(userService, flow, $location) {
            this.userService = userService;
            this.flow = flow;
            this.$location = $location;
        }
        UserCtrl.prototype.edit = function () {
            this.$location.url("/user/" + this.flow.selectedUser.id);
        };
        UserCtrl.prototype.create = function () {
            this.$location.url("/new/");
        };
        UserCtrl.prototype.toggleAdmin = function (user) {
            this.userService.toggleAdmin(user);
        };
        UserCtrl.prototype.deleteUser = function (user) {
            this.userService.deleteUser(user);
        };
        // https://toddmotto.com/angular-js-dependency-injection-annotation-process
        UserCtrl.$inject = ['UserService', 'flow', '$location'];
        return UserCtrl;
    })();
    app.UserCtrl = UserCtrl;
})(app || (app = {}));
