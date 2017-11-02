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
    let header = "basic " + btoa(`${username}:${password}`);
    return header;
  }

  public isLoggedIn(): Promise<boolean> {
    let $this = this;
    return new Promise((resolve, reject) => {
      let token = this.retrieveToken();
      if (token == null) {
        resolve(false);
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

  public login(username: string, password: string): Promise<boolean> {
    let $this = this;
    console.log("Authenticating with username", username);
    return this.client.fetch('generate_token', {
        method: 'GET',
        headers: {'Authorization': this.generateHeader(username, password)}
      })
      .then(response => response.json())
      .then(response => response.token)
      .then(token => {
        if (token === null || token === undefined) {
          console.log("Did not recieve an auth token!");
          return false;
        }
        console.log("Recieved auth token", token);
        $this.storeToken(token);
        return true;
      });
  }

  public getAuthorization(): string {
    return this.generateHeader('token', this.retrieveToken());
  }

}
