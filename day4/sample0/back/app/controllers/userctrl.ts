/// <reference path="../../typings/angularjs/angular.d.ts"/>

module app{
  "use strict";
   export class UserCtrl {
     private users: Array<User>;
     private selectedUser: User;
     private selectedAdmin: User;
     private cnt: number;

     constructor(private $scope: ng.IScope, private $http: ng.IHttpService) {
       this.users = [];
       this.reloadUsers();
     }

     public reloadUsers(): void {
       this.$http.get("/api/users", {
                transformResponse: function (data, headers) {
                  console.log("users to transform: " + JSON.stringify(data));
                  data = JSON.parse(data);
                    var a = [];
                    for (var i = 0; i < data.length; i++) {
                      a.push(User.fromJSON(data[i]))
                    }
                    return a;
                    // return data.map((u: User) => {return User.fromJSON(u);});
                }
            })
          .then((data: any) => {
            console.log("got user data: " + JSON.stringify(data));
            this.users = data.data;
            this.initSelections();
          }, (error) => {console.log(error)});
     }

     public toggleAdmin(user: User): void {
       user = this.findUser(user);
       if (user) {
         this.$http.put("/api/users/" + user.id, user.toggleAdmin(), {
                  transformResponse: this.transformUser})
          .then((u: any)=>{
              user.set(u.data);
              this.initSelections();
          }, (error) => {console.log(error)});

       }
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

     private initSelections(): void {
       this.selectedAdmin = this.users.filter(item => item.admin)[0];
       this.selectedUser = this.users.filter(item => !item.admin)[0];
     }

     private transformUser(data: any, headers: any): User {
       console.log("tr got user data: " + JSON.stringify(data));
       data = User.fromJSON(JSON.parse(data));
       return data;
     }

     public addUser(id: number, name: string, surname: string, isEdit: boolean): void {
       if (isEdit) {
         console.log('update user:' + JSON.stringify(new User(id, name, surname)));
        var found = this.findUser(new User(id));
        if (found) {
          this.$http.put("/api/users/" + found.id, new User(id, name, surname, found.admin), {
                   transformResponse: this.transformUser})
           .then((u: any)=>{
               u = u.data;
               found.set(u.data);
               this.selectedUser = found;
           }, (error) => {console.log(error)});
        }

       } else {
         console.log('create new user:' + JSON.stringify(new User(0, name, surname, false)));
         this.$http.post("/api/users/", new User(0, name, surname, false), {
                  transformResponse: this.transformUser})
          .then((u: any)=>{
              u = u.data;
              this.users.push(u);
              this.selectedUser = u;
          }, (error) => {console.log(error)});
      }
     }

     public deleteUser(user: User): void {
       console.log('deleting:' + JSON.stringify(user));
       if (user) {
         var del = this.findUser(user);
         if (del) {
           this.$http.delete("/api/users/" + del.id)
            .then((u: any)=>{
              console.log("got on delete: " + JSON.stringify(u));
              var idx = this.users.indexOf(del);
              this.users.splice(idx, 1);
              this.initSelections();
            }, (error) => {console.log(error)});
         }
       }
     }
  }

}
