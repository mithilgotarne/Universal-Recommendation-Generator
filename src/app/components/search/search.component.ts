import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  ParamMap} from '@angular/router';
import { ElasticsearchService } from '../../services/elasticsearch.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  response: any;
  index: string;

  constructor(private route: ActivatedRoute, private es: ElasticsearchService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.index = params.get('index');
    });
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.search(params.get('q'));
    });
  }

  private search(value: string) {
    this.es.client.search({
      index: this.index,
      q: value
    }).then( (body) => {
      this.response = body.hits.hits;
    }, (error) => {
      console.log(error.message);
    });
  }

}
