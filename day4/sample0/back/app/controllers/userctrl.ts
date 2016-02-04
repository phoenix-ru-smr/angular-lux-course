/// <reference path="../../typings/angularjs/angular.d.ts"/>

module app{
  "use strict";

   export class UserCtrl {
     private users: Array<User>;
     private selectedUser: User;
     private selectedAdmin: User;
     private cnt: number;

     constructor(private $scope: ng.IScope) {


       this.users =  [
         new User(1),
         new User(2),
         new User(3),
         new User(4),
         new User(5),
         new User(6),
         new User(7),
         new User(8),
         new User(9),
         new User(10),
         new User(11),
         new User(12),
         new User(13),
         new User(14),
         new User(15)
        ];
        this.cnt = this.users.length;
        this.initSelections();
     }

     public toggleAdmin(): void {
       if (this.selectedUser) {
         this.selectedUser.setAdmin(true);
         this.initSelections();
       }
     }

     public toggleUser(): void {
       if (this.selectedAdmin) {
         this.selectedAdmin.setAdmin(false);
         this.initSelections();
       }
     }

     private initSelections(): void {
       this.selectedAdmin = this.users.filter(item => item.isAdmin())[0];
       this.selectedUser = this.users.filter(item => !item.isAdmin())[0];
     }

     public addUser(id: number, name: string, surname: string, isEdit: boolean): void {
       if (isEdit) {
        var found = this.users.filter(item => item.id == id);
        if (found.length > 0) {
          found[0].name = name;
          found[0].surname = surname;
          this.selectedUser = found[0];
        }
       } else {
         this.cnt = this.cnt + 1;
         var u:User = new User(this.cnt, name, surname);
         this.users.push(u);
         if (angular.isUndefined(this.selectedUser)) {
           this.selectedUser = u;
         }
      }
     }

     public deleteUser(user: User): void {
       console.log(JSON.stringify(user));
       if (user) {
         var del = this.users.filter(u => u.id == user.id);
         if (del.length > 0) {
           var idx = this.users.indexOf(del[0]);
           this.users.splice(idx, 1);
           this.initSelections();
         }
       }
     }
  }

}
