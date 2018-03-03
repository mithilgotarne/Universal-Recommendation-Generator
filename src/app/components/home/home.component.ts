import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('indexAnim', [
      transition('* => *', [
        query('mat-card', style({ opacity: 0, transform: 'translateX(-40px)' })),

        query('mat-card', stagger('500ms', [
          animate('800ms 1.2s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
        ])),

        query('mat-card', [
          animate(1000, style('*'))
        ])

      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  selectedIndex: any;
  indexList = [
    { title: 'Phones', index: 'phones', icon: 'phone_android'},
    { title: 'Laptops', index: 'laptops', icon: 'laptop'},
  ];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.selectedIndex = this.getSelected(params.get('index'));
      localStorage.setItem('index', this.selectedIndex.index);
    });
  }

  private getSelected (index: string) {
    for (const i of this.indexList) {
      if (i.index === index) {
        return i;
      }
    }
    return null;
  }

  changeIndex (index: string) {
    this.router.navigate(['home', index]);
  }

}
