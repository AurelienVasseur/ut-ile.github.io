import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyJobsComponent } from './study-jobs.component';

describe('StudyJobsComponent', () => {
  let component: StudyJobsComponent;
  let fixture: ComponentFixture<StudyJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
