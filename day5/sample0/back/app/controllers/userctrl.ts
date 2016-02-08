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

     public edit(id, back): void {
        this.$location.url("/user/" + id + "?back=" + back);
     }

     public create(back): void {
        this.$location.url("/new/?back=" + back);
     }

     public toggleAdmin(user: User): void {
       this.userService.toggleAdmin(user);
     }

     public add(): void {
       this.userService.create(new User(undefined, 'lalala', 'LALALA', false));
     }


     public deleteUser(user: User): void {
       this.userService.deleteUser(user);
     }
  }

}
