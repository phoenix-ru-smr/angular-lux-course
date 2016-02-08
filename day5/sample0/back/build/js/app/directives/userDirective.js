var app;
(function (app) {
    'use strict';
    function UserDirective() {
        return {
            replace: true,
            transclude: true,
            restrict: 'E',
            templateUrl: 'templates/user.html'
        };
    }
    app.UserDirective = UserDirective;
})(app || (app = {}));
