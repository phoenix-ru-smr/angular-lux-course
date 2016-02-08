module app {
  'use strict'
  export function UserDirective() {
    return <ng.IDirective>{
      replace: true,
      transclude: true,
      restrict: 'E',
      templateUrl: 'templates/user.html'
    }
  }
}
