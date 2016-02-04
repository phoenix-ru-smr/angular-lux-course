/// <reference path="../../typings/angularjs/angular.d.ts"/>
var app;
(function (app) {
    "use strict";
    var UserCtrl = (function () {
        function UserCtrl($scope) {
            this.$scope = $scope;
            this.users = [
                new app.User(1),
                new app.User(2),
                new app.User(3),
                new app.User(4),
                new app.User(5),
                new app.User(6),
                new app.User(7),
                new app.User(8),
                new app.User(9),
                new app.User(10),
                new app.User(11),
                new app.User(12),
                new app.User(13),
                new app.User(14),
                new app.User(15)
            ];
            this.cnt = this.users.length;
            this.initSelections();
        }
        UserCtrl.prototype.toggleAdmin = function () {
            if (this.selectedUser) {
                this.selectedUser.setAdmin(true);
                this.initSelections();
            }
        };
        UserCtrl.prototype.toggleUser = function () {
            if (this.selectedAdmin) {
                this.selectedAdmin.setAdmin(false);
                this.initSelections();
            }
        };
        UserCtrl.prototype.initSelections = function () {
            this.selectedAdmin = this.users.filter(function (item) { return item.isAdmin(); })[0];
            this.selectedUser = this.users.filter(function (item) { return !item.isAdmin(); })[0];
        };
        UserCtrl.prototype.addUser = function (id, name, surname, isEdit) {
            if (isEdit) {
                var found = this.users.filter(function (item) { return item.id == id; });
                if (found.length > 0) {
                    found[0].name = name;
                    found[0].surname = surname;
                    this.selectedUser = found[0];
                }
            }
            else {
                this.cnt = this.cnt + 1;
                var u = new app.User(this.cnt, name, surname);
                this.users.push(u);
                if (angular.isUndefined(this.selectedUser)) {
                    this.selectedUser = u;
                }
            }
        };
        UserCtrl.prototype.deleteUser = function (user) {
            console.log(JSON.stringify(user));
            if (user) {
                var del = this.users.filter(function (u) { return u.id == user.id; });
                if (del.length > 0) {
                    var idx = this.users.indexOf(del[0]);
                    this.users.splice(idx, 1);
                    this.initSelections();
                }
            }
        };
        return UserCtrl;
    })();
    app.UserCtrl = UserCtrl;
})(app || (app = {}));

var app;
(function (app) {
    "use strict";
    function UserAdminFilter() {
        return function (items, flag) {
            return items.filter(function (item) { return (flag && item.isAdmin()) || (!flag && !item.isAdmin()); });
        };
    }
    app.UserAdminFilter = UserAdminFilter;
})(app || (app = {}));

var app;
(function (app) {
    'use strict';
    var User = (function () {
        function User(_id, name, surname) {
            this._id = _id;
            this.name = name;
            this.surname = surname;
            this.id = _id;
            this.admin = false;
            if (angular.isUndefined(this.name)) {
                this.name = 'name' + _id;
            }
            if (angular.isUndefined(this.surname)) {
                this.surname = 'surname' + _id;
            }
        }
        User.prototype.fullname = function () {
            return this.name + ' ' + this.surname;
        };
        User.prototype.isAdmin = function () {
            return this.admin;
        };
        User.prototype.setAdmin = function (_admin) {
            this.admin = _admin;
        };
        return User;
    })();
    app.User = User;
})(app || (app = {}));

/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../controllers/userctrl.ts"/>
var app;
(function (app) {
    angular
        .module("app", [])
        .controller("UserCtrl", app.UserCtrl)
        .filter("UserAdminFilter", app.UserAdminFilter);
})(app || (app = {}));
