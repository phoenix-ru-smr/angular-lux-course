/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../controllers/userctrl.ts"/>

module app{
  angular
  .module("app", [])
  .service("UserService", UserService)
  .controller("UserCtrl", UserCtrl)
  .filter("UserAdminFilter", UserAdminFilter);
}
