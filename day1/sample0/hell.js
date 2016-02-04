angular.module("app", [])
.controller("MyCtrl", function($scope) {
  this.user={text:"MyCtrl"};
  this.user.text="MyCtrl";
  //console.log($scope.user.text);
})
.controller("MyCtrl1", function($scope) {
  $scope.ctrl.user.text="MyCtrl1";
  console.log($scope.ctrl.user.text);
})
