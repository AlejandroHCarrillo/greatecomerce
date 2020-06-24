import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRankComponent } from './product-rank.component';

describe('ProductRankComponent', () => {
  let component: ProductRankComponent;
  let fixture: ComponentFixture<ProductRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
