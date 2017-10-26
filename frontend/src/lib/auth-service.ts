import {autoinject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

@autoinject
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

  private generateHeader(username: string, password: string): string {
    return btoa(`${username}:${password}`);
  }

  public isLoggedIn(): Promise<boolean> {
    let $this = this;
    return new Promise((resolve, reject) => {
      let token = this.retrieveToken();
      if (token == null) {
        resolve(true);
      }

      $this.client.fetch('groups', {
          method: 'GET',
          headers: {'Authorization': this.getAuthorization()}
        })
        .then(response => {
          resolve(response.ok);
        })
        .catch(err => {
          resolve(false);
        });
    });
  }

  public login(username: string, password: string) {
    let $this = this;
    this.client.fetch('generate_token', {
        method: 'GET',
        headers: {'Authorization': this.generateHeader(username, password)}
      })
      .then(response => response.json())
      .then(response => response.token)
      .then(token => {
        $this.storeToken(token);
        return true;
      });
  }

  public getAuthorization(): string {
    return this.generateHeader('token', this.retrieveToken());
  }

}
