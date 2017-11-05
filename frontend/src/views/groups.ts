import {autoinject} from 'aurelia-framework';
import {Backend, Group} from '../lib/backend';
import {Fused} from '../lib/fused';

declare class Fuse<T> {
  constructor(data: Array<T>, config: Object);

  search(query: string): Array<T>;
}

@autoinject
export class Groups extends Fused<Group> {

  backend: Backend;

  constructor(backend: Backend) {
    super({
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "name"
      ]
    }, 20);
    this.backend = backend;
  }

  created() {
    let $this = this;
    this.backend.getGroups()
      .then(groups => {
        groups.forEach((group) => {
          group.params = {
            "id": group.id
          };
        });
        $this.setData(groups);
      });
  }

  display(group: Group) {
    return group.name;
  }

}
