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
                        found.set(u);
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
        // https://toddmotto.com/angular-js-dependency-injection-annotation-process
        UserCtrl.$inject = ['$scope', '$http'];
        return UserCtrl;
    })();
    app.UserCtrl = UserCtrl;
})(app || (app = {}));
