import {autoinject} from 'aurelia-framework';
import {Backend, Player} from '../lib/backend';
import {Fused} from '../lib/fused';

@autoinject
export class Players extends Fused<Player> {

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
    });
    this.backend = backend;
  }

  created() {
    let $this = this;
    this.backend.getPlayers()
      .then(players => {
        players.forEach((player) => {
          player.params = {
            "id": player.uuid
          };
        })
        $this.setData(players);
      });
  }

  display(player: Player) {
    return player.name;
  }

}
