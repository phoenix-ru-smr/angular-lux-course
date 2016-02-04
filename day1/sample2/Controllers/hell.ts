module ctrl{
  "use strict";

  export class MainCtrl {
    name: string;
    constructor(private $scope: any) {
        this.name = "Test";
    }

    trace() {
      console.log(this.name);
      console.log(this.$scope.$$watchers);
    }
  }

}

//angular.module("app", [])
//.controller("MyCtrl", MyCtrl);
