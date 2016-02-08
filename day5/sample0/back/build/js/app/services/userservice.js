var app;
(function (app) {
    'use strict';
    var UserService = (function () {
        function UserService(userCRUD, flow) {
            this.userCRUD = userCRUD;
            this.flow = flow;
            this.reloadUsers();
        }
        UserService.prototype.getUser = function (id) {
            return this.flow.findUser(new app.User(id));
        };
        UserService.prototype.reloadUsers = function () {
            var _this = this;
            this.userCRUD.getUsers(undefined)
                .then(function (data) {
                _this.flow.users = data;
                _this.initSelections();
            });
        };
        UserService.prototype.toggleAdmin = function (user) {
            var _this = this;
            user = this.flow.findUser(user);
            if (user) {
                this.userCRUD.updateUser(user.toggleAdmin())
                    .then(function (u) {
                    user.set(u);
                    _this.initSelections();
                    if (user.admin) {
                        _this.flow.selectedAdmin = user;
                    }
                    else {
                        _this.flow.selectedUser = user;
                    }
                });
            }
        };
        UserService.prototype.initSelections = function () {
            this.flow.selectedAdmin = this.flow.users.filter(function (item) { return item.admin; })[0];
            this.flow.selectedUser = this.flow.users.filter(function (item) { return !item.admin; })[0];
        };
        UserService.prototype.edit = function (user) {
            var _this = this;
            console.log('update user:' + JSON.stringify(user));
            var found = this.flow.findUser(user);
            if (found) {
                this.userCRUD.updateUser(new app.User(user.id, user.name, user.surname, found.admin))
                    .then(function (u) {
                    found.set(u);
                    _this.flow.selectedUser = found;
                });
            }
        };
        UserService.prototype.existsAnother = function (user) {
            return this.userCRUD.getUsers(user).then(function (users) {
                if (users.length > 1) {
                    return true;
                }
                else if (users.length == 1) {
                    var exp = angular.isUndefined(user.id) || (user.id != users[0].id);
                    return exp;
                }
                else {
                    return false;
                }
            });
        };
        UserService.prototype.create = function (user) {
            var _this = this;
            console.log('create new user:' + JSON.stringify(user));
            this.userCRUD.createUser(user)
                .then(function (u) {
                _this.flow.users.push(u);
                _this.flow.selectedUser = u;
            });
        };
        UserService.prototype.deleteUser = function (user) {
            var _this = this;
            console.log('deleting:' + JSON.stringify(user));
            if (user) {
                var del = this.flow.findUser(user);
                if (del) {
                    this.userCRUD.deleteUser(del)
                        .then(function (u) {
                        console.log("got on delete: " + JSON.stringify(u));
                        var idx = _this.flow.users.indexOf(del);
                        _this.flow.users.splice(idx, 1);
                        _this.initSelections();
                    }, function (error) { console.log(error); });
                }
            }
        };
        // https://toddmotto.com/angular-js-dependency-injection-annotation-process
        UserService.$inject = ['UserDataManagementService', 'flow'];
        return UserService;
    })();
    app.UserService = UserService;
})(app || (app = {}));
