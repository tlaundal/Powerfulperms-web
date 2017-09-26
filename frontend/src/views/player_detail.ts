import {autoinject} from 'aurelia-framework';
import {Backend, Player} from '../lib/backend';
import {Players} from './players';

@autoinject
export class PlayerDetail extends Players {

  constructor(backend: Backend) {
    super(backend);
  }

}
