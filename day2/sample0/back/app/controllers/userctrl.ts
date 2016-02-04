/// <reference path="../../typings/angularjs/angular.d.ts"/>

module app{
  "use strict";
   export class UserCtrl {
     private name: string;
     private surname: string;
     private fullname: string;
     private name1: string;
     private surname1: string;
     private fullname1: string;
     private name2: string;
     private surname2: string;
     private fullname2: string;
     private change(): void {
       this.fullname1 = this.name1 + ' ' + this.surname1;
     }
     private setFullName(old: string, newval: string): void {
       this.fullname2 = this.name2 + ' ' + this.surname2;
     }

     constructor(private $scope: ng.IScope) {
       this.name = "Test";
       this.surname = "Hell";
       this.name1 = "Angular";
       this.surname1 = "Kills";
       this.name2 = "Beware of";
       this.surname2 = "evil programmers";
       var setFullName = (old: string, newval: string): void => {
         this.fullname = this.name + ' ' + this.surname;
       }

       $scope.$watch("ctrl.name2", this.setFullName.bind(this));
       $scope.$watch("ctrl.surname2", this.setFullName.bind(this));

       this.change();

       $scope.$watch("ctrl.name", setFullName);
       $scope.$watch("ctrl.surname", setFullName);
     }

  }
}
