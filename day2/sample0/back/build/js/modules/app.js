/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../controllers/userctrl.ts"/>
var app;
(function (app) {
    angular.module("app", []).controller("UserCtrl", app.UserCtrl);
})(app || (app = {}));
