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

export interface GroupPrefix {
  id: number;
  prefix: string;
  server: string;
}

export interface GroupSuffix {
  id: number;
  suffix: string;
  server: string;
}

export interface Permission {
  id: number;
  permission: string;
  world: string;
  server: string;
  expires: Date;
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
          request: this.requestInterceptor,
          response: this.responseInterceptor,
          responseError: this.responseErrorHandler
        });
    });
  }

  responseErrorHandler(error) {
    console.log("Got error:", error);
    return error;
  }

  requestInterceptor(request) {
    console.log(`Requesting ${request.method} ${request.url}`);
    return request;
  }

  responseInterceptor(response) {
    console.log(`Received ${response.status} ${response.url}`);
    return response;
  }

  getGroups(): Promise<Array<Group>> {
    return this.client.fetch('groups', {method: 'get'})
      .then(response => response.json());
  }

  getPlayers(): Promise<Array<Player>> {
    return this.client.fetch('players', {method: 'get'})
      .then(response => response.json());
  }

  getGroupDetails(id: number): Promise<Group> {
    return this.client.fetch('groups/' + id, {method: 'get'})
      .then(response => response.json());
  }

  getPlayerDetails(uuid: string): Promise<Player> {
    return this.client.fetch('players/' + uuid, {method: 'get'})
      .then(response => response.json());
  }

  getGroupPrefixes(id: number): Promise<Array<GroupPrefix>> {
    return this.client.fetch(`groups/${id}/prefixes`, {method: 'get'})
      .then(response => response.json());
  }

  getGroupSuffixes(id: number): Promise<Array<GroupSuffix>> {
    return this.client.fetch(`groups/${id}/suffixes`, {method: 'get'})
      .then(response => response.json());
  }

  getGroupParents(id: number): Promise<Array<Group>> {
    return this.client.fetch(`groups/${id}/parents`, {method: 'get'})
      .then(response => response.json());
  }

  getGroupPermissions(id: number): Promise<Array<Permission>> {
    return this.client.fetch(`groups/${id}/permissions`, {method: 'get'})
      .then(response => response.json());
  }

}
