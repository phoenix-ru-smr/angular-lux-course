/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../controllers/userctrl.ts"/>

module app {
  angular
    .module("app", ['ngRoute', 'ngMessages'])
    .service("flow", FlowModel)
    .factory('UserDataManagementService', ['$http', function($http) {
    return new UserDataManagementService($http);
  }])
    .factory('UserService', ['UserDataManagementService', 'flow', function(userCRUD, flow) {
    return new UserService(userCRUD, flow);
  }])
    .controller("UserCtrl", ['UserService', 'flow', '$location', UserCtrl])
    .controller("EditCtrl", ['$scope', 'UserService', 'flow', '$routeParams', '$location', '$q', EditCtrl])
    .controller("NewUserCtrl", ['$scope', 'UserService', 'flow', '$routeParams', '$location', '$q', NewUserCtrl])
    .directive('user', [UserDirective])
    .directive('panel', [PanelDirective])
    .filter("UserAdminFilter", UserAdminFilter)
    .config(['$routeProvider', '$locationProvider', (
    $routeProvider: ng.route.IRouteProvider,
    $locationProvider: ng.ILocationProvider) => {
    $locationProvider.html5Mode(true);
    $routeProvider.when("/odminka", {
      templateUrl: "templates/odminka.html",
      controller: "UserCtrl",
      controllerAs: 'ctrl'
    }).when("/user/:id", {
      templateUrl: "templates/edit.html",
      controller: "EditCtrl",
      controllerAs: 'ctrl'
    }).when("/new", {
      templateUrl: "templates/new.html",
      controller: "NewUserCtrl",
      controllerAs: 'ctrl'
    }).when("/users", {
      templateUrl: "templates/users.html",
      controller: "UserCtrl",
      controllerAs: 'ctrl'
    }).otherwise({
      redirectTo: "/"
    })
  }]);
}
