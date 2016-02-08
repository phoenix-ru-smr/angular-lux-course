module app {
  'use strict'
  export class PanelCtrl {
    public title: string;
    public add: ()=> void;
    constructor() {
      console.log(this.title);
    }
  }
}
