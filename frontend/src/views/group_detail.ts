import {autoinject} from 'aurelia-framework';
import {Backend, Group} from '../lib/backend';
import {Groups} from './groups';

@autoinject
export class GroupDetail extends Groups {

  constructor(backend: Backend) {
    super(backend);
  }

}
