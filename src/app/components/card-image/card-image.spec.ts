import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardImage } from './card-image';

describe('CardImage', () => {
  let component: CardImage;
  let fixture: ComponentFixture<CardImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardImage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardImage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
