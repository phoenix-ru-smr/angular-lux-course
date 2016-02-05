/// <reference path="../../typings/angularjs/angular.d.ts"/>

module app{
  "use strict";
   export class UserCtrl {

// https://toddmotto.com/angular-js-dependency-injection-annotation-process
     static $inject = ['UserService', 'flow', '$location'];

     constructor(private userService: UserService, public flow: FlowModel,
       private $location: ng.ILocationService
      ) {
     }

     public edit(): void {
        this.$location.url("/user/" + this.flow.selectedUser.id);
     }

     public create(): void {
        this.$location.url("/new/");
     }

     public toggleAdmin(user: User): void {
       this.userService.toggleAdmin(user);
     }


     public deleteUser(user: User): void {
       this.userService.deleteUser(user);
     }
  }

}
