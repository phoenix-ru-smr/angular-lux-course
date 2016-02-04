var app;
(function (app) {
    "use strict";
    function UserAdminFilter() {
        return function (items, flag) {
            return items.filter(function (item) { return (flag && item.isAdmin()) || (!flag && !item.isAdmin()); });
        };
    }
    app.UserAdminFilter = UserAdminFilter;
})(app || (app = {}));
