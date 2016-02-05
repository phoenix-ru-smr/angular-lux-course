module app {
  "use strict";

  export function UserAdminFilter() {
    return function(items:User[], flag: boolean): User[] {
      return items.filter(item => (flag && item.admin) || (!flag && !item.admin));
    }
  }
}
