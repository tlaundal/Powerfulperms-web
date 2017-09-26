import {autoinject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

export interface Group {
  id: number;
  name: string;
  ladder: string;
  rank: number;

  params?: object;
}

export interface Player {
  uuid: string;
  name: string;
  prefix: string;
  suffix: string;

  params?: object;
}

@autoinject
export class Backend {

  endpoint: string = 'http://localhost:5000/';
  client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
    this.client.configure(config => {
      config
        .withBaseUrl(this.endpoint)
        .rejectErrorResponses()
        .withDefaults({
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        })
        .withInterceptor({
          request(request) {
            console.log(`Requesting ${request.method} ${request.url}`);
            return request;
          },
          response(response) {
            console.log(`Received ${response.status} ${response.url}`);
            return response;
          }
        });
    });
  }

  getGroups(): Promise<Array<Group>> {
    return this.client.fetch('groups', {method: 'get'})
      .then(response => response.json());
  }

  getPlayers(): Promise<Array<Player>> {
    return this.client.fetch('players', {method: 'get'})
      .then(response => response.json());
  }

}
