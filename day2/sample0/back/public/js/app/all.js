/// <reference path="../../typings/angularjs/angular.d.ts"/>
var app;
(function (app) {
    "use strict";
    var UserCtrl = (function () {
        function UserCtrl($scope) {
            var _this = this;
            this.$scope = $scope;
            this.name = "Test";
            this.surname = "Hell";
            this.name1 = "Angular";
            this.surname1 = "Kills";
            this.name2 = "Beware of";
            this.surname2 = "evil programmers";
            var setFullName = function (old, newval) {
                _this.fullname = _this.name + ' ' + _this.surname;
            };
            $scope.$watch("ctrl.name2", this.setFullName.bind(this));
            $scope.$watch("ctrl.surname2", this.setFullName.bind(this));
            this.change();
            $scope.$watch("ctrl.name", setFullName);
            $scope.$watch("ctrl.surname", setFullName);
        }
        UserCtrl.prototype.change = function () {
            this.fullname1 = this.name1 + ' ' + this.surname1;
        };
        UserCtrl.prototype.setFullName = function (old, newval) {
            this.fullname2 = this.name2 + ' ' + this.surname2;
        };
        return UserCtrl;
    })();
    app.UserCtrl = UserCtrl;
})(app || (app = {}));

/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../controllers/userctrl.ts"/>
var app;
(function (app) {
    angular.module("app", []).controller("UserCtrl", app.UserCtrl);
})(app || (app = {}));
