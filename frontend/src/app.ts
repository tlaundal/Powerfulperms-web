import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'PowerfulPerms-Web';
    config.map([
      { route: '',            moduleId: 'views/no-category'},
      { route: 'groups',      moduleId: 'views/groups',        name:'groups',  title: 'Groups' },
      { route: 'groups/:id',  moduleId: 'views/group_detail',  name:'group',   title: 'Group' },
      { route: 'players',     moduleId: 'views/players',       name:'players', title: 'Players' },
      { route: 'players/:id', moduleId: 'views/player_detail', name:'player',  title: 'Player'}
    ]);

    this.router = router;
  }
}
