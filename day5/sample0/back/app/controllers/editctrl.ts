/// <reference path="../../typings/angularjs/angular.d.ts"/>

module app {
    "use strict";
    export class EditCtrl {
        private user: User;
        private back: string;
        private form: ng.IFormController;

        // https://toddmotto.com/angular-js-dependency-injection-annotation-process
        static $inject = ['$scope', 'UserService', 'flow', '$routeParams', '$location', '$q'];

        constructor(private $scope: ng.IScope, private userService: UserService, public flow: FlowModel,
            public $routeParams: ng.route.IRouteParamsService,
            private $location: ng.ILocationService,
            private $q: ng.IQService) {
            this.user = userService.getUser(this.$routeParams['id']);
            //  console.log(this.$routeParams);
            this.back = this.$routeParams['back'];
            $scope.$watch('ctrl.form', this.attachValidators.bind(this));
        }

        public save(): void {
            this.userService.edit(this.user);
            this.$location.url(this.back);
        }
        private attachValidators(): void {
            //  console.log(this.form);
            this.form['fname'].$asyncValidators.unique = (modelValue, viewValue) => {

                var u: User = new User(this.user.id, viewValue, this.form['ssurname'].$viewValue, this.user.admin);
                return this.userService.existsAnother(u).then((exists: boolean) => {
                    if (exists) {
                        if (!angular.isDefined(this.form['ssurname'].$error['unique'])) {
                            this.form['ssurname'].$error['unique'] = true;
                        }
                        return this.$q.reject('exists');
                    }
                    if (this.form['ssurname'].$error['unique']) {
                        this.form['ssurname'].$validate();
                    }
                });
            }
            this.form['ssurname'].$asyncValidators.unique = (modelValue, viewValue) => {
                var u: User = new User(this.user.id, this.form['fname'].$viewValue, viewValue, this.user.admin);
                return this.userService.existsAnother(u).then((exists: boolean) => {
                    if (exists) {
                        if (!angular.isDefined(this.form['fname'].$error['unique'])) {
                            this.form['fname'].$error['unique'] = true;
                        }
                        return this.$q.reject('exists');
                    }
                    if (this.form['fname'].$error['unique']) {
                        this.form['fname'].$validate();
                    }
                });
            }
        }

    }

}
