import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoToCart } from './go-to-cart';

describe('AddToCart', () => {
  let component: GoToCart;
  let fixture: ComponentFixture<GoToCart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoToCart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoToCart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
