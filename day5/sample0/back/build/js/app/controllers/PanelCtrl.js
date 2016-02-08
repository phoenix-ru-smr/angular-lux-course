var app;
(function (app) {
    'use strict';
    var PanelCtrl = (function () {
        function PanelCtrl() {
            console.log(this.title);
        }
        return PanelCtrl;
    })();
    app.PanelCtrl = PanelCtrl;
})(app || (app = {}));
