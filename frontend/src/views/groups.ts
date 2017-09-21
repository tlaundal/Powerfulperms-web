import {autoinject} from 'aurelia-framework';
import {Backend, Group} from '../lib/backend';

@autoinject
export class Groups {

  backend: Backend;
  groups: Array<Group>;

  constructor(backend: Backend) {
    this.backend = backend;
  }

  created() {
    let $this = this;
    this.backend.getGroups()
      .then(groups => {
        $this.groups = groups;
      });
  }

}
