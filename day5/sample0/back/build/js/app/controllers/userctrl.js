/// <reference path="../../typings/angularjs/angular.d.ts"/>
var app;
(function (app) {
    "use strict";
    var UserCtrl = (function () {
        function UserCtrl(userService) {
            this.userService = userService;
            this.userService.reloadUsers();
        }
        UserCtrl.prototype.toggleAdmin = function (user) {
            this.userService.toggleAdmin(user);
        };
        UserCtrl.prototype.addUser = function (id, name, surname, isEdit) {
            this.userService.addUser(id, name, surname, isEdit);
        };
        UserCtrl.prototype.deleteUser = function (user) {
            this.userService.deleteUser(user);
        };
        // https://toddmotto.com/angular-js-dependency-injection-annotation-process
        UserCtrl.$inject = ['UserService'];
        return UserCtrl;
    })();
    app.UserCtrl = UserCtrl;
})(app || (app = {}));
