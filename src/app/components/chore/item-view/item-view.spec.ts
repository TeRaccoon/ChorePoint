import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemView } from './item-view';

describe('ItemView', () => {
  let component: ItemView;
  let fixture: ComponentFixture<ItemView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
