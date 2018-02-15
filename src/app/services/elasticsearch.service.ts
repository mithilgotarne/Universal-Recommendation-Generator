import { Injectable } from '@angular/core';
import { Client } from 'elasticsearch';

@Injectable()
export class ElasticsearchService {

  client: Client;

  constructor() {
    this.setupHost();
  }

  private setupHost() {
    const host = localStorage.getItem('host');
    if (host) {
      this.setupES(host);
    } else {
      this.requestHost();
    }
  }

  private requestHost() {
    const host = window.prompt('Enter elasticsearch host');
    if (!host) {
      this.requestHost();
    } else {
      localStorage.setItem('host', host);
      this.setupES(host);
    }
  }

  private setupES(host: string) {
    this.client = new Client({
      host: host,
      log: 'trace'
    });
    this.client.ping({
      requestTimeout: 30000,
    }, (error) => {
      if (error) {
        console.log('elasticsearch cluster is down!');
        this.requestHost();
      } else {
        console.log('All is well');
      }
    });
  }

}
