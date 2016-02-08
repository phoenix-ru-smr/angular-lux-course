var app;
(function (app) {
    'use strict';
    function PanelDirective() {
        return {
            replace: true,
            transclude: true,
            restrict: 'E',
            templateUrl: 'templates/panel.html',
            scope: {
                title: '=',
                add: '&'
            },
            bindToController: true,
            controller: app.PanelCtrl,
            controllerAs: 'pc'
        };
    }
    app.PanelDirective = PanelDirective;
})(app || (app = {}));
