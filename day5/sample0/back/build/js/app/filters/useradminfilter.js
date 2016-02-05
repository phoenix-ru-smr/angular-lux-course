var app;
(function (app) {
    "use strict";
    function UserAdminFilter() {
        return function (items, flag) {
            return items.filter(function (item) { return (flag && item.admin) || (!flag && !item.admin); });
        };
    }
    app.UserAdminFilter = UserAdminFilter;
})(app || (app = {}));
