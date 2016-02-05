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
