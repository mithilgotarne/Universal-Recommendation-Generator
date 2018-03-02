import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent implements OnInit {

  config = [];
  product: any;

  constructor(public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.product = this.data;
    const checkedKeys = JSON.parse(localStorage.getItem('config'));
    if (!checkedKeys) {
      this.selectAll();
    } else if (checkedKeys && checkedKeys.length === 0) {
      this.selectAll();
    } else {
      for (const key in this.product) {
        if (this.product[key]) {
          if (checkedKeys && checkedKeys.includes(key)) {
            this.config.push({'key': key, checked: true});
          } else {
            this.config.push({'key': key, checked: false});
          }
        }
      }
    }
    console.log(this.config);
  }

  selectAll() {
    this.config = [];
    for (const key in this.product) {
      if (this.product[key]) {
        this.config.push({'key': key, checked: true});
      }
    }
  }

  unSelectAll() {
    for (let i = 0; i < this.config.length; i++) {
      this.config[i].checked = false;
    }
  }

  private getChecked(config) {
    const keys = [];
    if (!config) {
      return keys;
    }
    for (const c of config) {
      if (c.checked) {
        keys.push(c.key);
      }
    }
    return keys;
   }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    const l = this.getChecked(this.config);
    localStorage.setItem('config', JSON.stringify(l));
    this.dialogRef.close(l);
  }

}
