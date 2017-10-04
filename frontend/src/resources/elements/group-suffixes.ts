import {bindable, autoinject} from 'aurelia-framework';
import {Backend, GroupSuffix} from '../../lib/backend';
import {renderColors} from '../value-converters/render-colors';

@autoinject
export class GroupSuffixes {
  @bindable group: number;

  backend: Backend;

  loading: boolean;
  empty: boolean;
  suffixes: Array<GroupSuffix>;

  constructor(backend: Backend) {
    this.backend = backend;

    this.loading = true;
    this.empty = false;
  }

  groupChanged() {
    this.loading = true;
    this.empty = false;
    this.suffixes = [];
    this.backend.getGroupSuffixes(this.group).then(suffixes => {
      suffixes.forEach(suffix => {
        suffix.suffix = renderColors(suffix.suffix);
      })
      this.loading = false;
      this.suffixes = suffixes;
      this.empty = suffixes == null || suffixes.length === 0;
    });
  }
}
