import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BEP App';

  searchCtrl: FormControl;
  constructor(private router: Router) {
    this.searchCtrl = new FormControl();
    this.searchCtrl.valueChanges.subscribe((value: string) => {
      value = value.trim();
      const index = localStorage.getItem('index');
      if (value.length === 0) {
        this.router.navigate([ '/home' , index ]);
      }else {
        this.router.navigate([ '/' + index, 'search'], { queryParams: { q: value } });
      }
    });
  }

}
