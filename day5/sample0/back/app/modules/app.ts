/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../controllers/userctrl.ts"/>

module app{
  angular
  .module("app", [])
  .factory('UserDataManagementService', ['$http', function($http) {
    return new UserDataManagementService($http);
  }])
  .factory('UserService', ['UserDataManagementService', function(userCRUD) {
    return new UserService(userCRUD);
  }])
  .controller("UserCtrl", UserCtrl)
  .filter("UserAdminFilter", UserAdminFilter)
  .config(['$routeProvider', '$locationProvider', ($routeProvider: ng.route.IRouteProvider,
          $locationProvider: ng.ILocationProvider)=>{
            $locationProvider.html5Mode(true);
          }]);
}
