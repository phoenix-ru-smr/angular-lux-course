module app {
  'use strict'

  export class UserService {
// https://toddmotto.com/angular-js-dependency-injection-annotation-process
    static $inject = ['UserDataManagementService', 'flow'];

    constructor(private userCRUD: UserDataManagementService, private flow: FlowModel) {
      this.reloadUsers();
    }

    public getUser(id: number): User {
      return this.flow.findUser(new User(id));
    }

    public reloadUsers(): void {
      this.userCRUD.getUsers(undefined)
      .then((data: User[]) => {
        this.flow.users = data;
        this.initSelections();
      });
    }


   public toggleAdmin(user: User): void {
      user = this.flow.findUser(user);
      if (user) {
        this.userCRUD.updateUser(user.toggleAdmin())
          .then((u: User) => {
            user.set(u);
            this.initSelections();
            if (user.admin) {
              this.flow.selectedAdmin = user;
            } else {
              this.flow.selectedUser = user;
            }
          });
      }
    }



    private initSelections(): void {
      this.flow.selectedAdmin = this.flow.users.filter(item => item.admin)[0];
      this.flow.selectedUser = this.flow.users.filter(item => !item.admin)[0];
    }

    public edit(user: User):void {
      console.log('update user:' + JSON.stringify(user));
      var found = this.flow.findUser(user);
      if (found) {
        this.userCRUD.updateUser(new User(user.id, user.name, user.surname, found.admin))
          .then((u: User)=>{
            found.set(u);
            this.flow.selectedUser = found;
          });
     }
    }

    public existsAnother(user: User): ng.IPromise<boolean> {
      return this.userCRUD.getUsers(user).then((users: User[]) =>{
        if (users.length > 1) {
          return true;
        } else if (users.length == 1) {
          var exp = angular.isUndefined(user.id) || (user.id != users[0].id);
          return exp;
        } else {
          return false;
        }
      });
    }

    public create(user: User): void {
      console.log('create new user:' + JSON.stringify(user));
      this.userCRUD.createUser(user)
        .then((u: User)=>{
           this.flow.users.push(u);
           this.flow.selectedUser = u;
         });
    }



    public deleteUser(user: User): void {
      console.log('deleting:' + JSON.stringify(user));
      if (user) {
        var del = this.flow.findUser(user);
        if (del) {
          this.userCRUD.deleteUser(del)
           .then((u: any)=>{
             console.log("got on delete: " + JSON.stringify(u));
             var idx = this.flow.users.indexOf(del);
             this.flow.users.splice(idx, 1);
             this.initSelections();
           }, (error) => {console.log(error)});
        }
      }
    }
 }
}
