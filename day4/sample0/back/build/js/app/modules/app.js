/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../controllers/userctrl.ts"/>
var app;
(function (app) {
    angular
        .module("app", [])
        .service("UserService", app.UserService)
        .controller("UserCtrl", app.UserCtrl)
        .filter("UserAdminFilter", app.UserAdminFilter);
})(app || (app = {}));
