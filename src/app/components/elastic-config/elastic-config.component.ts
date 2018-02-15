import { Component, OnInit } from '@angular/core';
import { ElasticsearchService } from '../../services/elasticsearch.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-elastic-config',
  templateUrl: './elastic-config.component.html',
  styleUrls: ['./elastic-config.component.scss']
})
export class ElasticConfigComponent implements OnInit {

  error: any;
  host: any;

  constructor(private es: ElasticsearchService, private route: ActivatedRoute, private router: Router) {
    this.host = this.es.getHost();
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.error = params.get('status');
    });
  }

  private changeHost(host: string) {
    this.es.setup(host).then( body => {
      this.es.setHost(host);
      this.error = null;
      this.router.navigate(['']);
    });
  }

}
