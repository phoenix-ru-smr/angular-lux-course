/// <reference path="../../typings/angularjs/angular.d.ts"/>

module app{
  "use strict";
   export class EditCtrl {
     private user: User;
// https://toddmotto.com/angular-js-dependency-injection-annotation-process
     static $inject = ['UserService', 'flow'];

     constructor(private userService: UserService, public flow: FlowModel,
     public $routeParams: ng.route.IRouteParamsService,
   private $location: ng.ILocationService) {
       this.user = userService.getUser(this.$routeParams['id']);
     }

     public save(): void {
       this.userService.edit(this.user);
       this.$location.url("/odminka");
     }


  }

}
