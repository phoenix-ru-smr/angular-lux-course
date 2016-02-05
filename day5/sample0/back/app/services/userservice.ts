module app {
  'use strict'

  export class UserService {
    private users: Array<User>;
    private selectedUser: User;
    private selectedAdmin: User;

// https://toddmotto.com/angular-js-dependency-injection-annotation-process
    static $inject = ['UserDataManagementService'];

    constructor(private userCRUD: UserDataManagementService) {
      this.users = [];
      this.reloadUsers();
    }

    public reloadUsers(): void {
      this.userCRUD.getUsers()
      .then((data: User[]) => {
        this.users = data;
        this.initSelections();
      });
    }


   public toggleAdmin(user: User): void {
      user = this.findUser(user);
      if (user) {
        this.userCRUD.updateUser(user.toggleAdmin())
          .then((u: User) => {
            user.set(u);
            this.initSelections();
            if (user.admin) {
              this.selectedAdmin = user;
            } else {
              this.selectedUser = user;
            }
          });
      }
    }

    private findUser(user: User): User {
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

    public addUser(id: number, name: string, surname: string, isEdit: boolean): void {
      if (isEdit) {
        console.log('update user:' + JSON.stringify(new User(id, name, surname)));
        var found = this.findUser(new User(id));
        if (found) {
          this.userCRUD.updateUser(new User(id, name, surname, found.admin))
            .then((u: User)=>{
              found.set(u);
              this.selectedUser = found;
            });
       }

      } else {
        console.log('create new user:' + JSON.stringify(new User(0, name, surname, false)));
        this.userCRUD.createUser(new User(0, name, surname, false))
          .then((u: User)=>{
             this.users.push(u);
             this.selectedUser = u;
           });
     }
    }

    public deleteUser(user: User): void {
      console.log('deleting:' + JSON.stringify(user));
      if (user) {
        var del = this.findUser(user);
        if (del) {
          this.userCRUD.deleteUser(del)
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
