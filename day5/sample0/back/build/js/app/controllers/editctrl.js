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
