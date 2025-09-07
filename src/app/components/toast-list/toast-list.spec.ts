import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastList } from './toast-list';

describe('ToastList', () => {
  let component: ToastList;
  let fixture: ComponentFixture<ToastList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
