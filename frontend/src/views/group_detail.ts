import {autoinject} from 'aurelia-framework';
import {Backend, Group} from '../lib/backend';
import {Groups} from './groups';

@autoinject
export class GroupDetail extends Groups {

  routeConfig;
  group: Group;

  constructor(backend: Backend) {
    super(backend);
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    return this.backend.getGroupDetails(params.id).then(group => {
      this.group = group;
      this.routeConfig.navModel.setTitle(group.name);
    });
  }

}
