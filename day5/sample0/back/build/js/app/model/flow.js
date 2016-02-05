var app;
(function (app) {
    'use strict';
    var FlowModel = (function () {
        function FlowModel() {
            this.users = [];
            this.selectedUser = undefined;
            this.selectedAdmin = undefined;
        }
        FlowModel.prototype.findUser = function (user) {
            if (user) {
                var found = this.users.filter(function (item) { return item.id == user.id; });
                if (found.length > 0) {
                    return found[0];
                }
                else {
                    return undefined;
                }
            }
            else {
                return user;
            }
        };
        return FlowModel;
    })();
    app.FlowModel = FlowModel;
})(app || (app = {}));
