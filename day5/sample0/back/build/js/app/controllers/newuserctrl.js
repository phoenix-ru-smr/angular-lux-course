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
