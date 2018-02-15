import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: any;
  @Input() action = true;

  constructor( private router: Router) { }

  ngOnInit() {
  }

  private getSimilar(card) {
    this.router.navigate(['similar'], {queryParams: {i: card._index, t: card._type, id: card._id}});
  }

}
