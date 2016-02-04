/// <reference path="../../typings/angularjs/angular.d.ts"/>
var app;
(function (app) {
    "use strict";
    var UserCtrl = (function () {
        function UserCtrl($scope, $http) {
            this.$scope = $scope;
            this.$http = $http;
            this.users = [];
            this.reloadUsers();
        }
        UserCtrl.prototype.reloadUsers = function () {
            var _this = this;
            this.$http.get("/api/users", {
                transformResponse: function (data, headers) {
                    console.log("users to transform: " + JSON.stringify(data));
                    data = JSON.parse(data);
                    var a = [];
                    for (var i = 0; i < data.length; i++) {
                        a.push(app.User.fromJSON(data[i]));
                    }
                    return a;
                    // return data.map((u: User) => {return User.fromJSON(u);});
                }
            })
                .then(function (data) {
                console.log("got user data: " + JSON.stringify(data));
                _this.users = data.data;
                _this.initSelections();
            }, function (error) { console.log(error); });
        };
        UserCtrl.prototype.toggleAdmin = function (user) {
            var _this = this;
            user = this.findUser(user);
            if (user) {
                this.$http.put("/api/users/" + user.id, user.toggleAdmin(), {
                    transformResponse: this.transformUser })
                    .then(function (u) {
                    user.set(u.data);
                    _this.initSelections();
                }, function (error) { console.log(error); });
            }
        };
        UserCtrl.prototype.findUser = function (user) {
            if (user) {
                var found = this.users.filter(function (item) { return item.id == user.id; });
                if (found.length > 0) {
                    return found[0];
                }
                else {
                    return undefined;
                }
            }
            else {
                return user;
            }
        };
        UserCtrl.prototype.initSelections = function () {
            this.selectedAdmin = this.users.filter(function (item) { return item.admin; })[0];
            this.selectedUser = this.users.filter(function (item) { return !item.admin; })[0];
        };
        UserCtrl.prototype.transformUser = function (data, headers) {
            console.log("tr got user data: " + JSON.stringify(data));
            data = app.User.fromJSON(JSON.parse(data));
            return data;
        };
        UserCtrl.prototype.addUser = function (id, name, surname, isEdit) {
            var _this = this;
            if (isEdit) {
                console.log('update user:' + JSON.stringify(new app.User(id, name, surname)));
                var found = this.findUser(new app.User(id));
                if (found) {
                    this.$http.put("/api/users/" + found.id, new app.User(id, name, surname, found.admin), {
                        transformResponse: this.transformUser })
                        .then(function (u) {
                        u = u.data;
                        found.set(u.data);
                        _this.selectedUser = found;
                    }, function (error) { console.log(error); });
                }
            }
            else {
                console.log('create new user:' + JSON.stringify(new app.User(0, name, surname, false)));
                this.$http.post("/api/users/", new app.User(0, name, surname, false), {
                    transformResponse: this.transformUser })
                    .then(function (u) {
                    u = u.data;
                    _this.users.push(u);
                    _this.selectedUser = u;
                }, function (error) { console.log(error); });
            }
        };
        UserCtrl.prototype.deleteUser = function (user) {
            var _this = this;
            console.log('deleting:' + JSON.stringify(user));
            if (user) {
                var del = this.findUser(user);
                if (del) {
                    this.$http.delete("/api/users/" + del.id)
                        .then(function (u) {
                        console.log("got on delete: " + JSON.stringify(u));
                        var idx = _this.users.indexOf(del);
                        _this.users.splice(idx, 1);
                        _this.initSelections();
                    }, function (error) { console.log(error); });
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
            return items.filter(function (item) { return (flag && item.admin) || (!flag && !item.admin); });
        };
    }
    app.UserAdminFilter = UserAdminFilter;
})(app || (app = {}));

var app;
(function (app) {
    'use strict';
    var User = (function () {
        function User(id, name, surname, admin) {
            if (name === void 0) { name = 'name' + id; }
            if (surname === void 0) { surname = 'surname' + id; }
            if (admin === void 0) { admin = false; }
            this.id = id;
            this.name = name;
            this.surname = surname;
            this.admin = admin;
        }
        User.prototype.fullname = function () {
            return this.name + ' ' + this.surname;
        };
        User.prototype.toggleAdmin = function () {
            return new User(this.id, this.name, this.surname, !this.admin);
        };
        User.fromJSON = function (a) {
            return new User(a.id, a.name, a.surname, a.admin);
        };
        User.prototype.set = function (v) {
            this.id = v.id;
            this.name = v.name;
            this.surname = v.surname;
            this.admin = v.admin;
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
