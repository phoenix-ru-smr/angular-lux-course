module app {
  'use strict'
  export function PanelDirective() {
    return <ng.IDirective>{
      replace: true,
      transclude: true,
      restrict: 'E',
      templateUrl: 'templates/panel.html',
      scope: {
        title:'=',
        add: '&'
      },
      bindToController: true,
      controller: PanelCtrl,
      controllerAs: 'pc'
    }
  }
}
