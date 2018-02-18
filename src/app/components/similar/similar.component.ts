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
    this.es.client.search({
      body: {
        'from': 1,
        'size': 5,
        'query': {
          'bool': {
            'should': [
              {
                'match': {
                  'Rating': product._source.Rating
                }
              },
              {
                'match': {
                  'Item_Weight': product._source.Item_Weight
                }
              },
              {
                'match': {
                  'OS': product._source.OS
                }
              },
              {
                'match': {
                  'Product_Description': product._source.Product_Description
                }
              },
              {
                'match': {
                  'Product_dimensions': product._source.Product_dimensions
                }
              },
              {
                'match': {
                  'Company': product._source.Company
                }
              },
              {
                'match': {
                  'RAM': product._source.RAM
                }
              },
              {
                'match': {
                  'Cost': product._source.Cost

                }
              }
            ]
          }
        }
      }
    }).then(response => {
      this.response = response.hits.hits;
    }
    ).catch(error => { console.log(error); });
  }
}
