module app{
  'use strict';

  export class User {
    public id: number;
    private admin: boolean

    constructor(private _id: number, public name?: string, public surname?: string) {
      this.id = _id;
      this.admin = false;
      if (angular.isUndefined(this.name)) {
        this.name = 'name' + _id;
      }
      if (angular.isUndefined(this.surname)) {
        this.surname = 'surname' + _id;
      }
    }


    public fullname(): string {
      return this.name + ' ' + this.surname;
    }

    public isAdmin(): boolean {
      return this.admin;
    }

    public setAdmin(_admin: boolean): void {
      this.admin = _admin
    }
  }
}
