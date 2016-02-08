/// <reference path="../../typings/angularjs/angular.d.ts"/>
var app;
(function (app) {
    "use strict";
    var EditCtrl = (function () {
        function EditCtrl($scope, userService, flow, $routeParams, $location, $q) {
            this.$scope = $scope;
            this.userService = userService;
            this.flow = flow;
            this.$routeParams = $routeParams;
            this.$location = $location;
            this.$q = $q;
            this.user = userService.getUser(this.$routeParams['id']);
            //  console.log(this.$routeParams);
            this.back = this.$routeParams['back'];
            $scope.$watch('ctrl.form', this.attachValidators.bind(this));
        }
        EditCtrl.prototype.save = function () {
            this.userService.edit(this.user);
            this.$location.url(this.back);
        };
        EditCtrl.prototype.attachValidators = function () {
            var _this = this;
            //  console.log(this.form);
            this.form['fname'].$asyncValidators.unique = function (modelValue, viewValue) {
                var u = new app.User(_this.user.id, viewValue, _this.form['ssurname'].$viewValue, _this.user.admin);
                return _this.userService.existsAnother(u).then(function (exists) {
                    if (exists) {
                        if (!angular.isDefined(_this.form['ssurname'].$error['unique'])) {
                            _this.form['ssurname'].$error['unique'] = true;
                        }
                        return _this.$q.reject('exists');
                    }
                    if (_this.form['ssurname'].$error['unique']) {
                        _this.form['ssurname'].$validate();
                    }
                });
            };
            this.form['ssurname'].$asyncValidators.unique = function (modelValue, viewValue) {
                var u = new app.User(_this.user.id, _this.form['fname'].$viewValue, viewValue, _this.user.admin);
                return _this.userService.existsAnother(u).then(function (exists) {
                    if (exists) {
                        if (!angular.isDefined(_this.form['fname'].$error['unique'])) {
                            _this.form['fname'].$error['unique'] = true;
                        }
                        return _this.$q.reject('exists');
                    }
                    if (_this.form['fname'].$error['unique']) {
                        _this.form['fname'].$validate();
                    }
                });
            };
        };
        // https://toddmotto.com/angular-js-dependency-injection-annotation-process
        EditCtrl.$inject = ['$scope', 'UserService', 'flow', '$routeParams', '$location', '$q'];
        return EditCtrl;
    })();
    app.EditCtrl = EditCtrl;
})(app || (app = {}));

/// <reference path="../../typings/angularjs/angular.d.ts"/>
var app;
(function (app) {
    "use strict";
    var NewUserCtrl = (function () {
        function NewUserCtrl($scope, userService, flow, $routeParams, $location, $q) {
            this.$scope = $scope;
            this.userService = userService;
            this.flow = flow;
            this.$routeParams = $routeParams;
            this.$location = $location;
            this.$q = $q;
            this.user = new app.User(undefined, '', '', false);
            this.back = this.$routeParams['back'];
            $scope.$watch('ctrl.form', this.attachValidators.bind(this));
        }
        NewUserCtrl.prototype.save = function () {
            this.userService.create(this.user);
            this.$location.url(this.back);
        };
        NewUserCtrl.prototype.attachValidators = function () {
            var _this = this;
            //  console.log(this.form);
            this.form['fname'].$asyncValidators.unique = function (modelValue, viewValue) {
                var u = new app.User(undefined, viewValue, _this.form['ssurname'].$viewValue, _this.user.admin);
                return _this.userService.existsAnother(u).then(function (exists) {
                    if (exists) {
                        if (!angular.isDefined(_this.form['ssurname'].$error['unique'])) {
                            _this.form['ssurname'].$error['unique'] = true;
                        }
                        return _this.$q.reject('exists');
                    }
                    if (_this.form['ssurname'].$error['unique']) {
                        _this.form['ssurname'].$validate();
                    }
                });
            };
            this.form['ssurname'].$asyncValidators.unique = function (modelValue, viewValue) {
                var u = new app.User(undefined, _this.form['fname'].$viewValue, viewValue, _this.user.admin);
                return _this.userService.existsAnother(u).then(function (exists) {
                    if (exists) {
                        if (!angular.isDefined(_this.form['fname'].$error['unique'])) {
                            _this.form['fname'].$error['unique'] = true;
                        }
                        return _this.$q.reject('exists');
                    }
                    if (_this.form['fname'].$error['unique']) {
                        _this.form['fname'].$validate();
                    }
                });
            };
        };
        // https://toddmotto.com/angular-js-dependency-injection-annotation-process
        NewUserCtrl.$inject = ['$scope', 'UserService', 'flow', '$routeParams', '$location', '$q'];
        return NewUserCtrl;
    })();
    app.NewUserCtrl = NewUserCtrl;
})(app || (app = {}));

var app;
(function (app) {
    'use strict';
    var PanelCtrl = (function () {
        function PanelCtrl() {
            console.log(this.title);
        }
        return PanelCtrl;
    })();
    app.PanelCtrl = PanelCtrl;
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

var app;
(function (app) {
    'use strict';
    function PanelDirective() {
        return {
            replace: true,
            transclude: true,
            restrict: 'E',
            templateUrl: 'templates/panel.html',
            scope: {
                title: '=',
                add: '&'
            },
            bindToController: true,
            controller: app.PanelCtrl,
            controllerAs: 'pc'
        };
    }
    app.PanelDirective = PanelDirective;
})(app || (app = {}));

var app;
(function (app) {
    'use strict';
    function UserDirective() {
        return {
            replace: true,
            transclude: true,
            restrict: 'E',
            templateUrl: 'templates/user.html'
        };
    }
    app.UserDirective = UserDirective;
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
        UserDataManagementService.prototype.getUsers = function (user) {
            return this.$http.get("/api/users" + (user ? '?name=' + user.name + '&surname=' + user.surname : ''), {
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
        .controller("EditCtrl", ['$scope', 'UserService', 'flow', '$routeParams', '$location', '$q', app.EditCtrl])
        .controller("NewUserCtrl", ['$scope', 'UserService', 'flow', '$routeParams', '$location', '$q', app.NewUserCtrl])
        .directive('user', [app.UserDirective])
        .directive('panel', [app.PanelDirective])
        .filter("UserAdminFilter", app.UserAdminFilter)
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider.when("/odminka", {
                templateUrl: "templates/odminka.html",
                controller: "UserCtrl",
                controllerAs: 'ctrl'
            }).when("/user/:id", {
                templateUrl: "templates/edit.html",
                controller: "EditCtrl",
                controllerAs: 'ctrl'
            }).when("/new", {
                templateUrl: "templates/new.html",
                controller: "NewUserCtrl",
                controllerAs: 'ctrl'
            }).when("/users", {
                templateUrl: "templates/users.html",
                controller: "UserCtrl",
                controllerAs: 'ctrl'
            }).otherwise({
                redirectTo: "/"
            });
        }]);
})(app || (app = {}));
