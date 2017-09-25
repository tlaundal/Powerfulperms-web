import {autoinject} from 'aurelia-framework';
import {Backend, Group} from '../lib/backend';
import * as Fuse from 'fuse.js';

@autoinject
export class Groups {

  backend: Backend;
  groups: Array<Group>;
  groups_view: Array<Group>;

  fuse_options: Object;
  fuse: Fuse;
  search: String;

  filter: (a: Group) => boolean = () => true;
  sort: (a: Group, b: Group) => number = (a:Group, b:Group) => a < b ? -1 : 1;

  constructor(backend: Backend) {
    this.backend = backend;
    this.fuse_options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "name"
      ]
    };
  }

  created() {
    let $this = this;
    this.backend.getGroups()
      .then(groups => {
        $this.groups = groups;
        $this.groups_view = $this.groups;
        //$this.fuse = new Fuse($this.groups, $this.fuse_options);
      });
  }

  searchFor(search: string) {
    // this.groups_view = this.fuse.search(search)
    search = search.toLowerCase();
    this.groups_view = this.groups.filter((group: Group) => group.name.toLowerCase().indexOf(search) !== -1);
  }

}
