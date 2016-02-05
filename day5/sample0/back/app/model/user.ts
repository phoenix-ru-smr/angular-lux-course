module app{
  'use strict';

  export class User {
    constructor(
      public id: number,
      public name: string = 'name' + id,
      public surname: string = 'surname' + id,
      public admin: boolean = false) {
    }


    public fullname(): string {
      return this.name + ' ' + this.surname;
    }


    public toggleAdmin(): User {
      return new User(this.id, this.name, this.surname, !this.admin);
    }

    public static fromJSON(a: User): User {
      return new User(a.id, a.name, a.surname, a.admin);
    }

    public set(v: User): void {
      this.id = v.id;
      this.name = v.name;
      this.surname = v.surname;
      this.admin = v.admin;
    }
  }
}
