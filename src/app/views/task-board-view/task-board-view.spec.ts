import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBoardView } from './task-board-view';

describe('TaskBoardView', () => {
  let component: TaskBoardView;
  let fixture: ComponentFixture<TaskBoardView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskBoardView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskBoardView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
