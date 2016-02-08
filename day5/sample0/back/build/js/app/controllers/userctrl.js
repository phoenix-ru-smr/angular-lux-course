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
        UserCtrl.prototype.edit = function (id, back) {
            this.$location.url("/user/" + id + "?back=" + back);
        };
        UserCtrl.prototype.create = function (back) {
            this.$location.url("/new/?back=" + back);
        };
        UserCtrl.prototype.toggleAdmin = function (user) {
            this.userService.toggleAdmin(user);
        };
        UserCtrl.prototype.add = function () {
            this.userService.create(new app.User(undefined, 'lalala', 'LALALA', false));
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
