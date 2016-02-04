module app {
  'use strict'

  export class UserDataManagementService {

// https://toddmotto.com/angular-js-dependency-injection-annotation-process
    static $inject = ['$http'];

    constructor(private $http: ng.IHttpService) {
    }

    public getUsers(): ng.IPromise<User[]> {
      return this.$http.get("/api/users", {
               transformResponse: function (data, headers) {
                 data = JSON.parse(data);
                   var a = [];
                   for (var i = 0; i < data.length; i++) {
                     a.push(User.fromJSON(data[i]))
                   }
                   return a;
               }
           })
         .then((data: any) => {
           return data.data;
         });
    }

    public updateUser(user: User): ng.IPromise<User> {
      return this.$http.put("/api/users/" + user.id, user, {
                transformResponse: this.transformUser})
         .then((u: any)=>{
             return u.data;
         }, (error) => {console.log(error)});
    }

    public createUser(user: User): ng.IPromise<User> {
      return this.$http.post("/api/users/", user, {
                transformResponse: this.transformUser})
         .then((u: any)=>{
             return u.data;
         }, (error) => {console.log(error)});
    }

    private transformUser(data: any, headers: any): User {
      return User.fromJSON(JSON.parse(data));
    }


    public deleteUser(user: User): ng.IPromise<void> {
        return  this.$http.delete("/api/users/" + user.id)
           .then((u: any)=>{}, (error) => {console.log(error)});
    }
}
}
