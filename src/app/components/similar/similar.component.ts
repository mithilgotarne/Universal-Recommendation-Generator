import { Component, OnInit } from '@angular/core';
import { ElasticsearchService } from '../../services/elasticsearch.service';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-similar',
  templateUrl: './similar.component.html',
  styleUrls: ['./similar.component.scss']
})
export class SimilarComponent implements OnInit {

  product: any;

  constructor(private route: ActivatedRoute, private es: ElasticsearchService) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      const index = params.get('i');
      const type = params.get('t');
      const id = params.get('id');
      this.es.client.get({
        index: index, type: type, id: id
      }).then(body => this.product = body)
      .catch(error => console.log(error));
    });
  }

}
