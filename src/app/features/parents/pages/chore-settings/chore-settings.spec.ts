import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoreSettings } from './chore-settings';

describe('ChoreSettings', () => {
  let component: ChoreSettings;
  let fixture: ComponentFixture<ChoreSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoreSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoreSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
