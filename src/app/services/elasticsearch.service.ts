import { Injectable } from '@angular/core';
import { Client } from 'elasticsearch';
import { Router } from '@angular/router';

@Injectable()
export class ElasticsearchService {

  client: Client;
  hosts = ['http://35.200.204.158:9200', 'http://35.200.208.146:9200'];

  constructor(private router: Router) {
    this.setupES(this.hosts[0]);
  }

  public setup(host: string) {
    this.client = new Client({
      host: host,
      log: 'trace'
    });
    return this.client.ping({
      requestTimeout: 10000,
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
      if (this.hosts[1] === host) {
        console.log('elasticsearch cluster is down!');
        this.router.navigate(['/status'], {queryParams: {status: error}});
      } else {
        this.setupES(this.hosts[1]);
      }
    });
  }

}
