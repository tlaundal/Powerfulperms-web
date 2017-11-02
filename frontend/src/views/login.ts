import {autoinject} from 'aurelia-framework';
import {AuthService} from '../lib/auth-service';

@autoinject
export class Login {

  username;
  password;
  successful = false;
  fail = false;

  authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  submit() {
    this.authService.login(this.username, this.password).then(result => {
      this.successful = result;
      this.fail = !result;
    }).catch(err => {
      console.log("Login failed:", err);
      this.fail = true;
    })
  }

}
