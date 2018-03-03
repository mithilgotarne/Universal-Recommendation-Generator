import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  ParamMap} from '@angular/router';
import { ElasticsearchService } from '../../services/elasticsearch.service';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])
  ]
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
