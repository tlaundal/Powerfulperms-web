
import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'PowerfulPerms-Web';
    config.map([
      { route: '',        moduleId: 'no-category'},
      { route: 'groups',  moduleId: 'groups',      name:'groups', title:'Groups' }
    ]);

    this.router = router;
  }
}
