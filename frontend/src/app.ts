import {Router, RouterConfiguration} from 'aurelia-router';
import {autoinject} from 'aurelia-framework';
import {AuthService} from './lib/auth-service';

@autoinject
export class App {
  authService: AuthService;
  router: Router;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'PowerfulPerms-Web';
    config.map([
      { route: '',            moduleId: 'views/no-category'},
      { route: 'groups',      moduleId: 'views/groups',        name:'groups',  title: 'Groups' },
      { route: 'groups/:id',  moduleId: 'views/group_detail',  name:'group',   title: 'Group' },
      { route: 'players',     moduleId: 'views/players',       name:'players', title: 'Players' },
      { route: 'players/:id', moduleId: 'views/player_detail', name:'player',  title: 'Player'},
      { route: 'login',       moduleId: 'views/login',         name:'login',   title: 'Login'}
    ]);

    this.router = router;
  }

  attached() {
    let $this = this;
    this.authService.isLoggedIn().then(loggedIn => {
      if (!loggedIn) {
        console.log("Was not logged in, forwarding to login route");
        $this.router.navigateToRoute("login");
      }
    });
  }

}
