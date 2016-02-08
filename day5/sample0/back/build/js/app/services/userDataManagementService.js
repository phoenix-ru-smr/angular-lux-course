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
