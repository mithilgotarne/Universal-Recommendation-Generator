import { Component, OnInit } from '@angular/core';
import { ElasticsearchService } from '../../services/elasticsearch.service';
import { ActivatedRoute, ParamMap, Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-similar',
  templateUrl: './similar.component.html',
  styleUrls: ['./similar.component.scss']
})
export class SimilarComponent implements OnInit {

  product: any;
  response: any;

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
    for(const key in product._source) {
      if(product._source[key]) {
        const obj = {};
        obj['match'] = {};
        obj['match'][key] = product._source[key];
        should.push(obj);
      }
    }

    this.es.client.search({
      body: {
        'from': 1,
        'size': 5,
        'query': {'bool': {'should': should}}}
    }).then(response => {
      this.response = response.hits.hits;
    }).catch(error => { console.log(error); });
  }
}
