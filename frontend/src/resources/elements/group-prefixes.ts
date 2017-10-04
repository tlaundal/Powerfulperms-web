import {bindable, autoinject} from 'aurelia-framework';
import {Backend, GroupPrefix} from '../../lib/backend';

@autoinject
export class GroupPrefixes {
  @bindable group: number;

  backend: Backend;

  loading: boolean;
  empty: boolean;
  prefixes: Array<GroupPrefix>;

  constructor(backend: Backend) {
    this.backend = backend;

    this.loading = true;
    this.empty = false;
  }

  groupChanged() {
    this.loading = true;
    this.empty = false;
    this.prefixes = [];
    this.backend.getGroupPrefixes(this.group).then(prefixes => {
      this.loading = false;
      this.prefixes = prefixes;
      this.empty = prefixes == null || prefixes.length === 0;
    });
  }
}
