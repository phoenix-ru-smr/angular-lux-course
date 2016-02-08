/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../controllers/userctrl.ts"/>
var app;
(function (app) {
    angular
        .module("app", ['ngRoute', 'ngMessages'])
        .service("flow", app.FlowModel)
        .factory('UserDataManagementService', ['$http', function ($http) {
            return new app.UserDataManagementService($http);
        }])
        .factory('UserService', ['UserDataManagementService', 'flow', function (userCRUD, flow) {
            return new app.UserService(userCRUD, flow);
        }])
        .controller("UserCtrl", ['UserService', 'flow', '$location', app.UserCtrl])
        .controller("EditCtrl", ['$scope', 'UserService', 'flow', '$routeParams', '$location', '$q', app.EditCtrl])
        .controller("NewUserCtrl", ['$scope', 'UserService', 'flow', '$routeParams', '$location', '$q', app.NewUserCtrl])
        .directive('user', [app.UserDirective])
        .directive('panel', [app.PanelDirective])
        .filter("UserAdminFilter", app.UserAdminFilter)
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
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
            });
        }]);
})(app || (app = {}));
