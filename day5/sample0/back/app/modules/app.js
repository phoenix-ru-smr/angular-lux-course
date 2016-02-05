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
        .controller("EditCtrl", ['UserService', 'flow', '$routeParams', '$location', app.EditCtrl])
        .controller("NewUserCtrl", ['UserService', 'flow', '$routeParams', '$location', app.NewUserCtrl])
        .filter("UserAdminFilter", app.UserAdminFilter)
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider.when("/odminka", {
                templateUrl: "templates/odminka.html",
                controller: "UserCtrl",
                controllerAs: 'ctrl'
            })
                .when("/user/:id", {
                templateUrl: "templates/edit.html",
                controller: "EditCtrl",
                controllerAs: 'ctrl'
            })
                .when("/new/", {
                templateUrl: "templates/new.html",
                controller: "NewUserCtrl",
                controllerAs: 'ctrl'
            }).otherwise({
                redirectTo: "/"
            });
        }]);
})(app || (app = {}));
