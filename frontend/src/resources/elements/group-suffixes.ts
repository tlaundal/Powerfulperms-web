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

      // Filter only last suffix for each server and
      // render the sufixes
      let suffixMap: Map<string, GroupSuffix> = new Map();
      suffixes.forEach(suffix => {
        suffix.suffix = renderColors(suffix.suffix);
        suffixMap.set(suffix.server, suffix);
      });

      // Push the suffixes back into the array
      suffixes = [];
      suffixMap.forEach((value: GroupSuffix, key: string) => {
        suffixes.push(value);
      })

      this.loading = false;
      this.suffixes = suffixes;
      this.empty = suffixes == null || suffixes.length === 0;
    });
  }
}
