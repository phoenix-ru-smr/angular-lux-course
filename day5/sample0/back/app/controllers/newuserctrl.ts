/// <reference path="../../typings/angularjs/angular.d.ts"/>

module app{
  "use strict";
   export class NewUserCtrl {
     private user: User;
     private form: ng.IFormController;
// https://toddmotto.com/angular-js-dependency-injection-annotation-process
     static $inject = ['UserService', 'flow'];

     constructor(private userService: UserService, public flow: FlowModel,
     public $routeParams: ng.route.IRouteParamsService,
   private $location: ng.ILocationService) {
       this.user = new User(undefined, '','', false);
     }

     public save(): void {
       this.userService.create(this.user);
       this.$location.url("/odminka");
     }


  }

}
