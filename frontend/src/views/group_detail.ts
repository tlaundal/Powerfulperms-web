import {autoinject} from 'aurelia-framework';
import {Backend, Group, GroupPrefix} from '../lib/backend';
import {Groups} from './groups';

@autoinject
export class GroupDetail extends Groups {

  routeConfig;
  group: Group;
  prefixes: Array<GroupPrefix>;
  hasPrefixes: boolean = false;

  constructor(backend: Backend) {
    super(backend);
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    return this.backend.getGroupDetails(params.id).then(group => {
      this.group = group;
      this.routeConfig.navModel.setTitle(group.name);
      return group.id;
    });
  }

}
