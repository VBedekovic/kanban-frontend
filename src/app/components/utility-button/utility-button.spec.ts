import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityButton } from './utility-button';

describe('UtilityButton', () => {
  let component: UtilityButton;
  let fixture: ComponentFixture<UtilityButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilityButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilityButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
