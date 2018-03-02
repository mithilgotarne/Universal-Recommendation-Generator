import { Component, OnInit } from '@angular/core';
import { ElasticsearchService } from '../../services/elasticsearch.service';
import { Client } from 'elasticsearch';
import { ActivatedRoute, ParamMap, Router, NavigationEnd } from '@angular/router';
import { MatTabChangeEvent, MatDialog } from '@angular/material';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';


@Component({
  selector: 'app-similar',
  templateUrl: './similar.component.html',
  styleUrls: ['./similar.component.scss']
})
export class SimilarComponent implements OnInit {

  static tolerance = 0.25;
  selectedTab: number;
  product: any;
  response: any;
  maxScore: any;

  constructor(private route: ActivatedRoute,
    private dialog: MatDialog,
    private es: ElasticsearchService, private router: Router) { }

  ngOnInit() {
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

  private getSimilar(product, checkedKeys?) {
    if (!checkedKeys) {
      checkedKeys = JSON.parse(localStorage.getItem('config'));
    }
    if (!checkedKeys) {
      checkedKeys = [];
    }
    const should = [];
    for (const key in product._source) {
      if (product._source[key]) {
        if (key === 'image_url') {
          continue;
        }
        if (checkedKeys.length > 0 && !checkedKeys.includes(key)) {
          continue;
        }
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
      index: this.product._index,
      body: {
        // 'from': 1,
        // 'size': 6,
        'query': {'bool': {'should': should ,
        'must_not': [
          {'match': {'price': 0 } },
          {'ids': {'values': [this.product._id]}}]
        }}
      }
    }).then(response => {
      this.response = response.hits.hits;
      this.maxScore = response.hits.max_score;
      this.selectedTab = 0;
    }).catch(error => { console.log(error); });
  }

  openConfigDialog() {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      // height: '400px',
      width: '700px',
      data: this.product._source
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:' , result);
      if (result) {
        this.getSimilar(this.product, result);
      }
    });
  }
}

