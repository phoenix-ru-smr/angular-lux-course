function MyCtrl($scope) {
  $scope.user={text:"MyCtrl"};
  this.name = "MyCtrl";
  this.trace = function() {
    console.log($scope);
  }

}
function MyCtrl1($scope) {
  call(MyCtrl, this);
  MyCtrl1.prototype = new MyCtrl();
  this.name = "MyCtrl";
}
angular.module("app", [])
.controller("MyCtrl", MyCtrl)
.controller("MyCtrl1", MyCtrl1)
