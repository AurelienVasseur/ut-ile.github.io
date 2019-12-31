import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyHomeworkComponent } from './study-homework.component';

describe('StudyHomeworkComponent', () => {
  let component: StudyHomeworkComponent;
  let fixture: ComponentFixture<StudyHomeworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyHomeworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyHomeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
