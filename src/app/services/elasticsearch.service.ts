import { Injectable } from '@angular/core';
import { Client } from 'elasticsearch';
import { Router } from '@angular/router';

@Injectable()
export class ElasticsearchService {

  client: Client;

  constructor(private router: Router) {
    const host = localStorage.getItem('host');
    this.setupES(host);
  }

  public setup(host: string) {
    this.client = new Client({
      host: host,
      log: 'trace'
    });
    return this.client.ping({
      requestTimeout: 30000,
    });
  }

  public setHost(host: string) {
    localStorage.setItem('host', host);
  }

  public getHost() {
    return localStorage.getItem('host');
  }

  private setupES(host: string) {
    this.setup(host)
    .then(body => {
      console.log(body);
      this.setHost(host);
    })
    .catch(error => {
      console.log('elasticsearch cluster is down!');
      this.router.navigate([''], {queryParams: {status: error}});
    });
  }

}
