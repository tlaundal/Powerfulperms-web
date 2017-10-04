import {bindable, autoinject} from 'aurelia-framework';
import {Backend, Group} from '../../lib/backend';

@autoinject
export class GroupParents {
  @bindable group: number;

  backend: Backend;

  loading: boolean;
  empty: boolean;
  parents: Array<Group>;

  constructor(backend: Backend) {
    this.backend = backend;

    this.loading = true;
    this.empty = false;
  }

  groupChanged() {
    this.loading = true;
    this.empty = false;
    this.parents = [];
    this.backend.getGroupParents(this.group).then(parents => {
      this.loading = false;
      this.parents = parents;
      this.empty = parents == null || parents.length === 0;
    });
  }
}
