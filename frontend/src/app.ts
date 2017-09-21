
import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'PowerfulPerms-Web';
    config.map([
      { route: '',        moduleId: 'views/no-category'},
      { route: 'groups',  moduleId: 'views/groups',     name:'groups',  title:'Groups' },
      { route: 'players', moduleId: 'views/players',    name:'players', title:'Players' }
    ]);

    this.router = router;
  }
}
