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

var app;
(function (app) {
    'use strict';
    var UserDataManagementService = (function () {
        function UserDataManagementService($http) {
            this.$http = $http;
        }
        UserDataManagementService.prototype.getUsers = function () {
            return this.$http.get("/api/users", {
                transformResponse: function (data, headers) {
                    data = JSON.parse(data);
                    var a = [];
                    for (var i = 0; i < data.length; i++) {
                        a.push(app.User.fromJSON(data[i]));
                    }
                    return a;
                }
            })
                .then(function (data) {
                return data.data;
            });
        };
        UserDataManagementService.prototype.updateUser = function (user) {
            return this.$http.put("/api/users/" + user.id, user, {
                transformResponse: this.transformUser })
                .then(function (u) {
                return u.data;
            }, function (error) { console.log(error); });
        };
        UserDataManagementService.prototype.createUser = function (user) {
            return this.$http.post("/api/users/", user, {
                transformResponse: this.transformUser })
                .then(function (u) {
                return u.data;
            }, function (error) { console.log(error); });
        };
        UserDataManagementService.prototype.transformUser = function (data, headers) {
            return app.User.fromJSON(JSON.parse(data));
        };
        UserDataManagementService.prototype.deleteUser = function (user) {
            return this.$http.delete("/api/users/" + user.id)
                .then(function (u) { }, function (error) { console.log(error); });
        };
        // https://toddmotto.com/angular-js-dependency-injection-annotation-process
        UserDataManagementService.$inject = ['$http'];
        return UserDataManagementService;
    })();
    app.UserDataManagementService = UserDataManagementService;
})(app || (app = {}));

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

/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../controllers/userctrl.ts"/>
var app;
(function (app) {
    angular
        .module("app", [])
        .factory('UserDataManagementService', ['$http', function ($http) {
            return new app.UserDataManagementService($http);
        }])
        .factory('UserService', ['UserDataManagementService', function (userCRUD) {
            return new app.UserService(userCRUD);
        }])
        .controller("UserCtrl", app.UserCtrl)
        .filter("UserAdminFilter", app.UserAdminFilter);
})(app || (app = {}));
