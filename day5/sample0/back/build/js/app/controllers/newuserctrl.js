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
