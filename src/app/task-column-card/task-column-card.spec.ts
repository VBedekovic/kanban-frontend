import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskColumnCard } from './task-column-card';

describe('TaskColumnCard', () => {
  let component: TaskColumnCard;
  let fixture: ComponentFixture<TaskColumnCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskColumnCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskColumnCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
