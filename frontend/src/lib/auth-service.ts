import {autoinject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

export class AuthService {

  endpoint: string = 'http://localhost:5000/';
  client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
    this.client.configure(config => {
      config.withBaseUrl(this.endpoint);
    });
  }

  private retrieveToken(): string {
    return window.localStorage.getItem("powerfulperms-web.token");
  }

  private storeToken(token: string) {
    window.localStorage.setItem('powerfulperms-web.token', token);
  }

  public login(username: string, password: string) {
    this.client.fetch('generate_token', {method: 'GET'})
      .then(response => {
        // TODO
      });
  }

}
