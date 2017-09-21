import {autoinject} from 'aurelia-framework';
import {Backend, Player} from '../lib/backend';

@autoinject
export class Players {

  backend: Backend;
  players: Array<Player>;

  constructor(backend: Backend) {
    this.backend = backend;
  }

  created() {
    let $this = this;
    this.backend.getPlayers()
      .then(players => {
        $this.players = players;
      });
  }

}
