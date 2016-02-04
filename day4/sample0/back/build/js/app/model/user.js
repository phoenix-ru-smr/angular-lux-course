var app;
(function (app) {
    'use strict';
    var User = (function () {
        function User(_id, name, surname) {
            this._id = _id;
            this.name = name;
            this.surname = surname;
            this.id = _id;
            this.admin = false;
            if (angular.isUndefined(this.name)) {
                this.name = 'name' + _id;
            }
            if (angular.isUndefined(this.surname)) {
                this.surname = 'surname' + _id;
            }
        }
        User.prototype.fullname = function () {
            return this.name + ' ' + this.surname;
        };
        User.prototype.isAdmin = function () {
            return this.admin;
        };
        User.prototype.setAdmin = function (_admin) {
            this.admin = _admin;
        };
        return User;
    })();
    app.User = User;
})(app || (app = {}));
