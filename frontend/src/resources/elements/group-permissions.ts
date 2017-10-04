import {bindable, autoinject} from 'aurelia-framework';
import {Backend, Permission} from '../../lib/backend';

@autoinject
export class GroupPermissions {
  @bindable group: number;

  backend: Backend;

  loading: boolean;
  empty: boolean;
  permissions: Array<Permission>;

  constructor(backend: Backend) {
    this.backend = backend;

    this.loading = true;
    this.empty = false;
  }

  groupChanged() {
    this.loading = true;
    this.empty = false;
    this.permissions = [];
    this.backend.getGroupPermissions(this.group).then(permissions => {
      permissions.forEach(permission => {
        if (!permission.permission.startsWith("-")) {
          permission.permission = "&nbsp;" + permission.permission;
        }
      })
      permissions.sort((a: Permission, b: Permission): number => {
        if (a.server !== b.server) {
          return a.server < b.server ? -1 : 1;
        }
        if (a.world !== b.world) {
          return a.world < b.world ? -1 : 1;
        }
        if (a.permission !== b.permission) {
          return a.permission < b.permission ? -1 : 1;
        }

        return 0;
      });
      this.loading = false;
      this.permissions = permissions;
      this.empty = permissions == null || permissions.length === 0;
    });
  }
}
