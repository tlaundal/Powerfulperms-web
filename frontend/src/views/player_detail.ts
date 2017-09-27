import {autoinject} from 'aurelia-framework';
import {Backend, Player} from '../lib/backend';
import {Players} from './players';

@autoinject
export class PlayerDetail extends Players {

  routeConfig;
  player: Player;

  constructor(backend: Backend) {
    super(backend);
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    return this.backend.getPlayerDetails(params.id).then(player => {
      this.player = player;
      this.routeConfig.navModel.setTitle(player.name);
    });
  }

}
