module app{
  'use strict';
   export class FlowModel {
     public users: User[] = [];
     public selectedUser: User = undefined;
     public selectedAdmin: User = undefined;
     constructor() {
     }

     public findUser(user: User): User {
       if (user) {
         var found = this.users.filter(item => item.id == user.id);
         if (found.length > 0) {
           return found[0];
         } else {
           return undefined;
         }
       } else {
         return user;
       }

     }
   }
}
