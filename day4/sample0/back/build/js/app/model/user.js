var app;
(function (app) {
    'use strict';
    var User = (function () {
        function User(id, name, surname, admin) {
            if (name === void 0) { name = 'name' + id; }
            if (surname === void 0) { surname = 'surname' + id; }
            if (admin === void 0) { admin = false; }
            this.id = id;
            this.name = name;
            this.surname = surname;
            this.admin = admin;
        }
        User.prototype.fullname = function () {
            return this.name + ' ' + this.surname;
        };
        User.prototype.toggleAdmin = function () {
            return new User(this.id, this.name, this.surname, !this.admin);
        };
        User.fromJSON = function (a) {
            return new User(a.id, a.name, a.surname, a.admin);
        };
        User.prototype.set = function (v) {
            this.id = v.id;
            this.name = v.name;
            this.surname = v.surname;
            this.admin = v.admin;
        };
        return User;
    })();
    app.User = User;
})(app || (app = {}));
