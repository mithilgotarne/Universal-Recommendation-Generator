import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElasticConfigComponent } from './elastic-config.component';

describe('ElasticConfigComponent', () => {
  let component: ElasticConfigComponent;
  let fixture: ComponentFixture<ElasticConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElasticConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElasticConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
