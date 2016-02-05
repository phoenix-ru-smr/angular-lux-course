/// <reference path="../../typings/angularjs/angular.d.ts"/>

module app{
  "use strict";
   export class UserCtrl {

// https://toddmotto.com/angular-js-dependency-injection-annotation-process
     static $inject = ['UserService'];

     constructor(public userService: UserService) {
       this.userService.reloadUsers();
     }

     public toggleAdmin(user: User): void {
       this.userService.toggleAdmin(user);
     }

     public addUser(id: number, name: string, surname: string, isEdit: boolean): void {
          this.userService.addUser(id, name, surname, isEdit);
     }

     public deleteUser(user: User): void {
       this.userService.deleteUser(user);
     }
  }

}
