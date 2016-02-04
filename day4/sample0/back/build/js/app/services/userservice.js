var app;
(function (app) {
    'use strict';
    var UserService = (function () {
        function UserService(userCRUD) {
            this.userCRUD = userCRUD;
            this.users = [];
            this.reloadUsers();
        }
        UserService.prototype.reloadUsers = function () {
            var _this = this;
            this.userCRUD.getUsers()
                .then(function (data) {
                _this.users = data;
                _this.initSelections();
            });
        };
        UserService.prototype.toggleAdmin = function (user) {
            var _this = this;
            user = this.findUser(user);
            if (user) {
                this.userCRUD.updateUser(user.toggleAdmin())
                    .then(function (u) {
                    user.set(u);
                    _this.initSelections();
                    if (user.admin) {
                        _this.selectedAdmin = user;
                    }
                    else {
                        _this.selectedUser = user;
                    }
                });
            }
        };
        UserService.prototype.findUser = function (user) {
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
        UserService.prototype.initSelections = function () {
            this.selectedAdmin = this.users.filter(function (item) { return item.admin; })[0];
            this.selectedUser = this.users.filter(function (item) { return !item.admin; })[0];
        };
        UserService.prototype.addUser = function (id, name, surname, isEdit) {
            var _this = this;
            if (isEdit) {
                console.log('update user:' + JSON.stringify(new app.User(id, name, surname)));
                var found = this.findUser(new app.User(id));
                if (found) {
                    this.userCRUD.updateUser(new app.User(id, name, surname, found.admin))
                        .then(function (u) {
                        found.set(u);
                        _this.selectedUser = found;
                    });
                }
            }
            else {
                console.log('create new user:' + JSON.stringify(new app.User(0, name, surname, false)));
                this.userCRUD.createUser(new app.User(0, name, surname, false))
                    .then(function (u) {
                    _this.users.push(u);
                    _this.selectedUser = u;
                });
            }
        };
        UserService.prototype.deleteUser = function (user) {
            var _this = this;
            console.log('deleting:' + JSON.stringify(user));
            if (user) {
                var del = this.findUser(user);
                if (del) {
                    this.userCRUD.deleteUser(del)
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
        UserService.$inject = ['UserDataManagementService'];
        return UserService;
    })();
    app.UserService = UserService;
})(app || (app = {}));
