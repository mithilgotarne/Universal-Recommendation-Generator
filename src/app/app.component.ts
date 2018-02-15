import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';


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
    this.searchCtrl.valueChanges.subscribe(value => {
      this.router.navigate(['/search'], { queryParams: { q: value } });
    });
  }

}
