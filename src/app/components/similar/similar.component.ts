import { Component, OnInit } from '@angular/core';
import { ElasticsearchService } from '../../services/elasticsearch.service';
import { Client } from 'elasticsearch';
import { ActivatedRoute, ParamMap, Router, NavigationEnd } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material';


@Component({
  selector: 'app-similar',
  templateUrl: './similar.component.html',
  styleUrls: ['./similar.component.scss']
})
export class SimilarComponent implements OnInit {

  static tolerance = 0.25;
  selectedTab = 0;
  product: any;
  response: any;
  maxScore: any;

  constructor(private route: ActivatedRoute, private es: ElasticsearchService, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      const index = params.get('i');
      const type = params.get('t');
      const id = params.get('id');
      this.es.client.get({
        index: index, type: type, id: id
      }).then(body => { this.product = body; this.getSimilar(this.product); })
      .catch(error => console.log(error));
    });
  }

  private getSimilar(product) {
    const should = [];
    for (const key in product._source) {
      if (product._source[key]) {
        const element = product._source[key];
        if (typeof element === 'number') {
          const obj = {};
          obj['bool'] = {};
          obj['bool']['filter'] = {};
          obj['bool']['filter']['range'] = {};
          obj['bool']['filter']['range'][key] = {
            'gte': element * (1 - SimilarComponent.tolerance),
            'lte': element * (1 + SimilarComponent.tolerance)
          };
          should.push(obj);
        } else {
          const obj = {};
          obj['match'] = {};
          obj['match'][key] = product._source[key];
          should.push(obj);
        }
      }
    }

    this.es.client.search({
      body: {
        'from': 1,
        'size': 6,
        'query': {'bool': {'should': should , 'must_not': [{'match': {'price': 0 } }]}}
      }
    }).then(response => {
      this.response = response.hits.hits;
      this.maxScore = response.hits.max_score;
    }).catch(error => { console.log(error); });
  }
}
