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
