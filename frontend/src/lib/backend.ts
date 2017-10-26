import {autoinject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {NotificationService} from './notification-service';
import {AuthService} from './auth-service';

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
  notificationService: NotificationService;
  authService: AuthService;

  constructor(client: HttpClient, notificationService: NotificationService, authService: AuthService) {
    this.client = client;
    this.authService = authService;

    this.client.configure(config => {
      config
        .withBaseUrl(this.endpoint)
        .rejectErrorResponses()
        .withDefaults({
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        });
        // .withInterceptor({
        //   request(request) {
        //     console.log(`Requesting ${request.method} ${request.url}`);
        //     return request;
        //   },
        //   response(response) {
        //     console.log(`Received ${response.status} ${response.url}`);
        //     return response;
        //   },
        //   responseError(response) {
        //     console.log(`Received error: ${response}`);
        //     if (response.status === 401 || response.status === 403) {
        //       notificationService.addNotificationMessage("You Are not logged in!");
        //     } else if (response.status) {
        //       notificationService.addNotificationMessage(`Got ${response.status}: ${response.statusText}`);
        //     } else if (response.message) {
        //       notificationService.addNotificationMessage(response.message);
        //     } else {
        //       notificationService.addNotificationMessage(`Uknown network error!`);
        //     }
        //     return response;
        //   }
        // });
    });
  }

  getGroups(): Promise<Array<Group>> {
    return this.client.fetch('groups', {
        method: 'get',
        headers: {'Authorization': this.authService.getAuthorization()}
      })
      .then(response => response.json());
  }

  getPlayers(): Promise<Array<Player>> {
    return this.client.fetch('players', {
        method: 'get',
        headers: {'Authorization': this.authService.getAuthorization()}
      })
      .then(response => response.json());
  }

  getGroupDetails(id: number): Promise<Group> {
    return this.client.fetch('groups/' + id, {
        method: 'get',
        headers: {'Authorization': this.authService.getAuthorization()}
      })
      .then(response => response.json());
  }

  getPlayerDetails(uuid: string): Promise<Player> {
    return this.client.fetch('players/' + uuid, {
        method: 'get',
        headers: {'Authorization': this.authService.getAuthorization()}
      })
      .then(response => response.json());
  }

  getGroupPrefixes(id: number): Promise<Array<GroupPrefix>> {
    return this.client.fetch(`groups/${id}/prefixes`, {
        method: 'get',
        headers: {'Authorization': this.authService.getAuthorization()}
      })
      .then(response => response.json());
  }

  getGroupSuffixes(id: number): Promise<Array<GroupSuffix>> {
    return this.client.fetch(`groups/${id}/suffixes`, {
        method: 'get',
        headers: {'Authorization': this.authService.getAuthorization()}
      })
      .then(response => response.json());
  }

  getGroupParents(id: number): Promise<Array<Group>> {
    return this.client.fetch(`groups/${id}/parents`, {
        method: 'get',
        headers: {'Authorization': this.authService.getAuthorization()}
      })
      .then(response => response.json());
  }

  getGroupPermissions(id: number): Promise<Array<Permission>> {
    return this.client.fetch(`groups/${id}/permissions`, {
        method: 'get',
        headers: {'Authorization': this.authService.getAuthorization()}
      })
      .then(response => response.json());
  }

}
