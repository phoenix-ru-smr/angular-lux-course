/// <reference path="../../typings/angularjs/angular.d.ts"/>
var app;
(function (app) {
    "use strict";
    var EditCtrl = (function () {
        function EditCtrl(userService, flow, $routeParams, $location) {
            this.userService = userService;
            this.flow = flow;
            this.$routeParams = $routeParams;
            this.$location = $location;
            this.user = userService.getUser(this.$routeParams['id']);
        }
        EditCtrl.prototype.save = function () {
            this.userService.edit(this.user);
            this.$location.url("/odminka");
        };
        // https://toddmotto.com/angular-js-dependency-injection-annotation-process
        EditCtrl.$inject = ['UserService', 'flow'];
        return EditCtrl;
    })();
    app.EditCtrl = EditCtrl;
})(app || (app = {}));

/// <reference path="../../typings/angularjs/angular.d.ts"/>
var app;
(function (app) {
    "use strict";
    var NewUserCtrl = (function () {
        function NewUserCtrl(userService, flow, $routeParams, $location) {
            this.userService = userService;
            this.flow = flow;
            this.$routeParams = $routeParams;
            this.$location = $location;
            this.user = new app.User(undefined, '', '', false);
        }
        NewUserCtrl.prototype.save = function () {
            this.userService.create(this.user);
            this.$location.url("/odminka");
        };
        // https://toddmotto.com/angular-js-dependency-injection-annotation-process
        NewUserCtrl.$inject = ['UserService', 'flow'];
        return NewUserCtrl;
    })();
    app.NewUserCtrl = NewUserCtrl;
})(app || (app = {}));

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
    var FlowModel = (function () {
        function FlowModel() {
            this.users = [];
            this.selectedUser = undefined;
            this.selectedAdmin = undefined;
        }
        FlowModel.prototype.findUser = function (user) {
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
        return FlowModel;
    })();
    app.FlowModel = FlowModel;
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
            this.userCRUD.getUsers()
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

/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../controllers/userctrl.ts"/>
var app;
(function (app) {
    angular
        .module("app", ['ngRoute', 'ngMessages'])
        .service("flow", app.FlowModel)
        .factory('UserDataManagementService', ['$http', function ($http) {
            return new app.UserDataManagementService($http);
        }])
        .factory('UserService', ['UserDataManagementService', 'flow', function (userCRUD, flow) {
            return new app.UserService(userCRUD, flow);
        }])
        .controller("UserCtrl", ['UserService', 'flow', '$location', app.UserCtrl])
        .controller("EditCtrl", ['UserService', 'flow', '$routeParams', '$location', app.EditCtrl])
        .controller("NewUserCtrl", ['UserService', 'flow', '$routeParams', '$location', app.NewUserCtrl])
        .filter("UserAdminFilter", app.UserAdminFilter)
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider.when("/odminka", {
                templateUrl: "templates/odminka.html",
                controller: "UserCtrl",
                controllerAs: 'ctrl'
            })
                .when("/user/:id", {
                templateUrl: "templates/edit.html",
                controller: "EditCtrl",
                controllerAs: 'ctrl'
            })
                .when("/new/", {
                templateUrl: "templates/new.html",
                controller: "NewUserCtrl",
                controllerAs: 'ctrl'
            }).otherwise({
                redirectTo: "/"
            });
        }]);
})(app || (app = {}));
