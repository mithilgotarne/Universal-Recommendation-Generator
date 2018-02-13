import { Component } from '@angular/core';
import { Client } from 'elasticsearch';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BEP App';
  es: Client;
  response: any;
  searchCtrl: FormControl;
  constructor() {
    this.searchCtrl = new FormControl();
    this.setupHost();
    this.searchCtrl.valueChanges.subscribe(value => {
      this.search(value);
    });
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
    this.es = new Client({
      host: host,
      log: 'trace'
    });
    this.es.ping({
      requestTimeout: 5000,
    }, (error) => {
      if (error) {
        console.log('elasticsearch cluster is down!');
        this.requestHost();
      } else {
        console.log('All is well');
      }
    });
  }

  private search(value: string) {
    this.es.search({
      q: value
    }).then( (body) => {
      this.response = body.hits.hits;
    }, (error) => {
      console.log(error.message);
    });
  }
}
