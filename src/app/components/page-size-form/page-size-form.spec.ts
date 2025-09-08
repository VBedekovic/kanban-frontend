import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSizeForm } from './page-size-form';

describe('PageSizeForm', () => {
  let component: PageSizeForm;
  let fixture: ComponentFixture<PageSizeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSizeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSizeForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
