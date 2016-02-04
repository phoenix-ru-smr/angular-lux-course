angular.module("app", [])
.controller("MyCtrl",function($scope) {
    $scope.user={text:"MyCtrl"};
  $scope.user.text="MyCtrl";
  console.log($scope.user.text);
})
.controller("MyCtrl1",function($scope) {
  $scope.user.text="MyCtrl1";
  console.log($scope.user.text);
})
